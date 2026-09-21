import React, { Suspense, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { assetFor, loadMuseum, visibleState } from './catalog';
import './ParalyzeMuseum.css';

const templateConfig = {
  glass_case: { box:[4.05,4.25,1.8], base:[4.2,.55,2.3], plane:[3.55,4.45], y:.35, imageY:.4, glass:.13 },
  wall:       { box:[4.4,4.65,.16], base:[4.5,.18,.7], plane:[4.05,4.5], y:.45, imageY:.45, glass:0 },
  pedestal:   { box:[3.65,3.8,1.55], base:[2.8,1.15,2.25], plane:[3.15,3.55], y:.55, imageY:.55, glass:.09 },
  hanger:     { box:[4.2,4.5,1.65], base:[4.3,.35,2], plane:[3.7,4.45], y:.4, imageY:.4, glass:.08 },
  small_case: { box:[3.25,3.2,1.55], base:[3.4,.85,2.05], plane:[2.8,2.75], y:.25, imageY:.25, glass:.14 },
  special:    { box:[4.85,5.0,2.1], base:[5,.6,2.6], plane:[4.45,4.75], y:.55, imageY:.55, glass:.1 },
};

function Lighting() {
  return <>
    <ambientLight intensity={0.42}/>
    <directionalLight position={[3,7,4]} intensity={1.1}/>
    <pointLight position={[-5,2,2]} color="#ffd000" intensity={25} distance={11}/>
  </>;
}

function Corridor({ products }) {
  const minZ = Math.min(-16, ...products.map((p,i)=>Number(p.display_position?.z ?? (-i*8-8))));
  const length = Math.abs(minZ) + 34;
  return <group>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2,-length/2+8]} receiveShadow>
      <planeGeometry args={[13,length]}/><meshStandardMaterial color="#0a0a0a" roughness={.38} metalness={.5}/>
    </mesh>
    <mesh position={[-6,1.7,-length/2+8]}><boxGeometry args={[.35,7,length]}/><meshStandardMaterial color="#111" roughness={.85}/></mesh>
    <mesh position={[6,1.7,-length/2+8]}><boxGeometry args={[.35,7,length]}/><meshStandardMaterial color="#111" roughness={.85}/></mesh>
    <mesh position={[0,5.2,-length/2+8]}><boxGeometry args={[12,.22,length]}/><meshStandardMaterial color="#090909"/></mesh>
    {Array.from({length:Math.ceil(length/9)}).map((_,i)=><group key={i} position={[0,0,-i*9]}>
      <mesh position={[0,4.92,0]}><boxGeometry args={[9.6,.05,.12]}/><meshStandardMaterial color="#e8e8df" emissive="#e8e8df" emissiveIntensity={1.8}/></mesh>
      <mesh position={[-5.5,1.2,-2.4]} rotation={[0,0,-.53]}><boxGeometry args={[7,.06,.06]}/><meshStandardMaterial color="#ffd000" emissive="#ffd000" emissiveIntensity={2.6}/></mesh>
      <mesh position={[5.5,2.3,2]} rotation={[0,0,-.53]}><boxGeometry args={[6,.06,.06]}/><meshStandardMaterial color="#ffd000" emissive="#ffd000" emissiveIntensity={2.6}/></mesh>
    </group>)}
  </group>;
}

function ProductImage({ url, plane, y }) {
  const texture = useLoader(THREE.TextureLoader, url);
  useEffect(()=>{ texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4; texture.needsUpdate=true; },[texture]);
  return <mesh position={[0,y,.05]}>
    <planeGeometry args={plane}/>
    <meshBasicMaterial map={texture} toneMapped={false} transparent/>
  </mesh>;
}

