import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeGuestToken,
  selectGuestToken,
  selectUser,
} from '../../features/userSlice';
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
import { resetTotalScore } from '../../features/quizInfoSlice';

const QuizGame: React.FC = () => {
  const user = useSelector(selectUser);
  const guestToken = useSelector(selectGuestToken);
  const quizStart = useSelector(selectQuizStart);
  const quizEnd = useSelector(selectQuizEnd);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeGuestToken());
    dispatch(quizStartFalse());
    dispatch(quizEndFalse());
    dispatch(resetTotalScore());
  }, []);

  return (
    <QuizGameContainer>
      {!user && !guestToken ? (
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
