import React, { useEffect, useRef } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const header = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      header.current?.classList.toggle('sticky', window.scrollY > 0);
    });
  }, []);

  return (
    <div className="header" ref={header}>
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
};

export default Header;
