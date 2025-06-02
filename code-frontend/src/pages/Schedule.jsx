import React from 'react';
import './Schedule.css';
import PageBrandTitle from '../components/PageBrandTitle';

export default function Schedule() {
  return (
    <div className="schedule-bg">
      <div className="schedule-flower-bg"></div>
      <div className="schedule-header-area">
        <PageBrandTitle />
        <div className="page-subtitle">スケジュール</div>
      </div>
      <div className="schedule-cute-area">
        <div className="schedule-cute-content">
          <p className="schedule-main-message">
            GUILTY'S GARDENでは<br />
            セラピストのスケジュールは<br />
            公開しておりません。
            <br />
            <br />
            </p>
          <p className="schedule-text">
            それはここが──
          </p>
          <p className="schedule-sub-message">
            <br />
            誰にも知られない<br />
            あなたのための秘密の庭園<br />
            <br />
            他の人の気配が見えない<br />
            あなた以外の予定も気にしない<br />
            <br />
          </p>
          <p className="schedule-text">
            そんな特別な場所で<br />
            ありたいからです。
            <br />
            <br />
            <br />
            「この日、会えたら嬉しいな…」<br />
            <br />
            <br />
            そんな気持ちをそっと<br />
            セラピストに伝えてみてください。<br />
            <br />
            <br />
          </p>
          <p className="schedule-text">
            あなたのご都合に合わせて<br />
            セラピストが可能な限り<br />
            調整いたします。<br />
            <br />
            <br />
          </p>
          <p className="schedule-main-message">
            気になるセラピストの<br />
            詳細ページから<br />
            LINEまたはSNSで、<br />
            気軽にご連絡くださいね。
          </p>
        </div>
      </div>
    </div>
  );
} 