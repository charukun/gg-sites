import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/osaka">大阪</Link></li>
          <li><Link to="/tokyo">東京</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;