import React from 'react';
import Banner from '../components/main/Banner';
import { withRouter } from 'react-router-dom';

const Test: React.FC = () => {
  return (
    <div className="test">
      <Banner />
    </div>
  );
};

export default withRouter(Test);
