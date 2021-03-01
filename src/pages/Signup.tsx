import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InfoIcon from '@material-ui/icons/Info';

const Signup: React.FC = () => {
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
          <Fields>
            <div className="signup-idcheck">
              <InfoIcon />
              아이디를 입력해주세요
            </div>
            <Username>
              <PersonOutlineIcon />
              <input type="username" placeholder="아이디" />
            </Username>
            <div className="signup-emailcheck">
              <InfoIcon />
              이메일을 입력해주세요
            </div>
            <Email>
              <MailOutlineIcon />
              <input type="email" placeholder="이메일" />
            </Email>
            <div className="signup-pwcheck">
              <InfoIcon />
              비밀번호는 8~20자, 숫자, 특수문자가 포함 되어야합니다
            </div>
            <Password>
              <LockOutlinedIcon />
              <input type="password" placeholder="비밀번호" />
            </Password>
            <div className="signup-pwrecheck">
              <InfoIcon />
              비밀번호를 다시 입력 해주세요
            </div>
            <Password>
              <LockOutlinedIcon />
              <input type="password" placeholder="비밀번호 확인" />
            </Password>
            <SexAge>
              <div className="signup-sex">
                <label htmlFor="sex">성별</label>
                <select name="sex">
                  <option value="0">남</option>
                  <option value="1">여</option>
                </select>
              </div>
              <div className="signup-age">
                <label htmlFor="age">나이</label>
                <select name="age">
                  <option value="10대">10대</option>
                  <option value="20대">20대</option>
                  <option value="30대">30대</option>
                  <option value="40+">40+</option>
                </select>
              </div>
            </SexAge>
          </Fields>
          <SignupButton>
            <button>회원가입</button>
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
      color: gray;
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
      color: gray;
      padding-left: 16px;
      padding-bottom: 4px;
      padding-top: 4px;

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

const Fields = styled.div`
  width: 300px;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
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
