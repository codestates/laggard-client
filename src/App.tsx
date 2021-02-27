import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Test from './pages/Test';
import Game from './pages/Game';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout);
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route exact path={'/test'} component={Test} />
          <Route exact path={'/game'} component={Game} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
