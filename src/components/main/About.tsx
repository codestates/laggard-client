import React, { useEffect, useRef } from 'react';
import './About.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

const About: React.FC = () => {
  const left = useRef<HTMLDivElement>();
  useEffect(() => {
    if (left) {
      window.addEventListener('scroll', () => {
        left.current?.classList.toggle('animate', window.scrollY > 0);
      });
    }
  }, []);

  return (
    <section className="about">
      <div className="about_container">
        <div className="about_left">
          <ScrollAnimation
            offset={100}
            animateIn="animate__slideInLeft"
            duration={0.5}
          >
            <h3>About</h3>
          </ScrollAnimation>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInLeft"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              recusandae omnis doloremque nam deserunt saepe est consequatur
              adipisci minima vitae. Quis maxime quas qui dicta. Suscipit optio
              dignissimos quos. Adipisci!
            </p>
          </ScrollAnimation>
        </div>
        <div className="about_right">
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInRight"
          >
            <h3>참여자 수</h3>
          </ScrollAnimation>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInRight"
          >
            <span>1,000</span>
          </ScrollAnimation>
          <br></br>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__zoomIn"
          >
            <PeopleAltIcon fontSize="large" />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;
