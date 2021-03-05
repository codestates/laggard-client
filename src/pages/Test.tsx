import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Test: React.FC = () => {
  return (
    <TestContainer>
      <TestBackground>
        <img src="" alt="" />
      </TestBackground>
    </TestContainer>
  );
};

export default withRouter(Test);

const TestContainer = styled.div`
  background: black;
`;
const TestBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 300% 300%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
