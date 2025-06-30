import React, { useState, useEffect, useRef } from 'react';
import PageBrandTitle from '../components/PageBrandTitle';
import TherapistModal from './TherapistModal';
import './Therapists.css';
import { therapists } from '../constants/therapists';
import { qaList } from '../constants/qaList';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Therapists() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showInstagram] = useState(false);
  const [showTiktok] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  // パララックス効果の実装
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          cardRefs.current.forEach((cardRef, index) => {
            if (cardRef) {
              const rect = cardRef.getBoundingClientRect();
              const cardTop = rect.top;
              const cardBottom = rect.bottom;
              
              // カードが画面に入ってくる位置を計算
              const triggerPoint = windowHeight * 0.8; // 画面の80%の位置で開始
              const endPoint = windowHeight * 0.2; // 画面の20%の位置で完了
              
              let opacity = 0;
              let translateY = 50; // 下から50pxの位置から開始
              
              if (cardTop < triggerPoint && cardBottom > endPoint) {
                // カードが画面に入ってきている
                const progress = (triggerPoint - cardTop) / (triggerPoint - endPoint);
                opacity = Math.min(1, Math.max(0, progress));
                translateY = 50 - (progress * 50); // 50pxから0pxまで移動
              } else if (cardBottom <= endPoint) {
                // カードが画面の上部を通過済み
                opacity = 1;
                translateY = 0;
              }
              
              cardRef.style.opacity = opacity;
              cardRef.style.transform = `translateY(${translateY}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期位置を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleCloseModal = () => {
    setSelectedTherapist(null);
  };

  const handleXClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPopupOpen(true);
    setTimeout(() => setPopupOpen(false), 1200);
  };

  return (
    <div className="therapists-bg">
      <Helmet>
        <title>セラピスト一覧 | 女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪</title>
        <meta name="description" content="大阪の女性用風俗『GUILTY'S GARDEN』在籍セラピスト一覧。女性専用・高級性感マッサージで癒しと快感を体験。" />
        <meta property="og:title" content="セラピスト一覧 | 女性用風俗 GUILTY'S GARDEN大阪" />
        <meta property="og:description" content="大阪の女性用風俗『GUILTY'S GARDEN』在籍セラピスト一覧。女性専用・高級性感マッサージで癒しと快感を体験。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://guiltys-garden.com/therapists" />
        <meta property="og:image" content="https://guiltys-garden.com/ogp.png" />
        <meta property="og:site_name" content="GUILTY'S GARDEN" />
        <link rel="canonical" href="https://guiltys-garden.com/therapists" />
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
                "name": "セラピスト一覧",
                "item": "https://guiltys-garden.com/therapists"
              }
            ]
          }
        `}</script>
      </Helmet>
      <div className="therapists-flower-bg"></div>
      <div className="therapists-center">
        <PageBrandTitle />
        <div className="page-subtitle">セラピスト一覧</div>
        <div className="therapist-reserve-cute">♥ 24時間予約受付中 ♥</div>
        <div className="therapists-list">
          {therapists.map((t, i) => (
            <div 
              className="therapist-card-v" 
              key={i} 
              onClick={() => handleTherapistClick(t)}
              ref={el => cardRefs.current[i] = el}
            >
              <div className="therapist-img-v">
                {t.image ? (
                  <img src={t.image} alt={`女性用風俗GUILTY'S GARDEN大阪 セラピスト${t.name}の写真`} className="therapist-image" />
                ) : (
                  <div className="noimage-illust">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="comingsoon-icon">
                      <circle cx="24" cy="24" r="10" fill="#eba6a9" opacity="0.7"/>
                      <ellipse cx="24" cy="10" rx="5" ry="10" fill="#fff5f5" opacity="0.7"/>
                      <ellipse cx="24" cy="38" rx="5" ry="10" fill="#fff5f5" opacity="0.7"/>
                      <ellipse cx="10" cy="24" rx="10" ry="5" fill="#fff5f5" opacity="0.7"/>
                      <ellipse cx="38" cy="24" rx="10" ry="5" fill="#fff5f5" opacity="0.7"/>
                    </svg>
                    <span className="comingsoon-text noimage-only">Coming Soon</span>
                  </div>
                )}
                <div className="therapist-img-gradient"></div>
                <div className="therapist-info-overlay">
                  <div className="therapist-name-row">
                    <span className="therapist-name-v">{t.name}</span>
                    <span className="therapist-age-v">{t.age}</span>
                  </div>
                  <div className="therapist-meta-v">
                    {t.height}cm / {t.weight}kg
                  </div>
                  <div className="therapist-location-v">
                    <svg className="location-icon" style={{width:'1em',height:'1em',marginRight:'0.22em'}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="location-text">{t.location}</span>
                  </div>
                  <div className="therapist-sns-v">
                    {t.sns.x && t.sns.x !== '#' ? (
                      <a
                        href={t.sns.x}
                        className="share-btn x"
                        aria-label="X"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        onMouseDown={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="share-btn x"
                        aria-label="X"
                        onClick={handleXClick}
                        onMouseDown={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </button>
                    )}
                    {showInstagram && (
                      <a href={t.sns.instagram} target="_blank" rel="noopener noreferrer" className="sns-link instagram" aria-label="Instagram">
                        <img src="/sns_ig.png" alt="Instagram" className="sns-img" />
                      </a>
                    )}
                    {showTiktok && (
                      <a href={t.sns.tiktok} target="_blank" rel="noopener noreferrer" className="sns-link tiktok" aria-label="TikTok">
                        <img src="/sns_tiktok.png" alt="TikTok" className="sns-img" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'2em'}}>
          <button
            className="omakase-reserve-btn"
            onClick={() => navigate('/reserve?name=おまかせ')}
          >
            おまかせ予約する
          </button>
        </div>
      </div>
      {selectedTherapist && <TherapistModal therapist={selectedTherapist} onClose={handleCloseModal} qaList={qaList} />}
      {popupOpen && (
        <div className="sns-popup">
          準備中だよ♡
        </div>
      )}
    </div>
  );
} 