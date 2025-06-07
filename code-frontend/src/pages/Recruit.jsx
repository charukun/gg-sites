import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Recruit.css';

const LINE_ID = '@067ypubg';
const LINE_URL = `https://line.me/R/ti/p/${LINE_ID}`;

export default function Recruit() {
  return (
    <div className="recruit-bg">
      <Helmet>
        <title>求人情報 | GUILTY'S GARDEN</title>
        <meta name="description" content="GUILTY'S GARDENの女性向け風俗セラピスト求人情報。完全非公開・高バック率・顔出し不要・副業OK。LINEで簡単応募。" />
        <meta property="og:title" content="求人情報 | GUILTY'S GARDEN" />
        <meta property="og:description" content="GUILTY'S GARDENの女性向け風俗セラピスト求人情報。完全非公開・高バック率・顔出し不要・副業OK。LINEで簡単応募。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://guiltys-garden.com/recruit" />
        <meta property="og:image" content="https://guiltys-garden.com/ogp.png" />
        <meta property="og:site_name" content="GUILTY'S GARDEN" />
        <link rel="canonical" href="https://guiltys-garden.com/recruit" />
      </Helmet>
      <div className="recruit-container">
        <h1 className="recruit-title">求人情報 - GUILTY'S GARDEN</h1>
        <div className="recruit-lead">
          誰にも知られず、誰にも見せない。<br />
          完全非公開の"あなただけの場所"で、<br />
          新しい一歩を踏み出しませんか？
        </div>
        <section className="recruit-section">
          <h2 className="recruit-h2">GUILTY'S GARDENとは？</h2>
          <p className="recruit-text">
            「他の誰の痕跡も感じさせない」――<br />
            完全プライベートな空間で、女性のお客様に極上の癒やしと背徳感を提供する、女性専用風俗店です。<br /><br />
            当店のセラピストは、お客様と"1対1"の時間を丁寧に、大切に、誠実かつ自由に楽しんでいただきます。
          </p>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">募集内容</h2>
          <table className="recruit-table">
            <tbody>
              <tr><th>募集職種</th><td>女性向け風俗セラピスト（業務委託）</td></tr>
              <tr><th>勤務地</th><td>関西（大阪市内中心）、関東（新宿・渋谷・池袋 など）</td></tr>
              <tr><th>時間帯</th><td>お好きな時間に出勤OK（週1回〜、1日3時間〜OK）</td></tr>
              <tr><th>対象年齢</th><td>20歳〜（学生・会社員・主婦・未経験歓迎）</td></tr>
            </tbody>
          </table>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">GUILTY'S GARDENが選ばれる理由</h2>
          <ul className="recruit-reason-list">
            <li><span className="recruit-check">✅</span> バック率 100%<br /><span className="recruit-reason-detail">お客様からいただいた料金は全額あなたにお渡しします。</span></li>
            <li><span className="recruit-check">✅</span> 顔出し不要／身バレ対策も徹底<br /><span className="recruit-reason-detail">当店では「プライバシー保護」を最重視。顔写真の公開は不要です。</span></li>
            <li><span className="recruit-check">✅</span> 他のキャストと会いません<br /><span className="recruit-reason-detail">出勤型ではなく、待ち合わせ型・直行直帰型のスタイル。セラピスト同士が会うことも、お店に出勤することもありません。</span></li>
            <li><span className="recruit-check">✅</span> 指名が取れなくても大丈夫<br /><span className="recruit-reason-detail">当店では「セラピスト自身の世界観」や「言葉で魅せる力」を重視しています。セラピスト活動コンサルティングを希望していただければ写メ日記などのSNSでの発信が苦手でも、それ以外の魅せ方を一緒に考えます。</span></li>
          </ul>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">報酬例（すべて100%バック）</h2>
          <table className="recruit-table">
            <thead>
              <tr><th>コース時間</th><th>お客様料金</th><th>セラピスト報酬</th></tr>
            </thead>
            <tbody>
              <tr><td>ショートプラン3h</td><td>¥36,000</td><td>¥36,000</td></tr>
              <tr><td>ロングプラン12h</td><td>¥72,000</td><td>¥72,000</td></tr>
              <tr><td>プレミアムプラン24h</td><td>¥144,000</td><td>¥144,000</td></tr>
            </tbody>
          </table>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">応募条件</h2>
          <ul className="recruit-cond-list">
            <li>20歳以上の心身ともに健康な方</li>
            <li>清潔感と礼儀を大切にできる方</li>
            <li>お客様との会話やスキンシップを楽しめる方</li>
            <li>掛け持ち・副業・未経験・昼職との両立もOK</li>
          </ul>
          <div className="recruit-note">✨ 接客経験やエステ経験は一切不問です。<br />未経験者には研修制度あり</div>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">応募からお仕事までの流れ</h2>
          <ol className="recruit-flow-list">
            <li>LINEで応募（簡単な自己紹介をお送りください）</li>
            <li>オンライン面談（顔出し不要）</li>
            <li>合格後、プロフィール用の素材提出（顔出しなしOK）</li>
            <li>掲載開始 → お客様からご予約</li>
            <li>お仕事スタート！（お客様と直接待ち合わせ）</li>
          </ol>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">よくある質問</h2>
          <div className="recruit-qa">
            <div className="recruit-qa-q">Q. 初期費用はかかりますか？</div>
            <div className="recruit-qa-a">A. システム利用料・掲載費として月額3万円が必要となります。</div>
            <div className="recruit-qa-q">Q. 顔出しは絶対に必要ですか？</div>
            <div className="recruit-qa-a">A. いいえ、不要です。顔モザイクやイメージ画像のみで掲載可能です。</div>
            <div className="recruit-qa-q">Q. バレたくないのですが…</div>
            <div className="recruit-qa-a">A. 本名・連絡先・居住地などの個人情報はお店側も保持しません。</div>
            <div className="recruit-qa-q">Q. 客層はどうですか？</div>
            <div className="recruit-qa-a">A. 20〜40代の一般女性と夜職のお客様が中心です。</div>
            <div className="recruit-qa-q">Q. 施術内容は？</div>
            <div className="recruit-qa-a">A. お客様に寄り添った自由な接客スタイルを推奨しています。内容の強要などは一切ありません。</div>
          </div>
        </section>
        <section className="recruit-section">
          <h2 className="recruit-h2">応募方法</h2>
          <div className="recruit-apply-desc">
            下記のLINEよりご連絡ください。<br />
            「求人を見ました」とお伝えいただければスムーズです。
          </div>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="recruit-line-btn" style={{display:'block',margin:'0 auto'}}>
            💬 LINE応募はこちら
          </a>
        </section>
        <section className="recruit-section">
          <div className="recruit-final">
            あなたの魅力は、必ず誰かの心と身体を癒やせます。<br />
            ここでしか得られない自由と報酬を、<br />
            GUILTY'S GARDENで一緒に手に入れませんか？
          </div>
        </section>
      </div>
    </div>
  );
} 