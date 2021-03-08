import React from 'react';
import styled from 'styled-components';
import QuizGame from '../components/quiz/QuizGame';
import { withRouter } from 'react-router-dom';
import img from '../assets/img/darkconcert5.jpg';

const Quiz: React.FC = () => {
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
