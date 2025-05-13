// src/pages/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../aws-exports';
import './Preparation.css';
import Header from '../components/Header';
import logo from '../assets/guiltys-garden-logo.png';

// Amplifyの設定を最初に行う
Amplify.configure(awsconfig);

// クライアントを生成
const client = generateClient();

function Preparation() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [hearts, setHearts] = useState([]);  // 飛び散るハートの状態を管理
  const [isLiked, setIsLiked] = useState(false);  // いいねアニメーション用の状態
  const likeValueRef = useRef(null);  // いいねの数字の要素への参照

  // 初期データの取得
  useEffect(() => {
    const fetchAndUpdateVisitor = async () => {
      try {
        // 現在の値を取得
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

          // 表示も+1に
          setVisitorCount(currentVisitor + 1);
        }
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };

    fetchAndUpdateVisitor();
  }, []);

  const handleLike = async () => {
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
            likeCount: likeCount + 1
          }
        }
      });
      
      if (result.data.updateStats) {
        setLikeCount(result.data.updateStats.likeCount);
        setIsLiked(true);

        // いいねの数字の位置を取得
        const likeValueElement = likeValueRef.current;
        if (likeValueElement) {
          const rect = likeValueElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // ハートを5個生成
          const newHearts = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100 - 50,
            y: -100 - Math.random() * 50,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
            startX: centerX,
            startY: centerY
          }));
          setHearts(prev => [...prev, ...newHearts]);
        }

        // アニメーション終了後にハートを削除
        setTimeout(() => {
          setHearts(prev => prev.filter(heart => heart.id < Date.now() - 2000));
          setIsLiked(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  return (
    <div>
      <Header hideLinks={true} />
      <div className="preparation-container">
        <img src={logo} alt="GUILTY'S GARDEN ロゴ" className="preparation-logo" />
        <div className="preparation-content">
          <h1 className="preparation-title">Coming Soon</h1>
          <div className="preparation-description">
            より良いサービスを提供するため、現在準備を進めております。<br />
            もうしばらくお待ちください。
          </div>
          <div className="preparation-stats">
            <div className="stat-row">
              <span className="stat-label">訪問者数</span>
              <span className="stat-value">{visitorCount?.toLocaleString() || ''}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">いいね</span>
              <span 
                ref={likeValueRef}
                className={`stat-value ${isLiked ? 'like-animation' : ''}`}
              >
                {likeCount?.toLocaleString() || ''}
              </span>
            </div>
            <div className="stat-row">
              <button 
                className={`like-button ${isLiked ? 'like-animation' : ''}`}
                onClick={handleLike}
                aria-label="いいね"
              >
                ❤️
              </button>
            </div>
          </div>
          <div className="preparation-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
        </div>
        {/* 飛び散るハート */}
        <div className="hearts-container">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                '--x': `${heart.x}px`,
                '--y': `${heart.y}px`,
                '--rotation': `${heart.rotation}deg`,
                '--scale': heart.scale,
                '--start-x': `${heart.startX}px`,
                '--start-y': `${heart.startY}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preparation;