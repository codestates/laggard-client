import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InfoIcon from '@material-ui/icons/Info';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';

const pwRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/);
const emailRegex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i,
);

const Signup: React.FC = () => {
  const initialInfo = {
    nickname: '',
    email: '',
    password: '',
    sex: true,
    age: 10,
    errors: {
      nickname: '',
      email: '',
      password: '',
      confirmPw: '',
    },
  };
  const [info, setInfo] = useState(initialInfo);
  const max992 = useMediaQuery('(max-width: 992px)');
  useEffect(() => {
    if (max992) {
      const header = document.querySelector('header') as HTMLElement;
      header.style.background = 'white';
    } else {
      const header = document.querySelector('header') as HTMLElement;
      header.style.background = 'black';
      header.style.padding = '5px 100px';
    }
  }, [max992]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const errors = info.errors;
    switch (name) {
      case 'nickname':
        errors.nickname =
          value.length < 5 ? '아이디는 5자 이상이어야 합니다' : '';
        break;
      case 'email':
        errors.email = emailRegex.test(value)
          ? ''
          : '올바른 이메일을 입력해주세요';
        break;
      case 'password':
        errors.password = pwRegex.test(value)
          ? ''
          : '비밀번호는 8자 이상, 그리고 숫자가 포함 되어야합니다';
        break;
      case 'confirmPw':
        errors.confirmPw =
          value === info.password ? '' : '입력한 비밀번호와 일치해야 합니다';
        break;
      default:
        break;
    }
    setInfo({ ...info, errors, [name]: value });
  };
  const handleSubmit = (e: any) => {
    const { nickname, email, password, sex, age } = info;
    e.preventDefault();
    let validity = true;
    Object.values(info.errors).forEach(
      (val) => val.length > 0 && (validity = false),
    );
    if (validity === true) {
      axios.post('http://localhost:5000/users/signup/basic', {
        nickname,
        email,
        password,
        sex,
        age,
      });
    } else {
      console.log('정보를 다시 확인해주세요');
    }
  };
  const { errors } = info;
  return (
    <div>
      <Container>
        <div className="signup-box">
          <div>
            <div className="signup-logo">
              <h2 className="neu-logo">LAGGARD</h2>
            </div>
            <Title>회원가입</Title>
          </div>
          <Fields onSubmit={handleSubmit}>
            {errors.nickname.length > 0 && (
              <div className="signup-idcheck">
                <InfoIcon />
                {errors.nickname}
              </div>
            )}
            <Username>
              <PersonOutlineIcon />
              <input
                type="username"
                placeholder="아이디"
                name="nickname"
                onChange={handleChange}
              />
            </Username>
            {errors.email.length > 0 && (
              <div className="signup-emailcheck">
                <InfoIcon />
                {errors.email}
              </div>
            )}
            <Email>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="이메일"
                name="email"
                onChange={handleChange}
              />
            </Email>
            {errors.password.length > 0 && (
              <div className="signup-pwcheck">
                <InfoIcon />
                {errors.password}
              </div>
            )}
            <Password>
              <LockOutlinedIcon />
              <input
                type="password"
                placeholder="비밀번호"
                name="password"
                onChange={handleChange}
              />
            </Password>
            {errors.confirmPw.length > 0 && (
              <div className="signup-pwrecheck">
                <InfoIcon />
                {errors.confirmPw}
              </div>
            )}
            <Password>
              <LockOutlinedIcon />
              <input
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPw"
                onChange={handleChange}
              />
            </Password>
            <SexAge>
              <div className="signup-sex">
                <label htmlFor="sex">성별</label>
                <select name="sex" onChange={handleChange} id="sex">
                  <option value={1}>남</option>
                  <option value={0}>여</option>
                </select>
              </div>
              <div className="signup-age">
                <label htmlFor="age">나이</label>
                <select name="age" onChange={handleChange} id="age">
                  <option value={10}>10대</option>
                  <option value={20}>20대</option>
                  <option value={30}>30대</option>
                  <option value={40}>40+</option>
                </select>
              </div>
            </SexAge>
          </Fields>
          <SignupButton>
            <button onClick={handleSubmit}>회원가입</button>
          </SignupButton>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Signup);

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 108vh;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;

  .signup-box {
    width: 430px;
    height: 700px;
    border-radius: 40px;
    background: #ecf0f3;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    .signup-idcheck,
    .signup-emailcheck,
    .signup-pwrecheck {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      color: red;
      padding-left: 16px;
      padding-bottom: 4px;
      padding-top: 4px;

      > .MuiSvgIcon-root {
        font-size: 0.8rem;
        margin-right: 4px;
      }
    }
    .signup-pwcheck {
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      color: red;
      padding-left: 16px;
      margin-bottom: 4px;
      margin-top: 4px;

      > .MuiSvgIcon-root {
        font-size: 0.8rem;
        margin-right: 4px;
      }
    }

    .signup-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 2.5rem;
      border-radius: 40px;
      box-shadow: 0px 0px 2px #5f5f5f, 0px 0px 0px #ecf0f3, 5px 5px 12px #a7aaaf,
        -6px -6px 12px white;
      .neu-logo {
        letter-spacing: 2px;
        font-weight: 700;
      }
    }
  }
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  letter-spacing: 3px;
  color: gray;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

const Fields = styled.form`
  width: 300px;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px white;
  > .MuiSvgIcon-root {
    margin: 0px 0px 0px 10px;
    color: gray;
  }
  > input {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
    padding: 20px 10px 20px;
  }
`;
const Password = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px white;
  > .MuiSvgIcon-root {
    margin: 0px 0px 0px 10px;
    color: gray;
  }
  > input {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
    padding: 20px 10px 20px 5px;
  }
`;

const Email = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px white;
  > .MuiSvgIcon-root {
    margin: 0px 0px 0px 10px;
    color: gray;
  }
  > input {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
    padding: 20px 10px 20px 5px;
  }
`;

const SexAge = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  > .signup-sex label,
  > .signup-age label {
    font-size: 1.2rem;
    letter-spacing: 3px;
    color: gray;
    font-weight: 600;
  }
  > .signup-sex select,
  > .signup-age select {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
  }
  > .signup-sex option,
  > .signup-age option {
    font-weight: 600;
    font-size: 1rem;
    color: gray;
  }
`;

const SignupButton = styled.div`
  width: 300px;
  > button {
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-size: 17px;
    border-radius: 30px;
    font-weight: 700;
    color: white;
    text-align: center;
    background: #24cfaa;
    box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px white;
    transition: 0.5s;
    letter-spacing: 3px;
  }
  & > button:hover {
    background: #2fdbb6;
  }
  & > button:active {
    background: #1da88a;
  }
`;
