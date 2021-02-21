import React from 'react';
import './Team.css';
import profile1 from '../assets/img/profile1.jpeg';

const Team: React.FC = () => {
  return (
    <section className="team">
      <h2 className="team_title">Team Laggards</h2>
      <div className="team_container">
        <div className="team_profiles">
          <div className="profile_box">
            <div className="profile_image">
              <img src={profile1} alt="" />
            </div>
            <div className="profile_info">
              <h2>
                안정현<br></br>
                <span>Front-end Developer</span>
              </h2>
            </div>
          </div>
          <div className="profile_box">
            <div className="profile_image">
              <img src={profile1} alt="" />
            </div>
            <div className="profile_info">
              <h2>
                이창섭<br></br>
                <span>Back-end Developer</span>
              </h2>
            </div>
          </div>
          <div className="profile_box">
            <div className="profile_image">
              <img src={profile1} alt="" />
            </div>
            <div className="profile_info">
              <h2>
                임재현<br></br>
                <span>Back-end Developer</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
