import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  closeSignupSuccess,
  openAlreadySigned,
  openServerError,
  openSignupSuccess,
  selectSignupSuccess,
} from '../features/messageSlice';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';

declare global {
  interface Window {
    // eslint-disable-next-line
    naver: any;
  }
}

const { naver } = window;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NaverSignup: React.FC = () => {
  const dispatch = useDispatch();
  const signupSuccess = useSelector(selectSignupSuccess);
  const history = useHistory();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '5tQF0iVwkjDyV_pxq7uO',
      callbackUrl: 'http://localhost:3000/signup',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();
    // eslint-disable-next-line
    naverLogin.getLoginStatus(function (status: any) {
      if (status) {
        const { email, gender, name, nickname, birthyear } = naverLogin.user;
        if (email && gender && name && nickname && birthyear) {
          return;
        } else {
          alert('필수 항목을 모두 체크해주세요');
          naverLogin.reprompt();
          return;
        }
      }
    });
  };

  const getNaverToken = () => {
    const url = new URL(window.location.href);
    if (url.hash) {
      const token = url.hash.split('=')[1].split('&')[0];
      requestSocialSignup(token);
    }
  };
  const requestSocialSignup = (token: string) => {
    axios
      .post(
        'http://localhost:5000/users/signup/social',
        {
          socialToken: token,
        },
        { withCredentials: true },
      )
      .then(() => {
        dispatch(openSignupSuccess());
        history.push('/');
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 409') {
          dispatch(openAlreadySigned());
          history.push('/signup');
        } else {
          history.push('/signup');
          dispatch(openServerError());
        }
      });
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  return (
    <div>
      <NaverButton id="naverIdLogin" />
      {ReactDOM.createPortal(
        <Snackbar
          open={signupSuccess}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(closeSignupSuccess());
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSignupSuccess());
            }}
            severity="success"
          >
            회원가입에 성공하셨습니다! 로그인 해주세요
          </Alert>
        </Snackbar>,
        document.body,
      )}
    </div>
  );
};

export default NaverSignup;

const NaverButton = styled.div`
  margin-bottom: 4px;
  outline: none;
  cursor: pointer;
`;
