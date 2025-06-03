import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function NotFound() {
  return (
    <div className="home-bg">
      <div className="home-center">
        <div className="home-title" style={{fontSize: '2.5rem', marginBottom: '1.5rem'}}>404 Not Found</div>
        <div className="home-subcatch" style={{marginBottom: '2.5rem'}}>
          お探しのページは見つかりませんでした。<br />
          サイト内の移動やURLをご確認ください。
        </div>
        <Link to="/" className="home-btn">HOMEへ戻る</Link>
      </div>
    </div>
  );
} 