function TemplateExtras({ type }) {
  if(type==='hanger') return <group>
    <mesh position={[0,2.05,.2]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.035,.035,3.25,12]}/><meshStandardMaterial color="#a0a0a0" metalness={.8} roughness={.22}/></mesh>
    <mesh position={[0,1.75,.2]} rotation={[0,0,Math.PI]}><torusGeometry args={[.42,.025,8,30,Math.PI]}/><meshStandardMaterial color="#aaa" metalness={.8}/></mesh>
  </group>;
  if(type==='pedestal') return <mesh position={[0,-.75,0]}><cylinderGeometry args={[1.28,1.45,1.85,40]}/><meshStandardMaterial color="#151515" roughness={.35} metalness={.5}/></mesh>;
  if(type==='special') return <group>
    <pointLight position={[0,2.5,1.8]} color="#ffd000" intensity={38} distance={7}/>
    <mesh position={[0,2.6,-.7]} rotation={[0,0,-.52]}><boxGeometry args={[5,.055,.055]}/><meshStandardMaterial color="#ffd000" emissive="#ffd000" emissiveIntensity={4}/></mesh>
  </group>;
  return null;
}

function Showcase({ product, index, active, onSelect }) {
  const image = assetFor(product);
  const fallbackSide = index % 2 === 0 ? -1 : 1;
  const configured = product.display_position || {};
  const x = Number(configured.x ?? (fallbackSide*2.4));
  const y = Number(configured.y ?? 0);
  const z = Number(configured.z ?? (-index*8-8));
  const side = x >= 0 ? 1 : -1;
  const state = visibleState(product);
  const type = templateConfig[product.display_template] ? product.display_template : 'glass_case';
  const cfg = templateConfig[type];
  if (!active) return null;

  return <group position={[x,y,z]} rotation={[0,side > 0 ? -.12 : .12,0]}>
    <spotLight position={[0,4.1,2.2]} intensity={88} angle={.48} penumbra={.72} color="#fff7d8" distance={9}/>
    <TemplateExtras type={type}/>
    <mesh position={[0,-1.72,0]} castShadow receiveShadow>
      {type==='pedestal'
        ? <cylinderGeometry args={[cfg.base[0]/2,cfg.base[0]/2+.12,cfg.base[1],36]}/>
        : <boxGeometry args={cfg.base}/>}
      <meshStandardMaterial color="#171717" roughness={.42} metalness={.72}/>
    </mesh>
    <mesh position={[0,cfg.y,0]}>
      <boxGeometry args={cfg.box}/>
      <meshPhysicalMaterial color="#dfe7e5" transparent opacity={cfg.glass} roughness={.08} transmission={cfg.glass ? .72 : 0} thickness={.35} ior={1.35}/>
    </mesh>
    <Suspense fallback={<mesh position={[0,cfg.imageY,.1]}><planeGeometry args={[2.8,3.5]}/><meshBasicMaterial color="#222"/></mesh>}>
      {image && <ProductImage url={image} plane={cfg.plane} y={cfg.imageY}/>}
    </Suspense>
    <Html position={[0,-1.1,1.05]} center distanceFactor={7} zIndexRange={[30,10]}>
      <button className="pa-product-plate" onClick={()=>onSelect(product)} aria-label={`${product.name} 詳細`}>
        <span className="pa-for-sale">{state.buyable ? 'FOR SALE' : state.label} / {product.drop?.name || 'PARALYZE AREA'}</span>
        <strong>{product.name}</strong>
        <span className="pa-price">¥{Number(product.price).toLocaleString('ja-JP')}</span>
        <span className={`pa-buy ${state.buyable?'is-live':''}`}>{state.label} →</span>
      </button>
    </Html>
  </group>;
}

function CameraRig({ products, onIndex }) {
  const scroll = useScroll();
  const zList = useMemo(()=>products.map((p,i)=>Number(p.display_position?.z ?? (-i*8-8))).sort((a,b)=>b-a),[products]);
  const endZ = (zList[zList.length-1] ?? -8) - 7;
  useFrame((state,delta)=>{
    const max = Math.max(0,products.length-1);
    const targetZ = THREE.MathUtils.lerp(4,endZ,scroll.offset);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z,targetZ,4,delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x,Math.sin(scroll.offset*Math.PI*3)*.38,3,delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y,.2+Math.sin(scroll.offset*Math.PI*4)*.08,3,delta);
    state.camera.lookAt(0,.2,state.camera.position.z-8);
    const nearest = products.reduce((best,p,i)=>{
      const z=Number(p.display_position?.z ?? (-i*8-8));
      return Math.abs(z-state.camera.position.z) < best.dist ? {i,dist:Math.abs(z-state.camera.position.z)} : best;
    },{i:0,dist:Infinity});
    onIndex(Math.max(0,Math.min(max,nearest.i)));
  });
  return null;
}

