import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TherapistModal.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faInstagram } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const TherapistModal = ({ therapist, onClose, qaList }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [origin, setOrigin] = useState('50% 50%');
  const [show, setShow] = useState(false);
  const [showInstagram] = useState(false);
  const [showTiktok] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  
  // スワイプ用
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);

  // ダミー画像（後で実際の画像に置き換え）
  const images = [therapist.image];

  const navigate = useNavigate();

  // スワイプ開始
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
    touchStartX.current = null;
  };
  // マウスドラッグ対応
  const handleMouseDown = (e) => {
    mouseStartX.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
    mouseStartX.current = null;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleOverlayMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const handleXClick = (e) => {
    e.preventDefault();
    setPopupOpen(true);
    setTimeout(() => setPopupOpen(false), 1200);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
      className="modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
      onClick={handleOverlayClick}
    >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformOrigin: origin }}
            onClick={e => e.stopPropagation()}
      >
        <button className="modal-close-top" onClick={onClose}>×</button>
        <div className="therapist-modal-main">
          <div className="modal-image-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ cursor: 'grab' }}
          >
            {images[currentImageIndex] ? (
                  <img src={images[currentImageIndex]} alt={`女性用風俗GUILTY'S GARDEN大阪 セラピスト${therapist.name}の写真`} className="therapist-image" />
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
                <span className="therapist-name-v">{therapist.name}</span>
                <span className="therapist-age-v">{therapist.age}</span>
              </div>
                  <div className="therapist-meta-v">
                    {therapist.height}cm / {therapist.weight}kg
                  </div>
                  <div className="therapist-location-v">
                    <svg className="location-icon" style={{width:'1em',height:'1em',marginRight:'0.22em'}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="location-text">{therapist.location}</span>
                  </div>
              <div className="therapist-sns-v">
                    {therapist.sns.x && therapist.sns.x !== '#' ? (
                      <a
                        href={therapist.sns.x}
                        className="share-btn x"
                        aria-label="X"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="share-btn x"
                        aria-label="X"
                        onClick={handleXClick}
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </button>
                    )}
                    {showInstagram && (
                <a href={therapist.sns.instagram} target="_blank" rel="noopener noreferrer" className="sns-link instagram" aria-label="Instagram">
                  <img src="/sns_ig.png" alt="Instagram" className="sns-img" />
                </a>
                    )}
                    {showTiktok && (
                <a href={therapist.sns.tiktok} target="_blank" rel="noopener noreferrer" className="sns-link tiktok" aria-label="TikTok">
                  <img src="/sns_tiktok.png" alt="TikTok" className="sns-img" />
                </a>
                    )}
              </div>
            </div>
          </div>
        </div>
        {therapist.qa && (
          <div className="therapist-qa-table">
            {qaList.map((qa, idx) => (
              <div className="therapist-qa-row" key={idx}>
                    <div className="therapist-qa-q">Q. {qa.q}</div>
                    <div className="therapist-qa-a">{therapist.qa[qa.key]}</div>
              </div>
            ))}
          </div>
        )}
        <div className="modal-buttons">
          <button className="close-button" onClick={onClose}>閉じる</button>
              <button
                className="reserve-button"
                onClick={() => {
                  navigate(`/reserve?name=${encodeURIComponent(therapist.name)}`);
                }}
              >
                予約する
              </button>
        </div>
            {popupOpen && (
              <div className="sns-popup">
                準備中だよ♡
      </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TherapistModal; 