import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getGuestToken } from '../../features/userSlice';
import QuizLogin from './QuizLogin';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';
import {
  openInvalidBirthYear,
  openServerError,
} from '../../features/messageSlice';

const yearRegex = RegExp(/^(19[0-9][0-9]|20[01][0-9]|2020)$/);

const QuizSexAge: React.FC = () => {
  const dispatch = useDispatch();

  const initialInfo = {
    sex: true,
    birth_year: 2021,
  };
  const [info, setInfo] = useState(initialInfo);
  // eslint-disable-next-line
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { sex, birth_year } = info;
    if (yearRegex.test(birth_year.toString())) {
      axios
        .post(
          'http://localhost:5000/users/signin/withoutLogin',
          {
            sex,
            birth_year,
          },
          { withCredentials: true },
        )
        .then((result) => {
          dispatch(getGuestToken(result.data.accessToken));
        })
        .catch(() => {
          dispatch(openServerError());
        });
    } else {
      dispatch(openInvalidBirthYear());
    }
  };
  return (
    <SexAgeContainer>
      <SexAgeTitle>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>
            문제 출제를 위해 <br></br>정보를 입력해주세요
          </h2>
        </ScrollAnimation>
      </SexAgeTitle>
      <SexSelect>
        <label htmlFor="sex">성별 : </label>
        <select name="sex" onChange={handleChange}>
          <option value={1}>남</option>
          <option value={0}>여</option>
        </select>
      </SexSelect>
      <AgeInput>
        <label htmlFor="birth_year">출생연도 : </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="예: 2000"
          id="testage"
          name="birth_year"
          autoComplete="off"
        />
      </AgeInput>
      <SexAgeButton>
        <button onClick={handleSubmit}>확인</button>
      </SexAgeButton>
      <QuizLogin />
    </SexAgeContainer>
  );
};

export default QuizSexAge;

const SexAgeContainer = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: whitesmoke;
`;
const SexAgeTitle = styled.div`
  text-align: center;
  color: whitesmoke;
  font-size: 30px;
  font-weight: 700;
  word-break: keep-all;
  @media (max-width: 900px) {
    font-size: 20px;
  }
`;
const SexSelect = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 20px;
  height: 24px;
  font-weight: 600;
  > select {
    margin-left: 4px;
    height: 32px;
    width: 48px;
    background: gray;
    font-size: 16px;
    color: whitesmoke;
    :focus {
      outline: none;
    }
  }
`;
const AgeInput = styled.div`
  display: flex;
  justify-content: center;
  > label {
    font-size: 20px;
    font-weight: 700;
  }
  > input {
    width: 50%;
    text-align: center;
    background-color: gray;
    border-radius: 10px;
    margin-left: 8px;
    color: whitesmoke;
    font-size: 16px;
    ::placeholder {
      color: whitesmoke;
      font-style: italic;
    }
    :focus {
      outline: none;
      ::placeholder {
        color: transparent;
      }
    }
  }
`;
const SexAgeButton = styled.div`
  > button {
    width: 120px;
    height: 28px;
    background-color: #00adb5;
    border: none;
    border-radius: 10px;
    transition: 0.3s;
    font-weight: 600;
    font-size: 16px;
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
