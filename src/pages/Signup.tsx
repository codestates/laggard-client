import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import NaverSignup from '../components/NaverSignup';
import img from '../assets/img/darkconcert3.jpg';

const nicknameRegex = RegExp(/[{}[\]/?.,;:|)*~`!^\-+<>@#$%&\\=('"]/gi);
const pwRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/);
const emailRegex = RegExp(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
);
const yearRegex = RegExp(/^(19[0-9][0-9]|20[01][0-9]|2020)$/);
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup: React.FC = () => {
  const initialInfo = {
    nickname: '',
    email: '',
    password: '',
    sex: true,
    birth_year: 2021,
    errors: {
      nickname: '',
      email: '',
      password: '',
      confirmPw: '',
    },
  };
  const history = useHistory();
  const [info, setInfo] = useState(initialInfo);
  // eslint-disable-next-line
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const errors = info.errors;
    switch (name) {
      case 'nickname':
        errors.nickname =
          nicknameRegex.test(value) || info.nickname.length > 8
            ? '최대 8자 그리고 특수문자 없이 입력해주세요'
            : '';
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
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    const { nickname, email, password, sex, birth_year } = info;
    e.preventDefault();
    let validity = true;
    Object.values(info.errors).forEach(
      (val) => val.length > 0 && (validity = false),
    );
    if (
      validity === true &&
      nickname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      yearRegex.test(birth_year.toString())
    ) {
      axios
        .post('http://localhost:5000/users/signup/basic', {
          nickname,
          email,
          password,
          sex,
          birth_year,
        })
        .then(moveToHome)
        .then(handleOpenSignupSuccess);
    } else {
      handleOpenSignupFailure();
    }
  };
  // eslint-disable-next-line
  const handleEmailCheck = (e: any) => {
    e.preventDefault();
    const { email } = info;
    axios
      .post('http://localhost:5000/users/signup/emailCheck', { email })
      .then(handleOpenEmailCheckSuccess)
      .catch(handleOpenEmailCheckFailure);
  };
  const { errors } = info;

  const moveToHome = () => {
    setTimeout(() => history.push('/'), 3000);
  };
  {
    /* Snackbars */
  }

  const [openSignupSuccess, setOpenSignupSuccess] = React.useState(false);
  const [openSignupFailure, setOpenSignupFailure] = React.useState(false);
  const [openEmailCheckSuccess, setOpenEmailCheckSuccess] = React.useState(
    false,
  );
  const [openEmailCheckFailure, setOpenEmailCheckFailure] = React.useState(
    false,
  );

  const handleOpenSignupSuccess = () => {
    setOpenSignupSuccess(true);
  };

  const handleCloseSignupSuccess = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSignupSuccess(false);
  };

  const handleOpenSignupFailure = () => {
    setOpenSignupFailure(true);
  };

  const handleCloseSignupFailure = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSignupFailure(false);
  };

  const handleOpenEmailCheckSuccess = () => {
    setOpenEmailCheckSuccess(true);
  };

  const handleCloseEmailCheckSuccess = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEmailCheckSuccess(false);
  };

  const handleOpenEmailCheckFailure = () => {
    setOpenEmailCheckFailure(true);
  };

  const handleCloseEmailCheckFailure = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEmailCheckFailure(false);
  };

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
                autoComplete="off"
              />
              <button onClick={handleEmailCheck} className="valcheck">
                중복확인
              </button>
            </Email>
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
                autoComplete="off"
              />
            </Username>
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
                autoComplete="off"
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
                autoComplete="off"
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
                <label htmlFor="birth_year">출생연도</label>
                <input
                  name="birth_year"
                  onChange={handleChange}
                  id="age"
                  placeholder="예: 1990"
                  autoComplete="off"
                />
              </div>
            </SexAge>
          </Fields>
          <SignupButton>
            <NaverSignup />
            <button onClick={handleSubmit}>회원가입</button>
          </SignupButton>
        </div>
        <Snackbar
          open={openSignupSuccess}
          autoHideDuration={2000}
          onClose={handleCloseSignupSuccess}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseSignupSuccess} severity="success">
            회원가입에 성공하셨습니다! 홈으로 이동합니다.
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSignupFailure}
          autoHideDuration={5000}
          onClose={handleCloseSignupFailure}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseSignupFailure} severity="error">
            입력한 정보를 다시 확인해주세요!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openEmailCheckSuccess}
          autoHideDuration={4000}
          onClose={handleCloseEmailCheckSuccess}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseEmailCheckSuccess} severity="success">
            사용가능한 이메일입니다
          </Alert>
        </Snackbar>
        <Snackbar
          open={openEmailCheckFailure}
          autoHideDuration={5000}
          onClose={handleCloseEmailCheckFailure}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseEmailCheckFailure} severity="error">
            이미 등록된 이메일입니다
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default withRouter(Signup);

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: black;
  background-image: url(${img});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  .signup-box {
    width: 430px;
    height: 700px;
    border-radius: 40px;
    background: #ecf0f3;
    /* box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px white; */
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
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
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
  margin-top: 6px;
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
    font-size: 16px;
    color: #555;
    padding: 20px 10px 20px;
    :focus::placeholder {
      color: transparent;
    }
  }
`;
const Password = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-top: 6px;
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
    font-size: 16px;
    color: #555;
    padding: 20px 10px 20px 5px;
    :focus::placeholder {
      color: transparent;
    }
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
    font-size: 16px;
    color: #555;
    padding: 20px 10px 20px 5px;
    :focus::placeholder {
      color: transparent;
    }
  }
  > button {
    background: #24cfaa;
    box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px white;
    width: 72px;
    height: 24px;
    border-radius: 8px;
    font-weight: 550;
    margin-right: 12px;
    outline: none;
    border: none;
    cursor: pointer;
    color: whitesmoke;
    font-size: 12px;
  }
  & > button:hover {
    background: #2fdbb6;
  }
  & > button:active {
    background: #1da88a;
  }
`;

const SexAge = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  > .signup-age {
    display: flex;
    flex: 0.7;
    justify-content: space-around;
    align-items: center;
  }
  > .signup-sex label {
    font-size: 1.2rem;
    letter-spacing: 3px;
    color: gray;
    font-weight: 600;
  }

  > .signup-age label {
    font-size: 1rem;
    letter-spacing: 1px;
    color: gray;
    font-weight: 600;
  }
  > .signup-sex select {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
  }
  > .signup-sex option {
    font-weight: 600;
    font-size: 1rem;
    color: gray;
  }
  > .signup-age input {
    outline: none;
    border: none;
    background: none;
    box-shadow: inset 2px 2px 2px #cbced1, inset -2px -2px 2px white;
    border-radius: 40px;
    font-size: 16px;
    width: 60%;
    padding-top: 2px;
    padding-bottom: 2px;
    text-align: center;
    :focus::placeholder {
      color: transparent;
    }
  }
  > .signup-age input::placeholder {
    color: gray;
    font-size: 14px;
    font-style: italic;
  }
`;

const SignupButton = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
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
