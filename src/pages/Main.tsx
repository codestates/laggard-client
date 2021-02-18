import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';

function Main() {
  return (
    <div className="main">
      <Header />
    </div>
  );
}

export default withRouter(Main);
