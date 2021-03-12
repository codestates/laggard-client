import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { NavLink, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { openMyinfo } from '../features/modalSlice';
import NaverSignin from '../components/NaverSignin';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const max992 = useMediaQuery('(max-width: 992px)');

  const handleLogin = async () => {
    await axios
      .post(
        'http://localhost:5000/users/signin/basic',
        {
          email: emailRef.current?.value,
          password: pwRef.current?.value,
        },
        { withCredentials: true },
      )
      .then((res) => {
        const accessToken = res.data.data;
        localStorage.setItem('accessToken', accessToken);
      })
      .then(async () => {
        const token = localStorage.getItem('accessToken');
        await axios
          .get('http://localhost:5000/users/userinfo', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((res) => {
            const info = res.data.data.userInfo;
            dispatch(
              login({
                nickname: info.nickname,
                email: info.email,
                sex: info.sex,
                birth_year: info.birth_year,
              }),
            );
          });
      })
      .then(() => {
        handleOpenSuccess();
        setAnchorEl(null);
        setOpen(false);
      })
      .catch(() => {
        handleOpenFailure();
      });
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    await dispatch(logout());
    history.push('/');
    setOpen(false);
    setAnchorEl(null);
  };

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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      header.current?.classList.toggle('sticky', window.scrollY > 0);
    });
  }, []);

  {
    /* Snackbar*/
  }
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleOpenFailure = () => {
    setOpenFailure(true);
  };

  const handleCloseFailure = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailure(false);
  };

  {
    /* Modal jsx*/
  }

  const body = (
    <div className={classes.container}>
      <h2 className={classes.title}>LAGGARD</h2>
      <div className={classes.input_container}>
        {openFailure ? (
          <p className={classes.warning}>
            이메일과 비밀번호를 다시 확인해주세요
          </p>
        ) : null}
        <input
          type="text"
          ref={emailRef}
          className={classes.input}
          placeholder="이메일"
          autoComplete="off"
        />
        <input
          type="password"
          ref={pwRef}
          className={classes.input}
          placeholder="비밀번호"
          autoComplete="off"
        />
      </div>
      <button className={classes.button} onClick={handleLogin}>
        로그인
      </button>
      <NaverSignin />
      <p className={classes.text}>
        회원이 아니세요?{' '}
        <NavLink className={classes.signup} to={'/signup'} onClick={modalClose}>
          <span className={classes.register}>회원가입 하기</span>
        </NavLink>
      </p>
      {/* <NaverLogin /> */}
    </div>
  );

  return (
    <header className="header" ref={header}>
      <NavLink to={'/'} className="logo">
        Laggard
      </NavLink>
      <ul>
        <li key="home">
          <NavLink to={'/'}>홈</NavLink>
        </li>
        <li key="test">
          <NavLink to={'/test'}>음악 타입 테스트</NavLink>
        </li>
        <li key="quiz">
          <NavLink to="/quiz">가사 낭독 퀴즈</NavLink>
        </li>
        {user === null ? (
          <li key="login">
            <div className="header_login" onClick={modalOpen}>
              로그인
            </div>
          </li>
        ) : (
          [
            <li key="myinfo">
              <div
                onClick={() => dispatch(openMyinfo())}
                className="header_myinfo"
              >
                내 정보
              </div>
            </li>,
            <li key="logout">
              <div className="header_logout" onClick={handleLogout}>
                로그아웃
              </div>
            </li>,
          ]
        )}
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
              <MenuItem onClick={handleClose}>음악 타입 테스트</MenuItem>
            </NavLink>
            <NavLink className={classes.link} to={'/quiz'}>
              <MenuItem onClick={handleClose}>가사 낭독 퀴즈</MenuItem>
            </NavLink>
            {user === null ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  modalOpen();
                }}
              >
                로그인
              </MenuItem>
            ) : (
              [
                <MenuItem
                  onClick={async () => {
                    await dispatch(openMyinfo());
                    handleClose();
                  }}
                  key="myinfo"
                >
                  내 정보
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  로그아웃
                </MenuItem>,
              ]
            )}
          </Menu>
        </div>
      )}
      {ReactDOM.createPortal(
        <div>
          <Modal className={classes.modal} open={open} onClose={modalClose}>
            {body}
          </Modal>
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert onClose={handleCloseSuccess} severity="success">
              로그인 하셨습니다
            </Alert>
          </Snackbar>
          <Snackbar
            open={openFailure}
            autoHideDuration={3000}
            onClose={handleCloseFailure}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert onClose={handleCloseFailure} severity="error">
              로그인에 실패하셨습니다 다시 시도해주세요
            </Alert>
          </Snackbar>
        </div>,
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
      borderRadius: '30px',
      backgroundColor: 'rgba(191, 191, 191, 0.9)',
      padding: theme.spacing(2, 4, 2),
      width: '300px',
      height: '250px',
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
        '&::placeholder': {
          color: 'transparent',
        },
      },
    },
    input_container: { display: 'grid', placeItems: 'center' },
    button: {
      width: '50%',
      margin: '5px',
      fontSize: '1rem',
      fontWeight: 500,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    register: {
      color: 'blue',
      cursor: 'pointer',
    },
    text: {
      fontSize: '0.9rem',
    },
    warning: {
      fontSize: '0.8rem',
      color: 'red',
    },
  }),
);
