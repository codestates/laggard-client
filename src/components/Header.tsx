import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };
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

  const body = (
    <div className={classes.container}>
      <h2 className={classes.title}>LAGGARD</h2>
      <input className={classes.input} placeholder="아이디" />
      <input className={classes.input} placeholder="비밀번호" />
      <button className={classes.button}>로그인</button>
      <p className={classes.text}>
        회원이 아니세요?{' '}
        <NavLink className={classes.signup} to={'/signup'} onClick={modalClose}>
          <span className={classes.register}>회원가입 하기</span>
        </NavLink>
      </p>
    </div>
  );

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
          {user === null ? (
            <div className="login" onClick={modalOpen}>
              로그인
            </div>
          ) : (
            <div className="login">로그아웃</div>
          )}
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
            <NavLink className={classes.link} to={'/'}>
              <MenuItem onClick={handleClose}>홈</MenuItem>
            </NavLink>
            <NavLink className={classes.link} to={'/test'}>
              <MenuItem onClick={handleClose}>내 유형은?</MenuItem>
            </NavLink>
            <NavLink className={classes.link} to={'/game'}>
              <MenuItem onClick={handleClose}>내 점수는?</MenuItem>
            </NavLink>
            {user === null ? (
              <MenuItem onClick={modalOpen}>로그인</MenuItem>
            ) : (
              <MenuItem>로그아웃</MenuItem>
            )}
          </Menu>
        </div>
      )}
      {ReactDOM.createPortal(
        <Modal className={classes.modal} open={open} onClose={modalClose}>
          {body}
        </Modal>,
        document.body,
      )}
    </header>
  );
};

export default Header;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signup: {
      textDecoration: 'none',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'grid',
      placeItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: '6px',
      backgroundColor: 'rgba(191, 191, 191, 0.9)',
      padding: theme.spacing(2, 4, 2),
      width: '300px',
      height: '200px',
      '&:focus': {
        outline: 'none',
      },
    },
    title: {
      margin: '5px',
      fontWeight: 700,
      letterSpacing: '1px',
      fontSize: '30px',
    },
    input: {
      margin: '2px',
      padding: '2px',
      '&:focus': {
        outline: 'none',
      },
    },
    button: {
      width: '50%',
      margin: '5px',
      fontSize: '1rem',
      fontWeight: 500,
    },
    register: {
      color: 'blue',
      cursor: 'pointer',
    },
    text: {
      fontSize: '0.9rem',
    },
  }),
);
