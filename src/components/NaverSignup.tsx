import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { saveToken, selectToken } from '../features/tokenSlice';
import { login, selectUser } from '../features/userSlice';

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

const NaverSignup: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '5tQF0iVwkjDyV_pxq7uO',
      callbackUrl: 'http://localhost:3000/signup',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();

    naverLogin.getLoginStatus(function (status: any) {
      if (status) {
        console.log(naverLogin.user);

        const nickname = naverLogin.user.getNickName();
        const email = naverLogin.user.getEmail();
        let sex = naverLogin.user.getGender();
        const year = naverLogin.user.getBirthyear();
        const birth_year = parseInt(year);

        if (email === undefined || email === null) {
          alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
          return;
        }

        if (birth_year === undefined || birth_year === null) {
          alert('출생년도는 필수정보입니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
          return;
        }

        if (sex === 'M') {
          sex = true;
        } else if (sex === 'F') {
          sex = false;
        }

        axios.post('http://localhost:5000/users/signup/basic', {
          nickname,
          email,
          birth_year,
          sex,
        });

        dispatch(login({ nickname, email, birth_year, sex }));
      }
      console.log(user);
    });
  };

  const getNaverToken = () => {
    window.location.href.includes('access_token') && GetUser();
    function GetUser() {
      const location = window.location.href.split('=')[1];
      const token = location.split('&')[0];
      // dispatch(saveToken({ token }));
      localStorage.setItem('access_token', token);
    }
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  return (
    <div>
      <NaverButton id="naverIdLogin" />
    </div>
  );
};

export default NaverSignup;

const NaverButton = styled.div`
  margin-bottom: 4px;
  outline: none;
  cursor: pointer;
`;
