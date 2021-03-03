import React from 'react';
import styled from 'styled-components';
import img from '../../assets/img/concertdark.jpg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Login from '../../modals/QuizLogin';
import Guest from '../../modals/GuestModal';
import Quiz from '../../modals/QuizModal';

const QuizGame: React.FC = () => {
  const user = useSelector(selectUser);
  // user = {
  //   nickname: 'user',
  //   email: 'user',
  //   sex: true,
  //   birth_year: 1990,
  // };
  return (
    <GameDiv>
      <GameContainer>
        {user === null ? (
          <LoginContainer>
            <Guest /> <p>-------------------------</p>
            <Login />
          </LoginContainer>
        ) : (
          <QuizContainer>
            <Quiz />
          </QuizContainer>
        )}
      </GameContainer>
    </GameDiv>
  );
};

export default QuizGame;

const GameDiv = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 108vh;
  background-image: url(${img});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  justify-content: center;
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  > p {
    color: white;
  }
`;

const QuizContainer = styled.div``;
