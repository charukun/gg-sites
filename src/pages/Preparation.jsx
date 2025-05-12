import React from 'react';
import './Preparation.css';

function Preparation() {
  return (
    <div className="preparation-container">
      <div className="preparation-content">
        <h1 className="preparation-title">Coming Soon</h1>
        <div className="preparation-subtitle">準備中です</div>
        <div className="preparation-description">
          より良いサービスを提供するため、現在準備を進めております。<br />
          もうしばらくお待ちください。
        </div>
        <div className="preparation-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </div>
  );
}

export default Preparation;