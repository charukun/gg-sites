import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Profile() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  if (!user) {
    window.location.href = '/mypage/login';
    return null;
  }

  return (
    <div className="mypage-profile-bg" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f8fa'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '1.5em',
        boxShadow: '0 4px 24px #eba6a933',
        padding: '2.5em 2em',
        maxWidth: 400,
        width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#681616',
          fontWeight: 900,
          marginBottom: '1.2em',
          fontSize: '1.2em'
        }}>マイページ</h2>
        <div style={{ marginBottom: '1.2em', textAlign: 'center' }}>
          <div><b>ユーザー名：</b>{user.username}</div>
          <div><b>メール：</b>{user.attributes?.email}</div>
        </div>
        <button
          onClick={signOut}
          style={{
            background: '#eba6a9',
            color: '#fff',
            border: 'none',
            borderRadius: '2em',
            padding: '0.7em 2em',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%'
          }}
        >ログアウト</button>
      </div>
    </div>
  );
} 