import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { testStartTrue } from '../../features/modalSlice';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';
import { getSongs } from '../../features/testInfoSlice';
import { selectUser } from '../../features/userSlice';
import {
  openInvalidBirthYear,
  openServerError,
} from '../../features/messageSlice';

const yearRegex = RegExp(/^(19[0-9][0-9]|20[01][0-9]|2020)$/);

const TestInstruction: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);

  // eslint-disable-next-line
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userInfo) {
      if (yearRegex.test(userInfo.birth_year.toString())) {
        await axios
          .get(
            `http://localhost:5000/tests?sex=${userInfo.sex}&birth_year=${userInfo.birth_year}`,
            { withCredentials: true },
          )
          .then((res) => {
            dispatch(getSongs(res.data));
          })
          .then(() => {
            dispatch(testStartTrue());
          })
          .catch(() => {
            dispatch(openServerError());
          });
      } else {
        dispatch(openInvalidBirthYear());
      }
    } else {
      dispatch(testStartTrue());
    }
  };

  return (
    <InstructionContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>음악 타입 테스트</h2>
        </ScrollAnimation>
      </Title>
      <Explanation>
        <p>예상 소요 시간 : 7분</p>
        <p>지금부터 듣기 평가가 시작됩니다.</p>
        <p>가사를 듣고 노래 제목을 입력해주세요.</p>
        <br></br>
        <p className="warningex">
          주의사항: 부제나 피처링 가수를 제외한 제목만 입력하시면 됩니다.
        </p>
        <p>예시) VVS (Feat. JUSTHIS) ➡️ VVS</p>
      </Explanation>
      <Button>
        <button onClick={handleSubmit}>시작하기</button>
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
  h2 {
    font-size: 40px;
  }
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  height: 50%;
  font-size: 20px;
  color: white;
  > p {
    word-break: keep-all;
  }
  @media (max-width: 900px) {
    .warningex {
    }
  }
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
