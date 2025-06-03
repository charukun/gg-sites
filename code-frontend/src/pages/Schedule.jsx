import React from 'react';
import './Schedule.css';
import PageBrandTitle from '../components/PageBrandTitle';
import { Helmet } from 'react-helmet-async';

export default function Schedule() {
  return (
    <div className="schedule-bg">
      <Helmet>
        <title>スケジュール | 女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪</title>
        <meta name="description" content="大阪の女性用風俗『GUILTY'S GARDEN』のセラピスト出勤スケジュール。完全予約制・女性専用の高級性感マッサージ。" />
        <meta property="og:title" content="スケジュール | 女性用風俗 GUILTY'S GARDEN大阪" />
        <meta property="og:description" content="大阪の女性用風俗『GUILTY'S GARDEN』のセラピスト出勤スケジュール。完全予約制・女性専用の高級性感マッサージ。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gg-garden.com/schedule" />
        <meta property="og:image" content="https://gg-garden.com/ogp.png" />
        <meta property="og:site_name" content="GUILTY'S GARDEN" />
        <link rel="canonical" href="https://gg-garden.com/schedule" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://gg-garden.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "スケジュール",
                "item": "https://gg-garden.com/schedule"
              }
            ]
          }
        `}</script>
      </Helmet>
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