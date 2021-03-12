import React from 'react';
import './Team.css';
import profile1 from '../../assets/img/profile1.jpeg';
import profile2 from '../../assets/img/profile2.png';
import profile3 from '../../assets/img/profile3.jpg';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

const Team: React.FC = () => {
  return (
    <section className="team">
      <ScrollAnimation offset={100} animateIn="animate__zoomIn" duration={0.4}>
        <h2 className="team_title">Team Laggards</h2>
      </ScrollAnimation>
      <div className="team_container">
        <div className="team_profiles">
          <ScrollAnimation
            offset={100}
            animateIn="animate__bounceIn"
            duration={0.4}
          >
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
          </ScrollAnimation>
          <ScrollAnimation
            offset={100}
            animateIn="animate__bounceIn"
            duration={0.4}
            delay={100}
          >
            <div className="profile_box">
              <div className="profile_image">
                <img src={profile2} alt="" />
              </div>
              <div className="profile_info">
                <h2>
                  이창섭<br></br>
                  <span>Back-end Developer</span>
                </h2>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            offset={100}
            animateIn="animate__bounceIn"
            duration={0.4}
            delay={200}
          >
            <div className="profile_box">
              <div className="profile_image">
                <img src={profile3} alt="" />
              </div>
              <div className="profile_info">
                <h2>
                  임재현<br></br>
                  <span>Back-end Developer</span>
                </h2>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Team;
