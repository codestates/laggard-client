import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { guestFalse, selectGuest, selectUser } from '../../features/userSlice';
import QuizSexAge from '../../modals/quiz/QuizSexAge';
import QuizSelectDecade from '../../modals/quiz/QuizSelectDecade';
import QuizEvaluate from '../../modals/quiz/QuizEvaluate';
import QuizResult from '../../modals/quiz/QuizResult';
import {
  quizEndFalse,
  quizStartFalse,
  selectQuizEnd,
  selectQuizStart,
} from '../../features/modalSlice';

const QuizGame: React.FC = () => {
  const user = useSelector(selectUser);
  const guest = useSelector(selectGuest);
  const quizStart = useSelector(selectQuizStart);
  const quizEnd = useSelector(selectQuizEnd);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(guestFalse());
    dispatch(quizStartFalse());
    dispatch(quizEndFalse());
  }, []);

  return (
    <QuizGameContainer>
      {!user && !guest ? (
        <QuizSexAge />
      ) : !quizStart ? (
        <QuizSelectDecade />
      ) : !quizEnd ? (
        <QuizEvaluate />
      ) : (
        <QuizResult />
      )}
    </QuizGameContainer>
  );
};

export default QuizGame;

const QuizGameContainer = styled.div`
  background: rgba(255, 255, 255, 0.3);
  width: 800px;
  height: 500px;
  backdrop-filter: blur(7px);
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
