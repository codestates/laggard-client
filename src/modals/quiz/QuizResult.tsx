import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quizEndFalse, quizStartFalse } from '../../features/modalSlice';
import { removeGuestToken } from '../../features/userSlice';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

const QuizResult: React.FC = () => {
  const dispatch = useDispatch();
  const handleRestart = () => {
    dispatch(removeGuestToken());
    dispatch(quizStartFalse());
    dispatch(quizEndFalse());
  };
  return (
    <ResultContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h1>Game Over</h1>
        </ScrollAnimation>
      </Title>
      <Points>
        <h2>
          내 점수는 : <span>100점</span>
        </h2>
      </Points>
      <Buttons>
        <div className="left">
          <button>저장하기</button>
        </div>
        <div className="right">
          <button onClick={handleRestart}>다시하기</button>
        </div>
      </Buttons>
    </ResultContainer>
  );
};

export default QuizResult;

const ResultContainer = styled.div`
  display: flex;
  height: 70%;
  width: 70%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  color: whitesmoke;
`;
const Title = styled.div`
  font-size: 30px;
`;
const Points = styled.div`
  font-size: 20px;
`;
const Buttons = styled.div`
  display: flex;
  width: 100%;
  .left,
  .right {
    flex: 0.5;
    display: flex;
    justify-content: center;
    button {
      width: 120px;
      height: 48px;
      font-size: 24px;
      border-radius: 8px;
      background: black;
      color: whitesmoke;
      font-weight: 700;
      transition: 0.2s;
      cursor: pointer;
      :hover {
        transform: scale(1.03);
      }
      :focus {
        outline: none;
      }
    }
  }
  .left button {
    border: 3px solid #00a1ff;
  }
  .right button {
    border: 3px solid #0f0;
  }
`;