function MuseumWorld({ products, onSelect, onIndex, activeIndex }) {
  return <>
    <fog attach="fog" args={['#070707',8,26]}/>
    <Lighting/><Corridor products={products}/>
    {products.map((p,i)=><Showcase key={p.id} product={p} index={i} active={Math.abs(i-activeIndex)<=2} onSelect={onSelect}/>)}
    <CameraRig products={products} onIndex={onIndex}/>
  </>;
}

function Detail({ product, onClose }) {
  if (!product) return null;
  const state=visibleState(product); const image=assetFor(product,['main','mockup','exhibition']);
  const buy=()=>{
    if(!state.buyable)return;
    if(product.purchase_url) window.location.href=product.purchase_url;
  };
  return <div className="pa-detail" role="dialog" aria-modal="true">
    <button className="pa-detail-close" onClick={onClose}>×</button>
    <div className="pa-detail-image">{image&&<img src={image} alt={product.name}/>}</div>
    <div className="pa-detail-copy">
      <div className="pa-kicker">{product.drop?.name || 'PARALYZE AREA'} / {product.category}</div>
      <h2>{product.name}</h2><p>{product.description || product.short_description}</p>
      <div className="pa-detail-price">¥{Number(product.price).toLocaleString('ja-JP')}</div>
      <button className="pa-detail-buy" disabled={!state.buyable} onClick={buy}>{state.label}</button>
    </div>
  </div>;
}

export default function ParalyzeMuseum(){
  const { slug } = useParams();
  const [data,setData]=useState({exhibition:null,products:[]});
  const [loading,setLoading]=useState(true),[error,setError]=useState('');
  const [selected,setSelected]=useState(null),[activeIndex,setActiveIndex]=useState(0);
  useEffect(()=>{let live=true;setLoading(true);loadMuseum(slug).then(v=>live&&setData(v)).catch(e=>live&&setError(e.message)).finally(()=>live&&setLoading(false));return()=>{live=false}},[slug]);
  const pages=useMemo(()=>Math.max(4,data.products.length*1.18+2.5),[data.products.length]);
  if(loading)return <div className="pa-loading">PARALYZE AREA<br/><span>ENTERING MUSEUM…</span></div>;
  if(error)return <div className="pa-loading">MUSEUM OFFLINE<br/><span>{error}</span></div>;
  if(!data.exhibition)return <div className="pa-loading">AREA NOT FOUND<br/><span>THIS EXHIBITION IS NOT OPEN YET.</span></div>;
  return <div className="pa-museum">
    <Helmet><title>PARALYZE AREA / {data.exhibition.name}</title><meta name="description" content="PARALYZE AREA interactive museum store"/></Helmet>
    <header className="pa-header"><div className="pa-brand">PARALYZE AREA</div><div className="pa-room">{data.exhibition.name} · {String(Math.min(activeIndex+1,data.products.length)).padStart(2,'0')}/{String(data.products.length).padStart(2,'0')}</div></header>
    <div className="pa-scroll-hint">SCROLL TO WALK ↓</div>
    <Canvas dpr={[1,1.65]} camera={{position:[0,.2,4],fov:48}} gl={{antialias:true,powerPreference:'high-performance'}} shadows>
      <color attach="background" args={['#070707']}/>
      <ScrollControls pages={pages} damping={.24} distance={1}>
        <MuseumWorld products={data.products} onSelect={setSelected} onIndex={setActiveIndex} activeIndex={activeIndex}/>
        <Scroll html><div style={{height:`${pages*100}vh`,width:'100vw',pointerEvents:'none'}}/></Scroll>
      </ScrollControls>
    </Canvas>
    <Detail product={selected} onClose={()=>setSelected(null)}/>
  </div>;
}
