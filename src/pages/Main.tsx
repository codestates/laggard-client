import React, { useEffect } from 'react';
import About from '../components/main/About';
import Banner from '../components/main/Banner';
import Footer from '../components/main/Footer';
import Scoreboard from '../components/main/Scoreboard';
import Team from '../components/main/Team';
import './Main.css';
import { useLocation, withRouter } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';

const Main: React.FC = () => {
  const location = useLocation();
  const max992 = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement;
    if (max992 && location.pathname !== '/signup') {
      header.style.background = 'white';
      header.style.padding = '5px 100px';
    } else if (!max992 && location.pathname !== '/signup') {
      header.style.background = 'none';
      header.style.padding = '40px 100px';
    }
  }, [max992]);
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
