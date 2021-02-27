import React from 'react';
import About from '../components/main/About';
import Banner from '../components/main/Banner';
import Footer from '../components/main/Footer';
import Scoreboard from '../components/main/Scoreboard';
import Team from '../components/main/Team';
import './Main.css';

const Main: React.FC = () => {
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

export default Main;
