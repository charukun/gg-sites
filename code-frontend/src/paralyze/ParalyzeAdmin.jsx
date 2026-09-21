import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DISPLAY_TEMPLATES, POD_CATEGORIES, loadAdminCatalog, saveProduct, verifyAdmin } from './catalog';
import { supabase } from './supabase';
import './ParalyzeAdmin.css';

const empty={name:'',price:'',description:'',category:'tee',drop_id:'',exhibition_id:'',display_template:'glass_case',publish_at:'',sale_start_at:'',pod_provider:'printful',pod_product_id:'',payment_provider:'stripe',payment_product_id:'',payment_price_id:'',purchase_url:'',is_published:false,stock_status:'made_to_order'};
const fmtLocal=v=>{
  if(!v)return '';
  const d=new Date(v);
  const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,16);
};

export default function ParalyzeAdmin(){
  const [user,setUser]=useState(undefined),[email,setEmail]=useState(''),[catalog,setCatalog]=useState({products:[],drops:[],exhibitions:[]});
  const [form,setForm]=useState(empty),[files,setFiles]=useState([]),[editing,setEditing]=useState(null),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
  const refresh=async()=>setCatalog(await loadAdminCatalog());
  useEffect(()=>{verifyAdmin().then(async u=>{setUser(u);if(u)await refresh()});const{data:s}=supabase.auth.onAuthStateChange(()=>verifyAdmin().then(async u=>{setUser(u);if(u)await refresh()}));return()=>s.subscription.unsubscribe()},[]);
  const login=async e=>{e.preventDefault();setBusy(true);const{error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+'/paralyze-area/admin'}});setBusy(false);setMessage(error?error.message:'ログインリンクをメールへ送りました。')};
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const reset=()=>{setForm(empty);setFiles([]);setEditing(null)};
  const edit=p=>{setEditing(p.id);setForm({...empty,...p,drop_id:p.drop_id||'',exhibition_id:p.exhibition_id||'',publish_at:fmtLocal(p.publish_at),sale_start_at:fmtLocal(p.sale_start_at)});window.scrollTo({top:0,behavior:'smooth'})};
  const submit=async e=>{
    e.preventDefault();
    if(!editing && files.length===0){setMessage('商品画像を1枚以上選択してください。');return;}
    setBusy(true);setMessage('');
    try{
      await saveProduct(form,files,editing);
      await refresh();reset();
      setMessage('保存しました。展示位置も自動計算され、ミュージアムへ反映されます。');
    }catch(err){setMessage(err.message)}finally{setBusy(false)}
  };
  const duplicate=async p=>{setBusy(true);try{const clone={...p,name:`${p.name} COPY`,slug:'',is_published:false,display_order:(p.display_order||0)+1};const created=await saveProduct(clone,[],null);const links=(p.product_assets||[]).map(x=>({product_id:created.id,asset_id:x.asset.id,role:x.role,display_order:x.display_order}));if(links.length){const{error}=await supabase.from('product_assets').insert(links);if(error)throw error;}await refresh();setMessage('複製しました。画像を共有した非公開コピーです。')}catch(e){setMessage(e.message)}finally{setBusy(false)}};
  const toggle=async p=>{await supabase.from('products').update({is_published:!p.is_published}).eq('id',p.id);await refresh()};
  const remove=async p=>{if(!window.confirm(`${p.name} を削除しますか？`))return;await supabase.from('products').delete().eq('id',p.id);await refresh()};
  const move=async(p,dir)=>{const same=catalog.products.filter(x=>x.exhibition_id===p.exhibition_id).sort((a,b)=>a.display_order-b.display_order);const i=same.findIndex(x=>x.id===p.id),j=i+dir;if(j<0||j>=same.length)return;await Promise.all([supabase.from('products').update({display_order:same[j].display_order}).eq('id',p.id),supabase.from('products').update({display_order:p.display_order}).eq('id',same[j].id)]);await refresh()};
  const quickAdd=async type=>{const name=window.prompt(type==='drop'?'DROP名':'展示室名');if(!name)return;const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+Date.now().toString(36);if(type==='drop')await supabase.from('drops').insert({name,slug,is_published:true,publish_at:new Date().toISOString()});else await supabase.from('exhibitions').insert({name,slug,is_published:true,unlock_at:new Date().toISOString(),display_order:catalog.exhibitions.length});await refresh()};

  if(user===undefined)return <div className="paa-shell"><div className="paa-login">CHECKING ACCESS…</div></div>;
  if(!user)return <div className="paa-shell"><Helmet><title>PARALYZE AREA / DIRECTOR</title></Helmet><form className="paa-login" onSubmit={login}><div className="paa-logo">PARALYZE AREA</div><h1>DIRECTOR ACCESS</h1><p>商品追加・DROP・展示室をスマホから管理。</p><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><button disabled={busy}>MAGIC LINKを送る</button>{message&&<div className="paa-message">{message}</div>}</form></div>;

  return <div className="paa-shell"><Helmet><title>PARALYZE AREA / DIRECTOR</title></Helmet>
    <header className="paa-top"><div className="paa-logo">PARALYZE AREA</div><div><a href="/paralyze-area" target="_blank" rel="noreferrer">MUSEUM ↗</a><button onClick={()=>supabase.auth.signOut()}>LOG OUT</button></div></header>
    <main className="paa-main">
      <section className="paa-editor"><div className="paa-section-head"><div><span>DIRECTOR TOOL</span><h1>{editing?'展示物を編集':'＋ 新しい展示物'}</h1></div>{editing&&<button className="paa-ghost" onClick={reset}>新規登録へ戻る</button>}</div>
      <form onSubmit={submit}>
        <label>商品画像<input type="file" accept="image/*" multiple required={!editing} onChange={e=>setFiles([...e.target.files])}/><small>アップロード時にWebP化・軽量化。1枚目がメイン画像。</small></label>
        <div className="paa-grid2"><label>商品名<input required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="SIGNAL TEE / WHITE"/></label><label>価格（円）<input required inputMode="numeric" type="number" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="7200"/></label></div>
        <label>商品説明<textarea value={form.description||''} onChange={e=>set('description',e.target.value)} placeholder="数行でOK。空欄でも登録可能。"/></label>
        <div className="paa-grid2"><label>商品カテゴリ<select value={form.category} onChange={e=>set('category',e.target.value)}>{POD_CATEGORIES.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label><label>展示タイプ<select value={form.display_template} onChange={e=>set('display_template',e.target.value)}>{DISPLAY_TEMPLATES.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label></div>
        <div className="paa-grid2"><label>DROP<select required value={form.drop_id} onChange={e=>set('drop_id',e.target.value)}><option value="">選択</option>{catalog.drops.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><button type="button" className="paa-inline" onClick={()=>quickAdd('drop')}>＋DROP</button></label><label>展示室<select required value={form.exhibition_id} onChange={e=>set('exhibition_id',e.target.value)}><option value="">選択</option>{catalog.exhibitions.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><button type="button" className="paa-inline" onClick={()=>quickAdd('exhibition')}>＋AREA</button></label></div>
        <div className="paa-grid2"><label>ミュージアム公開日時<input type="datetime-local" value={form.publish_at||''} onChange={e=>set('publish_at',e.target.value?new Date(e.target.value).toISOString():'')}/></label><label>販売開始日時<input type="datetime-local" value={form.sale_start_at||''} onChange={e=>set('sale_start_at',e.target.value?new Date(e.target.value).toISOString():'')}/></label></div>
        <details><summary>連携・SEOなど詳細設定</summary><div className="paa-grid2"><label>POD商品ID<input value={form.pod_product_id||''} onChange={e=>set('pod_product_id',e.target.value)}/></label><label>決済商品ID<input value={form.payment_product_id||''} onChange={e=>set('payment_product_id',e.target.value)}/></label><label>Stripe Price ID<input value={form.payment_price_id||''} onChange={e=>set('payment_price_id',e.target.value)}/></label><label>購入URL<input value={form.purchase_url||''} onChange={e=>set('purchase_url',e.target.value)}/></label></div></details>
        <label className="paa-check"><input type="checkbox" checked={!!form.is_published} onChange={e=>set('is_published',e.target.checked)}/> 公開する</label>
        <button className="paa-save" disabled={busy}>{busy?'SAVING…':editing?'変更を保存':'展示物を登録・反映'}</button>{message&&<div className="paa-message">{message}</div>}
      </form></section>

      <section className="paa-list"><div className="paa-section-head"><div><span>EXHIBITS</span><h2>展示物</h2></div><b>{catalog.products.length}</b></div>{catalog.products.map(p=><article key={p.id} className="paa-card"><div className="paa-card-main"><div><span className={p.is_published?'live':'draft'}>{p.is_published?'公開':'非公開'}</span><strong>{p.name}</strong><small>{p.drop?.name||'NO DROP'} / {p.exhibition?.name||'NO AREA'} / ¥{Number(p.price).toLocaleString()}</small></div><div className="paa-order"><button onClick={()=>move(p,-1)}>↑</button><button onClick={()=>move(p,1)}>↓</button></div></div><div className="paa-actions"><button onClick={()=>edit(p)}>編集</button><button onClick={()=>duplicate(p)}>複製</button><button onClick={()=>toggle(p)}>{p.is_published?'非公開':'公開'}</button><button className="danger" onClick={()=>remove(p)}>削除</button></div></article>)}</section>
    </main>
  </div>;
}
