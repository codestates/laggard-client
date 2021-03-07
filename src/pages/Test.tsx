import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import righttri from '../assets/img/1.png';
import leftx from '../assets/img/2.png';
import bottomsq from '../assets/img/3.png';
import rightpoli from '../assets/img/4.png';
import lefthexa from '../assets/img/11.png';
import star from '../assets/img/7.png';
import TestGame from '../components/test/TestGame';
import img from '../assets/img/darkconcert4.jpg';
import { useMediaQuery } from '@material-ui/core';

const Test: React.FC = () => {
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
  useEffect(() => {
    const fig = document.querySelectorAll('.figure');
    const parallax = (e: any) => {
      fig.forEach((shape: any) => {
        const speed = shape.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    document.addEventListener('mousemove', parallax);
  });
  return (
    <TestContainer>
      <TestBackground>
        <TestGame />
        <img className="figure" data-speed="-5" src={righttri} alt="" />
        <img className="figure" data-speed="2" src={leftx} alt="" />
        <img className="figure" data-speed="-5" src={bottomsq} alt="" />
        <img className="figure" data-speed="-1" src={rightpoli} alt="" />
        <img className="figure" data-speed="-9" src={lefthexa} alt="" />
        <img className="figure" data-speed="-7" src={star} alt="" />
      </TestBackground>
    </TestContainer>
  );
};

export default withRouter(Test);

const TestContainer = styled.div`
  background: black;
`;
const TestBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); */
  background-color: black;
  background-size: 300% 300%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${img});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  /* animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  } */
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
