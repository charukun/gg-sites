import React from 'react';

export default function Top() {
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
      }}>お知らせ・告知</h2>
      <div>
        ここに運営からのお知らせや告知内容を表示します。
      </div>
    </div>
  );
} 