import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { quizEndFalse, quizStartFalse } from '../../features/modalSlice';
import { logout, removeGuestToken, selectUser } from '../../features/userSlice';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import {
  resetTotalScore,
  selectQuizTime,
  selectTotalScore,
} from '../../features/quizInfoSlice';
import axios from 'axios';
import {
  openInvalidUser,
  openRecordPoints,
  openServerError,
} from '../../features/messageSlice';
import { useHistory } from 'react-router';

const QuizResult: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const totalScore = useSelector(selectTotalScore);
  const user = useSelector(selectUser);
  const songs_year = useSelector(selectQuizTime);
  const handleRestart = () => {
    dispatch(removeGuestToken());
    dispatch(quizStartFalse());
    dispatch(quizEndFalse());
    dispatch(resetTotalScore());
  };

  const submitScore = () => {
    axios
      .get(
        `http://localhost:5000/quiz/submitScore?totalScore=${totalScore}&songs_year=${songs_year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      .then(() => {
        dispatch(openRecordPoints());
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 409') {
          dispatch(logout());
          dispatch(openInvalidUser());
          history.push('/');
        } else {
          dispatch(openServerError());
        }
      });
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
          내 점수는 : <span>{totalScore}</span>
        </h2>
      </Points>
      <Buttons>
        {!user ? (
          <div className="right">
            <button onClick={handleRestart}>다시하기</button>
          </div>
        ) : (
          [
            <div key="left" className="left">
              <button onClick={submitScore}>저장하기</button>
            </div>,
            <div key="right" className="right">
              <button onClick={handleRestart}>다시하기</button>
            </div>,
          ]
        )}
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
  justify-content: center;
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
