import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const header = useRef<HTMLDivElement>(null);
  // const toggle = () => {
  //   header.current?.classList.toggle('active');
  // };
  const max992 = useMediaQuery('(max-width: 992px)');
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
        <div className="header_menu">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className="menu" fontSize="large" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>홈</MenuItem>
            <MenuItem onClick={handleClose}>내 유형은?</MenuItem>
            <MenuItem onClick={handleClose}>내 점수는?</MenuItem>
            <MenuItem onClick={handleClose}>로그인</MenuItem>
          </Menu>
        </div>
      )}
    </header>
  );
};

export default Header;
