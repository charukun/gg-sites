import React, { Suspense, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Helmet } from 'react-helmet-async';
import { assetFor, loadMuseum, visibleState } from './catalog';
import './ParalyzeMuseum.css';

function Lighting() {
  return <>
    <ambientLight intensity={0.42}/>
    <directionalLight position={[3,7,4]} intensity={1.1}/>
    <pointLight position={[-5,2,2]} color="#ffd000" intensity={25} distance={11}/>
  </>;
}

function Corridor({ count }) {
  const length = Math.max(45, count * 9 + 24);
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

function ProductImage({ url }) {
  const texture = useLoader(THREE.TextureLoader, url);
  useEffect(()=>{ texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4; texture.needsUpdate=true; },[texture]);
  return <mesh position={[0,.4,.04]}>
    <planeGeometry args={[3.55,4.45]}/>
    <meshBasicMaterial map={texture} toneMapped={false}/>
  </mesh>;
}

function Showcase({ product, index, active, onSelect }) {
  const image = assetFor(product);
  const side = index % 2 === 0 ? -1 : 1;
  const z = -index * 8 - 8;
  const x = side * 2.4;
  const state = visibleState(product);
  if (!active) return null;
  const template = product.display_template;
  const glass = template === 'wall' ? 0 : .13;
  return <group position={[x,0,z]} rotation={[0,side > 0 ? -.12 : .12,0]}>
    <spotLight position={[0,4,2.2]} intensity={80} angle={.48} penumbra={.72} color="#fff7d8" distance={9}/>
    <mesh position={[0,-1.72,0]} castShadow receiveShadow>
      <boxGeometry args={[4.2,.55,2.3]}/><meshStandardMaterial color="#171717" roughness={.42} metalness={.72}/>
    </mesh>
    <mesh position={[0,.35,0]}>
      <boxGeometry args={[4.05,4.25,1.8]}/><meshPhysicalMaterial color="#dfe7e5" transparent opacity={glass} roughness={.08} transmission={glass ? .72 : 0} thickness={.35} ior={1.35}/>
    </mesh>
    <Suspense fallback={<mesh position={[0,.5,.1]}><planeGeometry args={[2.8,3.5]}/><meshBasicMaterial color="#222"/></mesh>}>
      {image && <ProductImage url={image}/>}
    </Suspense>
    <Html position={[0,-1.1,1.02]} center distanceFactor={7} zIndexRange={[30,10]}>
      <button className="pa-product-plate" onClick={()=>onSelect(product)} aria-label={`${product.name} 詳細`}>
        <span className="pa-for-sale">FOR SALE / {product.drop?.name || 'PARALYZE AREA'}</span>
        <strong>{product.name}</strong>
        <span className="pa-price">¥{Number(product.price).toLocaleString('ja-JP')}</span>
        <span className={`pa-buy ${state.buyable?'is-live':''}`}>{state.label} →</span>
      </button>
    </Html>
  </group>;
}

function CameraRig({ count, onIndex }) {
  const scroll = useScroll();
  useFrame((state,delta)=>{
    const max = Math.max(0,count-1);
    const targetZ = 4 - scroll.offset * (max*8 + 12);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z,targetZ,4,delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x,Math.sin(scroll.offset*Math.PI*3)*.38,3,delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y,.2+Math.sin(scroll.offset*Math.PI*4)*.08,3,delta);
    state.camera.lookAt(0,.2,state.camera.position.z-8);
    onIndex(Math.max(0,Math.min(max,Math.round(scroll.offset*max))));
  });
  return null;
}

function MuseumWorld({ products, onSelect, onIndex, activeIndex }) {
  return <>
    <fog attach="fog" args={['#070707',8,26]}/>
    <Lighting/><Corridor count={products.length}/>
    {products.map((p,i)=><Showcase key={p.id} product={p} index={i} active={Math.abs(i-activeIndex)<=2} onSelect={onSelect}/>)}
    <CameraRig count={products.length} onIndex={onIndex}/>
  </>;
}

function Detail({ product, onClose }) {
  if (!product) return null;
  const state=visibleState(product); const image=assetFor(product,['main','mockup','exhibition']);
  const buy=()=>{
    if(!state.buyable)return;
    if(product.purchase_url) window.location.href=product.purchase_url;
    else alert('決済接続準備中です。商品データと購入導線は接続可能な状態です。');
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
  const [data,setData]=useState({exhibition:null,products:[]});
  const [loading,setLoading]=useState(true),[error,setError]=useState('');
  const [selected,setSelected]=useState(null),[activeIndex,setActiveIndex]=useState(0);
  useEffect(()=>{let live=true;loadMuseum().then(v=>live&&setData(v)).catch(e=>live&&setError(e.message)).finally(()=>live&&setLoading(false));return()=>{live=false}},[]);
  const pages=useMemo(()=>Math.max(4,data.products.length*1.18+2.5),[data.products.length]);
  if(loading)return <div className="pa-loading">PARALYZE AREA<br/><span>ENTERING MUSEUM…</span></div>;
  if(error)return <div className="pa-loading">MUSEUM OFFLINE<br/><span>{error}</span></div>;
  return <div className="pa-museum">
    <Helmet><title>PARALYZE AREA / MUSEUM</title><meta name="description" content="PARALYZE AREA interactive museum store"/></Helmet>
    <header className="pa-header"><div className="pa-brand">PARALYZE AREA</div><div className="pa-room">{data.exhibition?.name || 'AREA 001'} · {String(activeIndex+1).padStart(2,'0')}/{String(data.products.length).padStart(2,'0')}</div></header>
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
