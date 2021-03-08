import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { guestFalse, selectGuest, selectUser } from '../../features/userSlice';
import SexAge from '../../modals/test/TestSexAge';
import TestInstruction from '../../modals/test/TestInstruction';
import TestResult from '../../modals/test/TestResult';
import {
  selectTestStart,
  selectTestEnd,
  testStartFalse,
  testEndFalse,
} from '../../features/modalSlice';
import TestEvaluate from '../../modals/test/TestEvaluate';
import {
  resetCurrNum,
  resetResult,
  resetSongs,
} from '../../features/testInfoSlice';

const TestGame: React.FC = () => {
  const user = useSelector(selectUser);
  const guest = useSelector(selectGuest);
  const testStart = useSelector(selectTestStart);
  const testEnd = useSelector(selectTestEnd);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(guestFalse());
    dispatch(testStartFalse());
    dispatch(testEndFalse());
    dispatch(resetCurrNum());
    dispatch(resetResult());
    dispatch(resetSongs());
  }, []);

  return (
    <TestGameContainer>
      {!user && !guest ? (
        <SexAge />
      ) : !testStart ? (
        <TestInstruction />
      ) : !testEnd ? (
        <TestEvaluate />
      ) : (
        <TestResult />
      )}
    </TestGameContainer>
  );
};

export default TestGame;

const TestGameContainer = styled.div`
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
