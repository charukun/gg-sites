import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import { Link } from 'react-router-dom';
import SiteName from '../components/SiteName';
import './Home.css';
import { Helmet } from 'react-helmet-async';

// Amplifyの設定
Amplify.configure(awsconfig);
const client = generateClient();

export default function Home() {
  const [ageChecked, setAgeChecked] = useState(() => {
    return localStorage.getItem('gg-age-checked') === 'yes';
  });
  const [visitorCount, setVisitorCount] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // 訪問者数・いいね数の取得と+1
    const fetchAndUpdateVisitor = async () => {
      try {
        const result = await client.graphql({
          query: `
            query GetStats($id: ID!) {
              getStats(id: $id) {
                id
                visitorCount
                likeCount
              }
            }
          `,
          variables: { id: 'global-stats' }
        });
        if (result.data.getStats) {
          const currentVisitor = result.data.getStats.visitorCount;
          setVisitorCount(currentVisitor);
          setLikeCount(result.data.getStats.likeCount);
          // visitorCountを+1して保存
          await client.graphql({
            query: `
              mutation UpdateStats($input: UpdateStatsInput!) {
                updateStats(input: $input) {
                  id
                  visitorCount
                  likeCount
                }
              }
            `,
            variables: {
              input: {
                id: 'global-stats',
                visitorCount: currentVisitor + 1,
                likeCount: result.data.getStats.likeCount
              }
            }
          });
          setVisitorCount(currentVisitor + 1);
        }
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };
    fetchAndUpdateVisitor();
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const result = await client.graphql({
        query: `
          mutation UpdateStats($input: UpdateStatsInput!) {
            updateStats(input: $input) {
              id
              visitorCount
              likeCount
            }
          }
        `,
        variables: {
          input: {
            id: 'global-stats',
            visitorCount: visitorCount,
            likeCount: likeCount + 1
          }
        }
      });
      if (result.data.updateStats) {
        setLikeCount(result.data.updateStats.likeCount);
        setShowHearts(true);
        const likeValue = document.querySelector('.like-value');
        if (likeValue) {
          likeValue.classList.add('like-animation');
          setTimeout(() => {
            likeValue.classList.remove('like-animation');
          }, 1000);
        }
        setTimeout(() => setShowHearts(false), 2000);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleYes = () => {
    localStorage.setItem('gg-age-checked', 'yes');
    setAgeChecked(true);
  };

  return (
    <div className="home-bg">
      <Helmet>
        <title>女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪｜女性専用・高級性感マッサージ</title>
        <meta name="description" content="大阪の女性用風俗『GUILTY'S GARDEN（ギルティーズガーデン）』は、女性専用・完全予約制の高級性感マッサージ店。癒しと快感、非日常の特別な体験をあなたに。" />
        <meta property="og:title" content="女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪" />
        <meta property="og:description" content="大阪の女性用風俗『GUILTY'S GARDEN』で、癒しと快感、非日常の特別な体験を。女性専用・完全予約制の高級性感マッサージ店。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://guiltys-garden.com/" />
        <meta property="og:image" content="https://guiltys-garden.com/ogp.png" />
        <meta property="og:site_name" content="GUILTY'S GARDEN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="女性用風俗 GUILTY'S GARDEN（ギルティーズガーデン）大阪" />
        <meta name="twitter:description" content="大阪の女性用風俗『GUILTY'S GARDEN』で、癒しと快感、非日常の特別な体験を。女性専用・完全予約制の高級性感マッサージ店。" />
        <meta name="twitter:image" content="https://guiltys-garden.com/ogp.png" />
        <link rel="canonical" href="https://guiltys-garden.com/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "GUILTY'S GARDEN（ギルティーズガーデン）",
            "description": "大阪の女性用風俗・女性専用高級性感マッサージ店。癒しと快感、非日常の特別な体験をあなたに。",
            "image": "https://guiltys-garden.com/ogp.png",
            "url": "https://guiltys-garden.com/",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "大阪市",
              "addressRegion": "大阪府",
              "addressCountry": "JP"
            },
            "telephone": "",
            "areaServed": "大阪府",
            "openingHours": "24/7",
            "priceRange": "高級"
          }
        `}</script>
      </Helmet>
      {!ageChecked && (
        <div className={`age-modal-bg${!ageChecked ? ' active' : ''}`}>
          <div className="age-modal">
            <div className="age-modal-title">年齢確認</div>
            <div className="age-modal-text">このサイトは18歳以上を対象としています。<br />あなたは18歳以上ですか？</div>
            <button className="age-modal-yes" onClick={handleYes}>Yes</button>
          </div>
        </div>
      )}
      {ageChecked && (
        <div className="home-center">
          <SiteName />
          <div className="home-subcatch">
            あなたのための<br />特別な秘密の空間を
          </div>
          <Link to="/therapists" className="home-btn">セラピスト紹介</Link>
          <div className="home-stats">
            <div className="stat-row">
              <span className="stat-label">訪問者数</span>
              <span className="stat-value">{visitorCount?.toLocaleString() || ''}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">いいね</span>
              <span className="stat-value like-value">{likeCount?.toLocaleString() || ''}</span>
            </div>
            <a href="/" className="home-heart" onClick={handleLike}>
              ❤
            </a>
          </div>
          {showHearts && (
            <div className="hearts-container">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="floating-heart"
                  style={{
                    '--start-x': `${Math.random() * 100}%`,
                    '--start-y': '50%',
                    '--x': `${(Math.random() - 0.5) * 200}px`,
                    '--y': `${-Math.random() * 200 - 100}px`,
                    '--rotation': `${Math.random() * 360}deg`,
                    '--scale': `${0.5 + Math.random() * 0.5}`,
                  }}
                >
                  ❤
                </div>
              ))}
            </div>
          )}
          <div className="home-share-section">
            <div className="home-share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("女性用風俗 GUILTY'S GARDEN大阪｜女性専用・高級性感マッサージ")}&url=https://guiltys-garden.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn x"
                aria-label="Xでシェア"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=https://guiltys-garden.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn line"
                aria-label="LINEでシェア"
              >
                <i className="fa-brands fa-line"></i>
              </a>
            </div>
            <div className="home-share-label">このページをシェア</div>
          </div>
        </div>
      )}
    </div>
  );
}