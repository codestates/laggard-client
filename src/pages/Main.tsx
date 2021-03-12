import React, { useEffect } from 'react';
import About from '../components/main/About';
import Banner from '../components/main/Banner';
import Footer from '../components/main/Footer';
import Scoreboard from '../components/main/Scoreboard';
import Team from '../components/main/Team';
import './Main.css';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { openServerError } from '../features/messageSlice';

const Main: React.FC = () => {
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
        history.push('/');
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
      .catch(() => {
        history.push('/signup');
        dispatch(openServerError());
      });
  };
  return (
    <div className="main">
      <Banner />
      <About />
      <Scoreboard />
      <Team />
      <Footer />
    </div>
  );
};

export default withRouter(Main);
