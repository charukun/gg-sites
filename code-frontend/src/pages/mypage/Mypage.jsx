import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MypageMenu from './MypageMenu';
import Top from './Top';
import Profile from './Profile';
import Subscription from './Subscription';
import Admin from './Admin';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

export default function Mypage() {
  return (
    <Authenticator
      socialProviders={['google']}
      hideSignUp={true}
    >
      <MypageContent />
    </Authenticator>
  );
}

function MypageContent() {
  const { user } = useAuthenticator((context) => [context.user]);
  // 管理者判定（ユーザー属性名はプロジェクトに合わせて調整）
  const isAdmin = user?.attributes?.['custom:role'] === 'admin';

  if (!user) {
    return <Navigate to="/mypage/login" />;
  }

  return (
    <div>
      <MypageMenu isAdmin={isAdmin} />
      <Routes>
        <Route path="top" element={<Top />} />
        <Route path="profile" element={<Profile />} />
        <Route path="subscription" element={<Subscription />} />
        {isAdmin && <Route path="admin" element={<Admin />} />}
        {/* どれにもマッチしない場合はトップへ */}
        <Route path="*" element={<Navigate to="top" />} />
      </Routes>
      <Outlet />
    </div>
  );
} 