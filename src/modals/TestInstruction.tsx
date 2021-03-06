import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { testStartTrue } from '../features/modalSlice';

const TestInstruction: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(testStartTrue());
  };

  return (
    <InstructionContainer>
      <Title>
        <h2>한국 음악 듣기 평가</h2>
      </Title>
      <Explanation>
        <p>예상 소요 시간 : 8분</p>
        <span>15문</span>
        <p>지금부터 듣기 평가가 시작됩니다.</p>
        <p>가사를 듣고 노래 제목을 입력해주세요.</p>
      </Explanation>
      <Button>
        <button onClick={handleClick}>시작하기</button>
      </Button>
    </InstructionContainer>
  );
};

export default TestInstruction;

const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
`;
const Title = styled.div`
  color: whitesmoke;
  > h2 {
    font-size: 40px;
  }
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
  font-size: 20px;
  color: white;
`;

const Button = styled.div`
  > button {
    width: 120px;
    height: 50px;
    background-color: #00adb5;
    border: none;
    border-radius: 10px;
    transition: 0.3s;
    font-weight: 600;
    font-size: 24px;
    :hover {
      background-color: #04ccd6;
      cursor: pointer;
      transform: scale(1.03);
    }
    :focus {
      outline: none;
    }
    :active {
      background-color: #01888f;
    }
  }
`;
