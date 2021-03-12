import React, { useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import QuizNaverlogin from '../../components/QuizNaverSignin';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={5} variant="filled" {...props} />;
}

const QuizLogin: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    history.push('/signup');
  };

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
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
        setOpen(false);
      })
      .catch(() => {
        handleOpenFailure();
      });
  };

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

  const body = (
    <div className={classes.container}>
      <h2 className={classes.title}>LAGGARD</h2>
      <input
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
      <button onClick={handleLogin} className={classes.button}>
        로그인
      </button>
      <QuizNaverlogin />
      <p className={classes.text}>
        회원이 아니세요?{' '}
        <span onClick={handleRegister} className={classes.register}>
          회원가입 하기
        </span>
      </p>
    </div>
  );

  return (
    <div className="gameLogin">
      <LoginContainer>
        <LoginContent>
          <p>로그인을 하시면 점수를 저장 할 수 있습니다</p>
          <button type="button" onClick={handleOpen}>
            로그인하기
          </button>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            {body}
          </Modal>
        </LoginContent>
      </LoginContainer>
      {ReactDOM.createPortal(
        <div>
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
    </div>
  );
};

export default QuizLogin;

const LoginContainer = styled.div``;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75px;
  > p {
    color: white;
    margin-bottom: 8px;
  }

  > button {
    font-size: 16px;
    font-weight: 600;
    padding: 8px 24px;
    background-color: rgba(191, 191, 191, 0.9);
    border: none;
    border-radius: 10px;
    transition: 0.2s;
    margin-bottom: 4px;
  }
  > button:hover {
    border: 2px solid #00adb5;
    cursor: pointer;
  }
  > button:focus {
    outline: none;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);
