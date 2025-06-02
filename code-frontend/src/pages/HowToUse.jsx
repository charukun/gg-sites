import React from 'react';
import PageBrandTitle from '../components/PageBrandTitle';
import './HowToUse.css';

const steps = [
  {
    number: 1,
    title: 'ご希望のセラピストをお選びください',
    content: [
      '当店ではスケジュールを公開しておりません。',
      '「誰の目にも触れない、あなただけの時間」を大切にしているためです。',
      '',
      'まずは、セラピスト一覧より"あなたの推し"を見つけてください。',
      '気になるセラピストが決まったら、LINEより',
      '①「お名前 or ニックネーム」',
      '②「希望プラン」',
      '③「希望日時」',
      '④「希望エリア」',
      'をお知らせください。'
    ]
  },
  {
    number: 2,
    title: 'セラピストがスケジュールを調整します',
    content: [
      'セラピストがあなたのご希望に合わせてスケジュールを調整します。',
      '日程が合えば、正式にご予約確定となります。',
      '',
      '※ ご希望日時によっては別日をご案内する場合がございます。',
      '※ お時間・エリアに応じて交通費が加算される場合がございます。'
    ]
  },
  {
    number: 3,
    title: '当日、指定場所でお待ち合わせ',
    content: [
      'ご予約時間になりましたら、事前にご案内した場所',
      '（ホテルまたはご自宅など）でお待ちください。',
      'セラピストが時間ぴったりにお伺いします。'
    ]
  },
  {
    number: 4,
    title: 'お支払いはその場で',
    content: [
      'セラピスト到着後、必ずその場でお支払いください。',
      '（現金またはPayPayでのお支払いが可能です）',
      '',
      '※ 延長をご希望の場合は、セラピストに直接ご相談ください。'
    ]
  },
  {
    number: 5,
    title: 'ふたりだけの秘密の時間',
    content: [
      '時間のすべては、あなただけのものです。',
      '他の誰にも邪魔されない、誰にも知られない――',
      'GUILTY\'S GARDENのセラピストと過ごす、',
      '罪深くも甘美なひとときを心ゆくまでお楽しみください。'
    ]
  }
];

export default function HowToUse() {
  return (
    <div className="howtouse-bg">
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