import React from 'react';
import './About.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about_container">
        <div className="about_left">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            recusandae omnis doloremque nam deserunt saepe est consequatur
            adipisci minima vitae. Quis maxime quas qui dicta. Suscipit optio
            dignissimos quos. Adipisci!
          </p>
        </div>
        <div className="about_right">
          <h3>참여자 수</h3>
          <span>1,000</span>
          <br></br>
          <PeopleAltIcon fontSize="large" />
        </div>
      </div>
    </section>
  );
};

export default About;
