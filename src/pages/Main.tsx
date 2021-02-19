import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import './Main.css';

const Main: React.FC = () => {
  return (
    <div className="main">
      <div className="main_container">
        <div className="main_header">
          <Header />
        </div>
        <img src="/src/assets/img/djdark.jpg" alt="" />
        <section className="banner">
          <h2>노래 가사만 듣고 노래 제목을 맞춰보세요</h2>
        </section>
      </div>
    </div>
  );
};

export default withRouter(Main);
