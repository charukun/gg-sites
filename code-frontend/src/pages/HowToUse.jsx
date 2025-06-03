import React from 'react';
import PageBrandTitle from '../components/PageBrandTitle';
import './HowToUse.css';
import { Helmet } from 'react-helmet-async';

const steps = [
  {
    number: 1,
    title: 'ご希望のセラピストをお選びください',
    content: [
      'まずは、セラピスト一覧より"あなたの推し"を見つけてください。',
      '気になるセラピストが決まったら、LINEより以下をお知らせください。',
      '①「お名前 or ニックネーム」',
      '②「希望日時」',
      '③「希望エリア」'
    ]
  },
  {
    number: 2,
    title: 'セラピストがスケジュールを調整します',
    content: [
      'セラピストがあなたのご希望に合わせてスケジュールを調整します。',
      '',
      '日程が合えば、正式にご予約確定となります。'
    ]
  },
  {
    number: 3,
    title: '当日、指定場所でお待ち合わせ',
    content: [
      'ご予約時間になりましたら、セラピストとお決めになられた待ち合わせ場所でお待ちください。',
      'セラピストが時間ぴったりにお伺いします。'
    ]
  },
  {
    number: 4,
    title: 'お支払いはその場で',
    content: [
      'セラピスト到着後、必ずその場でお支払いください。',
      '',
      '（現金またはPayPayでのお支払い）',
      '※ 延長をご希望の場合は、セラピストに直接ご相談ください。'
    ]
  },
  {
    number: 5,
    title: 'ふたりだけの秘密の時間',
    content: [
      '時間のすべては、あなただけのものです。',
      '',
      '他の誰にも邪魔されない、誰にも知られない――',
      '',
      'GUILTY\'S GARDENのセラピストと過ごす、罪深くも甘美なひとときを心ゆくまでお楽しみください。'
    ]
  }
];

export default function HowToUse() {
  return (
    <div className="howtouse-bg">
      <Helmet>
        <title>ご利用方法 | 女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪</title>
        <meta name="description" content="大阪の女性用風俗『GUILTY'S GARDEN』のご利用方法・予約の流れ。女性専用・高級性感マッサージの安心サポート。" />
        <meta property="og:title" content="ご利用方法 | 女性用風俗 GUILTY'S GARDEN大阪" />
        <meta property="og:description" content="大阪の女性用風俗『GUILTY'S GARDEN』のご利用方法・予約の流れ。女性専用・高級性感マッサージの安心サポート。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://guiltys-garden.com/howtouse" />
        <meta property="og:image" content="https://guiltys-garden.com/ogp.png" />
        <meta property="og:site_name" content="GUILTY'S GARDEN" />
        <link rel="canonical" href="https://guiltys-garden.com/howtouse" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://guiltys-garden.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "ご利用方法",
                "item": "https://guiltys-garden.com/howtouse"
              }
            ]
          }
        `}</script>
      </Helmet>
      <div className="howtouse-flower-bg"></div>
      <div className="howtouse-center">
        <PageBrandTitle />
        <div className="page-subtitle">ご利用方法</div>
        <div className="howtouse-steps">
          {steps.map((step, index) => (
            <div key={index} className="howtouse-step">
              <div className="step-number">Step {step.number}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-content">
                {step.content.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 