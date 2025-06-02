import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-new">
      <Link to="/" className="header-new-sitename">GUILTY'S<br />GARDEN</Link>
      <button className={`header-new-burger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isMenuOpen && (
        <>
          <div className="header-new-menu-bg" onClick={closeMenu}>
            <div className="header-new-menu" onClick={e => e.stopPropagation()}>
              <ul>
                <li><Link to="/" onClick={closeMenu}>HOME</Link></li>
                <li><Link to="/therapists" onClick={closeMenu}>セラピスト一覧</Link></li>
                <li><Link to="/pricing" onClick={closeMenu}>料金システム</Link></li>
                <li><Link to="/schedule" onClick={closeMenu}>スケジュール</Link></li>
                <li><Link to="/howtouse" onClick={closeMenu}>ご利用方法</Link></li>
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;