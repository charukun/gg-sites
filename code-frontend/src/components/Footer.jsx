import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <a
        href="/mypage/login"
        style={{color:'#FFD700',marginRight:'0.5em',fontSize:'1.2em',textDecoration:'none',cursor:'pointer',opacity:0.85}}
        aria-label="ログインページへの隠しリンク"
      >
        ♥
      </a>
      <span>GUILTY'S GARDEN</span>
      <a
        href="/recruit"
        style={{color:'#FFD700',marginLeft:'0.5em',fontSize:'1.2em',textDecoration:'none',cursor:'pointer',opacity:0.85}}
        aria-label="採用ページへの隠しリンク"
      >
        ♥
      </a>
      <div style={{fontSize:'0.9em',marginTop:'0.5em',color:'#eba6a9'}}>大阪府公安委員会指令 第67185号</div>
      <div style={{fontSize:'0.9em',marginTop:'0.2em',color:'#eba6a9'}}>&copy; 2025 GUILTY'S GARDEN. All rights reserved.</div>
    </footer>
  );
}

export default Footer;