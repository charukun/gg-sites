import React, { useEffect, useState, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import { Link } from 'react-router-dom';
import SiteName from '../components/SiteName';
import './Home.css';

// Amplifyの設定
Amplify.configure(awsconfig);
const client = generateClient();

export default function Home() {
  const [ageChecked, setAgeChecked] = useState(false);
  const [visitorCount, setVisitorCount] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const likeValueRef = useRef(null);

  useEffect(() => {
    const checked = localStorage.getItem('gg-age-checked');
    if (checked === 'yes') setAgeChecked(true);
  }, []);

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

  const handleYes = () => {
    localStorage.setItem('gg-age-checked', 'yes');
    setAgeChecked(true);
  };

  return (
    <div className="home-bg">
      {!ageChecked && (
        <div className="age-modal-bg">
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
              <span className="stat-value" ref={likeValueRef}>{visitorCount?.toLocaleString() || ''}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">いいね</span>
              <span className="stat-value">{likeCount?.toLocaleString() || ''}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}