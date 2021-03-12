import React, { useEffect } from 'react';
import styled from 'styled-components';
import QuizGame from '../components/quiz/QuizGame';
import { useHistory, withRouter } from 'react-router-dom';
import img from '../assets/img/darkconcert5.jpg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../features/userSlice';
import { openServerError } from '../features/messageSlice';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getNaverToken();
  }, []);

  const history = useHistory();
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
        'http://localhost:5000/users/signin/social',
        {
          socialToken: token,
        },
        { withCredentials: true },
      )
      .then((result) => {
        localStorage.setItem('accessToken', result.data.data);
        history.push('/quiz');
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
      .catch(() => {
        history.push('/signup');
        dispatch(openServerError());
      });
  };
  return (
    <GameContainer>
      <QuizBackground>
        <QuizGame />
      </QuizBackground>
    </GameContainer>
  );
};

export default withRouter(Quiz);

const GameContainer = styled.div`
  background: black;
`;
const QuizBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
  background-size: 300% 300%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${img});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;
