import React from 'react';

export default function Admin() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '1.5em',
      boxShadow: '0 4px 24px #eba6a933',
      padding: '2.5em 2em',
      maxWidth: 500,
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#681616',
        fontWeight: 900,
        marginBottom: '1.2em',
        fontSize: '1.2em'
      }}>ユーザー管理（管理者専用）</h2>
      <div>
        ここにユーザー管理機能を実装します（管理者のみ表示）。
      </div>
    </div>
  );
} 