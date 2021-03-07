import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Test from './pages/Test';
import Quiz from './pages/Quiz';
import Header from './components/Header';
import Signup from './pages/Signup';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './features/userSlice';
import Userinfo from './modals/Userinfo';
import UserinfoMessages from './popupbars/UserinfoMessages';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios
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
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
        });
    }
  }, []);
  return (
    <div className="app" id="app">
      <BrowserRouter>
        <Header />
        <Userinfo />
        <UserinfoMessages />
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route exact path={'/test'} component={Test} />
          <Route exact path={'/quiz'} component={Quiz} />
          <Route exact path={'/signup'} component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
