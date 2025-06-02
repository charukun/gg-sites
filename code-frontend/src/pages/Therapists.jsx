import React, { useState } from 'react';
import PageBrandTitle from '../components/PageBrandTitle';
import TherapistModal from './TherapistModal';
import './Therapists.css';
import { therapists } from '../constants/therapists';
import { qaList } from '../constants/qaList';
import { useNavigate } from 'react-router-dom';

export default function Therapists() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showInstagram] = useState(false);
  const [showTiktok] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="therapists-flower-bg"></div>
      <div className="therapists-center">
        <PageBrandTitle />
        <div className="page-subtitle">セラピスト一覧</div>
        <div className="therapist-reserve-cute">♥ 24時間予約受付中 ♥</div>
        <div className="therapists-list">
          {therapists.map((t, i) => (
            <div className="therapist-card-v" key={i} onClick={() => handleTherapistClick(t)}>
              <div className="therapist-img-v">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="therapist-image" />
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
                    <span style={{display:'inline-flex',alignItems:'center',marginLeft:'0.8em'}}>
                      <svg className="location-icon" style={{width:'1em',height:'1em',marginRight:'0.22em'}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="location-text">{t.location}</span>
                    </span>
                  </div>
                  <div className="therapist-sns-v">
                    {t.sns.x && t.sns.x !== '#' ? (
                      <a
                        href={t.sns.x}
                        className="sns-link x"
                        aria-label="X"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        onMouseDown={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <img src="/sns_x.png" alt="X" className="sns-img" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="sns-link x"
                        aria-label="X"
                        onClick={handleXClick}
                        onMouseDown={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <img src="/sns_x.png" alt="X" className="sns-img" />
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