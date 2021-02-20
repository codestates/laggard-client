import React from 'react';
import About from '../components/About';
import Banner from '../components/Banner';
import Scoreboard from '../components/Scoreboard';
import Team from '../components/Team';
import './Main.css';

const Main: React.FC = () => {
  return (
    <div className="main">
      <Banner />
      <About />
      <Scoreboard />
      <Team />
    </div>
  );
};

export default Main;
