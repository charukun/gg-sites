import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MypageMenu({ isAdmin }) {
  const location = useLocation();
  const menuStyle = (path) => ({
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    color: location.pathname === path ? '#681616' : '#333',
    textDecoration: 'none',
    marginRight: '1.5em'
  });

  return (
    <nav style={{marginBottom: '2em', textAlign: 'center'}}>
      <Link to="/mypage/top" style={menuStyle('/mypage/top')}>トップ</Link>
      <Link to="/mypage/profile" style={menuStyle('/mypage/profile')}>プロフィール</Link>
      <Link to="/mypage/subscription" style={menuStyle('/mypage/subscription')}>サブスク</Link>
      {isAdmin && (
        <Link to="/mypage/admin" style={menuStyle('/mypage/admin')}>ユーザー管理</Link>
      )}
    </nav>
  );
} 