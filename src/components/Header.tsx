import React, { useEffect, useRef } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const header = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      header.current?.classList.toggle('sticky', window.scrollY > 0);
    });
  }, []);

  return (
    <div className="header" ref={header}>
      <NavLink to={'/'} className="logo">
        Laggard
      </NavLink>
      <ul>
        <li>
          <NavLink to={'/'}>홈</NavLink>
        </li>
        <li>
          <NavLink to={'/test'}>내 유형은?</NavLink>
        </li>
        <li>
          <NavLink to="/game">내 점수는?</NavLink>
        </li>
        <li>
          <a href="#">로그인</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
