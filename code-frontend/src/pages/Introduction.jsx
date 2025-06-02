import React, { useRef, useEffect } from 'react';
import './Introduction.css';
import PageBrandTitle from '../components/PageBrandTitle';

const blocks = [
  {
    image: require('../assets/concept1.png'),
    text: '扉の向こうは\n誰にも知られない秘密の庭園',
    highlight: true,
  },
  {
    image: require('../assets/concept2.png'),
    text: '運命に選ばれた人だけが知る、特別な場所。\nここでは、すべての時間があなたのために流れる。',
  },
  {
    image: require('../assets/concept3.png'),
    text: 'いつもは言えないこと、誰にも見せられない顔\nここでは、欲望のままに身を委ねられる。',
  },
  {
    image: require('../assets/concept4.png'),
    text: '他の誰かの存在を気にする必要はない。\nGUILTY\'S GARDENでは、あなた以外の足跡は残さない。',
  },
  {
    image: require('../assets/concept5.png'),
    text: '誰の予約状況も見えない。\n誰の口コミも見えない。\n誰もあなたを見つけられない。',
    list: true,
  },
  {
    image: require('../assets/concept6.png'),
    text: 'ただ、あなたと\nセラピストだけの時間',
    highlight: true,
  },
];

export default function Introduction() {
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    imageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro-bg">
      <header className="intro-header">
        <PageBrandTitle />
        <p className="intro-subtitle">あなたのための特別な空間を。</p>
      </header>
      {blocks.map((block, i) => (
        <section className={`intro-section${i % 2 === 1 ? ' reverse' : ''}${block.highlight ? ' highlight' : ''}`} key={i}>
          <img
            src={block.image}
            alt={`イメージ${i + 1}`}
            className="intro-image parallax-image"
            ref={el => (imageRefs.current[i] = el)}
            loading="lazy"
          />
          <div className="intro-text">
            {block.list ? (
              <ul>
                {block.text.split('\n').map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>
                {block.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < block.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </section>
      ))}
      <footer className="intro-footer">
        <a href="/contact" className="intro-cta">お問い合わせはこちら</a>
      </footer>
    </div>
  );
} 