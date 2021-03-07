import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { guestTrue } from '../../features/userSlice';

const yearRegex = RegExp(/^(19[0-9][0-9]|20[01][0-9]|2020)$/);

const TestSexAge: React.FC = () => {
  const dispatch = useDispatch();

  const initialInfo = {
    sex: true,
    birth_year: 2021,
  };
  const [info, setInfo] = useState(initialInfo);
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { sex, birth_year } = info;
    if (yearRegex.test(birth_year.toString())) {
      dispatch(guestTrue());
    } else {
      console.log('error');
    }
  };
  return (
    <SexAgeContainer>
      <SexAgeTitle>
        <h2>
          성별과 출생연도를 <br></br>알려주세요
        </h2>
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
        />
      </AgeInput>
      <SexAgeButton>
        <button onClick={handleSubmit}>확인</button>
      </SexAgeButton>
    </SexAgeContainer>
  );
};

export default TestSexAge;

const SexAgeContainer = styled.div`
  width: 60%;
  height: 60%;
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
`;
const SexSelect = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 24px;
  font-size: 20px;
  font-weight: 600;
  > select {
    margin-left: 4px;
    height: 24px;
    width: 40px;
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
