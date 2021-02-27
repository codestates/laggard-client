import React from 'react';
import styled from 'styled-components';
import QuizGame from '../components/game/QuizGame';

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

export default Game;

const GameContainer = styled.div`
  background: black;
`;
const GameQuiz = styled.section``;
