import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quizStartTrue } from '../../features/modalSlice';
import { chooseQuizAge } from '../../features/quizInfoSlice';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

const QuizSelectDecade: React.FC = () => {
  const dispatch = useDispatch();
  const initialInfo = 1980;
  const [info, setInfo] = useState(initialInfo);

  const handleClick = () => {
    dispatch(chooseQuizAge(info));
    dispatch(quizStartTrue());
  };
  // eslint-disable-next-line
  const handleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setInfo(value);
  };

  return (
    <Container>
      <div className="title">
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h3>퀴즈의 시대를 선택해주세요</h3>
        </ScrollAnimation>
      </div>
      <div>
        <label htmlFor="year">
          노래 시대 :
          <select onChange={handleChange} name="year" id="year">
            <option value="1980">1980</option>
            <option value="1980">1985</option>
            <option value="1990">1990</option>
            <option value="1990">1995</option>
            <option value="2000">2000</option>
            <option value="2000">2005</option>
            <option value="2010">2010</option>
            <option value="2010">2015</option>
            <option value="1">랜덤</option>
          </select>
        </label>
      </div>
      <div className="button">
        <button onClick={handleClick}>시작하기</button>
      </div>
    </Container>
  );
};

export default QuizSelectDecade;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  color: whitesmoke;

  .title {
    font-size: 40px;
    letter-spacing: 2px;
    @media (max-width: 900px) {
      font-size: 24px;
    }
  }

  label {
    font-size: 20px;
    font-weight: 700;
  }

  select {
    margin-left: 8px;
    width: 100px;
    font-size: 16px;
    text-align: center;
    background: gray;
    color: whitesmoke;
    :focus {
      outline: none;
    }
  }

  button {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 8px 24px;
    background-color: black;
    border-radius: 6px;
    transition: 0.2s;
  }
  button:hover {
    border: 3px solid #00adb5;
    transform: scale(1.01);
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;
