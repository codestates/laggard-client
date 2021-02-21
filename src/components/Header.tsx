import React, { useEffect, useRef } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaPredicate } from 'react-media-hook';

const Header: React.FC = () => {
  const header = useRef<HTMLDivElement>(null);
  const toggle = () => {
    header.current?.classList.toggle('active');
  };
  const max992 = useMediaPredicate('(max-width: 992px)');
  useEffect(() => {
    window.addEventListener('scroll', () => {
      header.current?.classList.toggle('sticky', window.scrollY > 0);
    });
  }, []);

  return (
    <header className="header" ref={header}>
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
      {max992 && (
        <MenuIcon className="menu" onClick={toggle} fontSize="large" />
      )}
    </header>
  );
};

export default Header;
