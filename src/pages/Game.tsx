import React from 'react';
import styled from 'styled-components';
import QuizGame from '../components/game/QuizGame';
import { withRouter } from 'react-router-dom';

const Game: React.FC = () => {
  return (
    <div className="game">
      <GameContainer>
        <GameQuiz>
          <QuizGame />
        </GameQuiz>
      </GameContainer>
    </div>
  );
};

export default withRouter(Game);

const GameContainer = styled.div`
  background: black;
`;
const GameQuiz = styled.section``;
