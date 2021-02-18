import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <a href="#" className="logo">
        Laggard
      </a>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Service</a>
        </li>
        <li>
          <a href="#">Scoreboard</a>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
