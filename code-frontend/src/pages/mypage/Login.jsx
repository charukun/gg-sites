import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Login() {
  return (
    <div className="mypage-login-bg" style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8f8fa'}}>
      <div style={{background:'#fff',borderRadius:'1.5em',boxShadow:'0 4px 24px #eba6a933',padding:'2.5em 2em',maxWidth:400,width:'100%'}}>
        <h2 style={{textAlign:'center',color:'#681616',fontWeight:900,marginBottom:'1.2em',fontSize:'1.2em'}}>マイページ ログイン</h2>
        <Authenticator
          socialProviders={['twitter']}
          hideSignUp={true}
        >
          {({ signOut, user }) => (
            <div style={{textAlign:'center'}}>
              <div style={{marginBottom:'1.2em'}}>ようこそ、{user?.username || 'ユーザー'}さん</div>
              <button onClick={signOut} style={{background:'#eba6a9',color:'#fff',border:'none',borderRadius:'2em',padding:'0.7em 2em',fontWeight:700,cursor:'pointer'}}>ログアウト</button>
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
} 