import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LINE_ID = '@330esodg';
const LINE_URL = `https://line.me/R/ti/p/${LINE_ID.replace('@', '')}`;

export default function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const therapist = params.get('name') || '';

  // テンプレート
  const template = `【GUILTY'S GARDEN 予約希望】
① 希望セラピスト名：${therapist}
② 希望日・希望時間帯・希望場所：
③ お客様のお名前：
④ お客様の連絡先
（電話番号 or Xアカウント）：https://x.com/GuiltysGarden`;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = 'https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="reserve-bg">
      <div className="reserve-center">
        <h2 className="reserve-title">LINEで予約</h2>
        <div className="reserve-section">
          <div className="reserve-template-example">
            <div className="reserve-example-title">【記載例】</div>
            <pre className="reserve-example-text">
{`【GUILTY'S GARDEN 予約希望】
① 希望セラピスト名：ギルティくん
② 希望日・希望時間帯・希望場所：6/15 18:30〜21:30 梅田
③ お客様のお名前：ガーデンちゃん
④ お客様の連絡先
（電話番号 or Xアカウント）：https://x.com/GuiltysGarden`}
            </pre>
          </div>
          <textarea
            value={template}
            readOnly
            className="reserve-template"
          />
          <div className="reserve-template-desc">
            上記テンプレートをコピーして、必要な情報を書き加えてからLINE公式アカウントにメッセージを送ってください。
          </div>
          <button className="reserve-copy-btn" onClick={handleCopy}>
            {copied ? 'コピーしました！' : 'テンプレートをコピー'}
          </button>
        </div>
        <div className="reserve-section">
          <div
            className="line-it-button"
            data-lang="ja"
            data-type="friend"
            data-env="REAL"
            data-count="true"
            data-lineid={LINE_ID}
            style={{ display: 'block', margin: '0 auto' }}
          ></div>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reserve-line-btn"
          >
            LINEで予約メッセージを送る
          </a>
        </div>
        <div className="reserve-section reserve-info">
          <div className="reserve-info-block">
            <span className="reserve-info-title">📩返信について</span>
            <span className="reserve-info-text">
              メッセージを確認次第、公式LINEの受付担当から返信いたします。
            </span>
          </div>
          <div className="reserve-info-block">
            <span className="reserve-info-title">🔑お客様の個人情報について</span>
            <span className="reserve-info-text">
              ご記載いただいた個人情報は外部に漏れることはありませんのでご安心ください。
            </span>
          </div>
          <div className="reserve-info-block">
            <span className="reserve-info-title">⚠️お客様の連絡先について</span>
            <span className="reserve-info-text">
              本公式LINEは予約申込専用となっております。<br />
              ご記載いただいたお客様のご連絡先に、セラピストから直接ご連絡いたしますので、<br />
              待ち合わせ等の詳細はその際にお決めいただくようお願いいたします。
            </span>
          </div>
        </div>
        <button
          className="reserve-back-btn"
          onClick={() => navigate('/therapists')}
        >
          セラピスト一覧に戻る
        </button>
      </div>
      <style>{`
        .reserve-bg {
          min-height: 100vh;
          width: 100vw;
          background: #18332a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .reserve-center {
          width: 100%;
          max-width: 420px;
          margin: 2em auto;
          background: rgba(255,255,255,0.07);
          border-radius: 1.5em;
          box-shadow: 0 4px 32px #eba6a955, 0 0 0 8px #fff3;
          padding: 2.2em 1.2em 2.5em 1.2em;
          color: #eba6a9;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .reserve-title {
          font-family: 'Quicksand', 'Nunito', 'Rounded Mplus 1c', 'Montserrat', 'Noto Sans JP', sans-serif;
          font-size: 1.6em;
          font-weight: 900;
          margin-bottom: 1.2em;
          color: #eba6a9;
          letter-spacing: 0.08em;
        }
        .reserve-section {
          width: 100%;
          margin-bottom: 2em;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .reserve-template {
          width: 100%;
          min-height: 120px;
          font-size: 1em;
          margin-bottom: 8px;
          border-radius: 0.7em;
          border: 1.5px solid #eba6a9;
          background: #fff8;
          color: #681616;
          padding: 1.2em 2em;
          font-family: inherit;
          resize: none;
          box-sizing: border-box;
        }
        .reserve-template-example {
          width: 100%;
          background: #fff4;
          border-radius: 0.7em;
          padding: 1.2em 2em;
          margin-bottom: 1em;
          color: #681616;
          font-size: 0.98em;
          box-sizing: border-box;
        }
        .reserve-example-title {
          font-weight: 700;
          color: #eba6a9;
          margin-bottom: 0.3em;
          font-size: 1.05em;
        }
        .reserve-example-text {
          font-family: inherit;
          white-space: pre-wrap;
          color: #681616;
          margin: 0;
          font-size: 0.98em;
          line-height: 1.7;
        }
        .reserve-copy-btn {
          background: #eba6a9;
          color: #fff;
          font-weight: 700;
          border: none;
          border-radius: 2em;
          padding: 0.7em 1.2em;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px #eba6a933;
          font-size: 1em;
          margin-bottom: 0.5em;
        }
        .reserve-copy-btn:hover {
          background: #ffd700;
          color: #681616;
        }
        .reserve-line-btn {
          display: inline-block;
          background: #06C755;
          color: #fff;
          font-weight: bold;
          border-radius: 6px;
          padding: 0.8em 2em;
          text-decoration: none;
          font-size: 1.1em;
          margin-top: 12px;
          margin-bottom: 0.5em;
          box-shadow: 0 2px 8px #06C75555;
          transition: background 0.2s, color 0.2s;
        }
        .reserve-line-btn:hover {
          background: #00b900;
          color: #fff;
        }
        .reserve-info {
          width: 100%;
          margin-bottom: 2em;
        }
        .reserve-info-block {
          background: #fff2;
          border-radius: 0.7em;
          padding: 1em 1em 0.7em 1em;
          margin-bottom: 1em;
        }
        .reserve-info-title {
          display: block;
          font-weight: 900;
          color: #eba6a9;
          margin-bottom: 0.3em;
          font-size: 1.08em;
        }
        .reserve-info-text {
          color: #fff;
          font-size: 0.98em;
          line-height: 1.7;
        }
        .reserve-back-btn {
          background: #fff;
          color: #eba6a9;
          font-weight: 700;
          border: 2px solid #eba6a9;
          border-radius: 2em;
          padding: 0.7em 1.8em;
          cursor: pointer;
          font-size: 1em;
          margin-top: 1.5em;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .reserve-back-btn:hover {
          background: #eba6a9;
          color: #fff;
          border-color: #ffd700;
        }
        .reserve-template-desc {
          width: 100%;
          color: #eba6a9;
          font-size: 0.98em;
          margin-bottom: 0.7em;
          text-align: left;
        }
        @media (max-width: 600px) {
          .reserve-center {
            max-width: 98vw;
            padding: 1.2em 0.3em 1.5em 0.3em;
          }
          .reserve-template,
          .reserve-template-example {
            padding-left: 0.7em;
            padding-right: 0.7em;
          }
        }
      `}</style>
    </div>
  );
} 