import { supabase } from './supabase';

export const DISPLAY_TEMPLATES = [
  ['glass_case', 'ガラスケース'],
  ['wall', '壁面展示'],
  ['pedestal', '台座'],
  ['hanger', 'ハンガー展示'],
  ['small_case', '小物ケース'],
  ['special', '特別展示'],
];

export const POD_CATEGORIES = [
  ['tee', 'Tシャツ'],
  ['polo', 'ポロ'],
  ['all_over_tee', '全面プリントT'],
  ['mug', 'マグカップ'],
  ['tumbler', 'タンブラー'],
  ['accessory', '小物'],
];

const productSelect = `
  *,
  drop:drops(id,name,slug),
  exhibition:exhibitions(id,name,slug,theme,environment,display_order),
  product_assets(role,display_order,asset:assets(*))
`;

export const visibleState = (product, now = new Date()) => {
  const start = product.sale_start_at ? new Date(product.sale_start_at) : null;
  const end = product.sale_end_at ? new Date(product.sale_end_at) : null;
  if (product.stock_status === 'out_of_stock') return { label: 'SOLD OUT', buyable: false };
  if (start && now < start) return { label: `AVAILABLE ${start.toLocaleDateString('ja-JP',{month:'2-digit',day:'2-digit'})}`, buyable: false };
  if (end && now > end) return { label: 'ARCHIVED', buyable: false };
  if (!product.purchase_url && !product.payment_price_id) return { label: 'COMING SOON', buyable: false };
  return { label: 'BUY', buyable: true };
};

export const assetFor = (product, preferred = ['exhibition','mockup','main']) => {
  const rows = [...(product.product_assets || [])].sort((a,b)=>a.display_order-b.display_order);
  for (const role of preferred) {
    const hit = rows.find(x => x.role === role && x.asset?.public_url);
    if (hit) return hit.asset.public_url;
  }
  return rows.find(x => x.asset?.public_url)?.asset.public_url || '';
};

export async function loadMuseum(exhibitionSlug) {
  let eq = supabase.from('exhibitions').select('*').eq('is_published', true).order('display_order');
  if (exhibitionSlug) eq = eq.eq('slug', exhibitionSlug);
  const { data: exhibitions, error: exError } = await eq;
  if (exError) throw exError;
  const exhibition = exhibitions?.[0];
  if (!exhibition) return { exhibition: null, products: [] };
  const { data: products, error } = await supabase
    .from('products')
    .select(productSelect)
    .eq('exhibition_id', exhibition.id)
    .eq('is_published', true)
    .order('display_order');
  if (error) throw error;
  return { exhibition, products: products || [] };
}

export async function loadAdminCatalog() {
  const [{ data: products, error: pe }, { data: drops, error: de }, { data: exhibitions, error: ee }] = await Promise.all([
    supabase.from('products').select(productSelect).order('display_order'),
    supabase.from('drops').select('*').order('created_at'),
    supabase.from('exhibitions').select('*').order('display_order'),
  ]);
  if (pe || de || ee) throw pe || de || ee;
  return { products: products || [], drops: drops || [], exhibitions: exhibitions || [] };
}

export async function verifyAdmin() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.email) return null;
  const { data, error } = await supabase.from('admin_users').select('email').eq('email', session.user.email).maybeSingle();
  if (error) return null;
  return data ? session.user : null;
}

async function decodeImage(file) {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(file);
    return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close?.() };
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
    return { source: image, width: image.naturalWidth, height: image.naturalHeight, close: () => {} };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function optimizeImage(file, maxSide = 2200, quality = .84) {
  const decoded = await decodeImage(file);
  try {
    const scale = Math.min(1, maxSide / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.drawImage(decoded.source, 0, 0, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
    if (!blob) throw new Error('画像最適化に失敗しました');
    return { blob, width, height };
  } finally {
    decoded.close();
  }
}

async function uploadVariant(file, productId, label, maxSide, quality) {
  const optimized = await optimizeImage(file, maxSide, quality);
  const safe = (file.name || 'image').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/-+/g,'-').slice(0,42);
  const path = `${productId}/${Date.now()}-${label}-${safe}.webp`;
  const { error } = await supabase.storage.from('product-media').upload(path, optimized.blob, {
    contentType: 'image/webp', cacheControl: '31536000', upsert: false
  });
  if (error) throw error;
  const { data: u } = supabase.storage.from('product-media').getPublicUrl(path);
  return { path, url: u.publicUrl, width: optimized.width, height: optimized.height, bytes: optimized.blob.size };
}

export async function uploadProductImage(file, productId, role='main') {
  const [full, thumb, social] = await Promise.all([
    uploadVariant(file, productId, 'full', 2200, .84),
    uploadVariant(file, productId, 'thumb', 800, .78),
    uploadVariant(file, productId, 'social', 1400, .82),
  ]);
  const { data: asset, error } = await supabase.from('assets').insert({
    kind:'image', storage_path: full.path, public_url: full.url, mime_type:'image/webp',
    width: full.width, height: full.height, bytes: full.bytes,
    variants:{ thumbnail:thumb.url, social:social.url }
  }).select().single();
  if (error) throw error;
  const { error: linkError } = await supabase.from('product_assets').insert({ product_id:productId, asset_id:asset.id, role, display_order:0 });
  if (linkError) throw linkError;
  return asset;
}

export async function saveProduct(values, files = [], editingId = null) {
  const payload = {
    slug: values.slug || `${values.name}`.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + '-' + Date.now().toString(36),
    name: values.name,
    short_description: values.short_description || values.description?.slice(0,90) || null,
    description: values.description || null,
    price: Number(values.price || 0),
    currency: values.currency || 'JPY',
    category: values.category || 'tee',
    drop_id: values.drop_id || null,
    exhibition_id: values.exhibition_id || null,
    display_template: values.display_template || 'glass_case',
    display_position: values.display_position || { x: 0, y: 0, z: 0 },
    display_order: Number(values.display_order || 0),
    is_published: !!values.is_published,
    publish_at: values.publish_at || null,
    sale_start_at: values.sale_start_at || null,
    sale_end_at: values.sale_end_at || null,
    stock_status: values.stock_status || 'made_to_order',
    pod_provider: values.pod_provider || 'printful',
    pod_product_id: values.pod_product_id || null,
    payment_provider: values.payment_provider || 'stripe',
    payment_product_id: values.payment_product_id || null,
    payment_price_id: values.payment_price_id || null,
    purchase_url: values.purchase_url || null,
    seo_title: values.seo_title || values.name,
    seo_description: values.seo_description || values.short_description || values.description?.slice(0,150) || null,
    social_copy: values.social_copy || values.short_description || null,
    metadata: values.metadata || {},
  };
  let product;
  if (editingId) {
    const { data, error } = await supabase.from('products').update(payload).eq('id', editingId).select().single();
    if (error) throw error; product = data;
  } else {
    const { data, error } = await supabase.from('products').insert(payload).select().single();
    if (error) throw error; product = data;
  }
  for (let i=0;i<files.length;i++) await uploadProductImage(files[i], product.id, i===0?'main':'sub');
  return product;
}
