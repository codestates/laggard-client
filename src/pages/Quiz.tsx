import React, { useEffect } from 'react';
import styled from 'styled-components';
import QuizGame from '../components/quiz/QuizGame';
import { useLocation, withRouter } from 'react-router-dom';
import img from '../assets/img/darkconcert5.jpg';
import { useMediaQuery } from '@material-ui/core';

const Quiz: React.FC = () => {
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
  return (
    <GameContainer>
      <QuizBackground>
        <QuizGame />
      </QuizBackground>
    </GameContainer>
  );
};

export default withRouter(Quiz);

const GameContainer = styled.div`
  background: black;
`;
const QuizBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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
`;
