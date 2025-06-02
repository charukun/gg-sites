import React from 'react';
import PageBrandTitle from '../components/PageBrandTitle';
import './Pricing.css';

export default function Pricing() {
  return (
    <div className="pricing-bg">
      <div className="pricing-flower-bg"></div>
      <div className="pricing-header-area">
        <PageBrandTitle />
        <div className="page-subtitle">料金システム</div>
      </div>
      <div className="pricing-mainprice-wide">
        <div className="pricing-mainprice-label">シンプル価格</div>
        <div className="pricing-mainprice-amount">¥12,000<span>/1h</span></div>
      </div>
      <div className="pricing-list">
        {/* SHORT PLAN（銅） */}
        <div className="pricing-card bronze">
          <div className="card-gradient">
            <div className="card-title">SHORT<br />PLAN</div>
          </div>
          <div className="card-detail-simple">基本プラン</div>
          <div className="card-detail-simple">ご利用時間：3h～</div>
        </div>
        {/* LONG PLAN（銀） */}
        <div className="pricing-card silver">
          <div className="card-gradient">
            <div className="card-title">LONG<br />PLAN</div>
          </div>
          <div className="card-detail-simple">特別プラン</div>
          <div className="card-detail-simple">ご利用時間：12h～</div>
          {/* <div className="card-detail-simple gray">特別料金 + ¥10,000</div> */}
        </div>
        {/* PREMIUM PLAN（金） */}
        <div className="pricing-card gold">
          <div className="card-gradient">
            <div className="card-title">PREMIUM<br />PLAN</div>
          </div>
          <div className="card-detail-simple">特別プラン</div>
          <div className="card-detail-simple">ご利用時間：24h～</div>
          {/* <div className="card-detail-simple gray">特別料金 + ¥30,000</div> */}
        </div>
      </div>
      <div className="pricing-half-off-wide">特別プランは時間料金半額!!</div>
      <div className="pricing-notice-area">
        <small>
          ※交通費基本無料（遠方の場合除く）<br />
          ※飲食代・宿泊費などの諸経費は全額お客様のご負担となります<br />
          ※お支払いは現金またはPayPay決済のみとさせて頂いております
        </small>
      </div>
    </div>
  );
} 