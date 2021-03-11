import React, { useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeMyinfo, selectMyinfo } from '../features/modalSlice';
import { login, selectUser } from '../features/userSlice';
import Popover from '@material-ui/core/Popover';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  openInvalidUser,
  openNicknameFailure,
  openNicknameSuccess,
  openPasswordFailure,
  openPasswordSuccess,
  openServerError,
  selectChangeNicknameFailure,
  selectChangeNicknameSuccess,
} from '../features/messageSlice';

const Userinfo: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myinfoModal = useSelector(selectMyinfo);
  const user = useSelector(selectUser);
  const changeNickname = useRef<HTMLInputElement>(null);
  const changePassword = useRef<HTMLInputElement>(null);
  const changePasswordCheck = useRef<HTMLInputElement>(null);
  const nicknameSuccess = useSelector(selectChangeNicknameSuccess);
  const nicknameFailure = useSelector(selectChangeNicknameFailure);
  const pwRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/);

  const [
    anchorNickname,
    setAnchorNickname,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenNickname = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNickname(event.currentTarget);
  };

  const handleCloseNickname = () => {
    setAnchorNickname(null);
  };

  const openNickname = Boolean(anchorNickname);
  const idNickname = openNickname ? 'simple-popover' : undefined;

  const [
    anchorPassword,
    setAnchorPassword,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPassword(event.currentTarget);
  };

  const handleClosePassword = () => {
    setAnchorPassword(null);
  };

  const openPassword = Boolean(anchorPassword);
  const idPassword = openPassword ? 'simple-popover' : undefined;

  const handleChangeNickname = async () => {
    const token = localStorage.getItem('accessToken');
    let nicknameValue = changeNickname.current?.value;
    await axios
      .put(
        'http://localhost:5000/users/userinfo',
        {
          nickname: changeNickname.current?.value,
        },
        { headers: { Authorization: `bearer ${token}` } },
      )
      .then(() => {
        if (nicknameValue && user) {
          dispatch(
            login({
              nickname: nicknameValue,
              email: user?.email,
              sex: user?.sex,
              birth_year: user?.birth_year,
            }),
          );
        }
      })
      .then(() => {
        handleCloseNickname();
        nicknameValue = '';
        dispatch(openNicknameSuccess());
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 403') {
          dispatch(openInvalidUser());
        } else {
          dispatch(openNicknameFailure());
        }
      });
  };

  const handleChangePassword = async () => {
    const token = localStorage.getItem('accessToken');
    let pwChange = changePassword.current?.value;
    let pwChangeCheck = changePasswordCheck.current?.value;
    if (pwChange) {
      if (pwRegex.test(pwChange) && pwChange === pwChangeCheck) {
        await axios
          .put(
            'http://localhost:5000/users/userinfo',
            {
              password: changeNickname.current?.value,
            },
            { headers: { Authorization: `bearer ${token}` } },
          )
          .then(() => {
            pwChange = '';
            pwChangeCheck = '';
            handleClosePassword();
            dispatch(openPasswordSuccess());
          })
          .catch((err) => {
            if (err.message === 'Request failed with status code 403') {
              dispatch(openInvalidUser());
            } else {
              dispatch(openServerError());
            }
          });
      } else {
        pwChange = '';
        pwChangeCheck = '';
        dispatch(openPasswordFailure());
      }
    }
  };

  const body = (
    <MyinfoContent>
      <h2>내 정보</h2>
      <div className="myinfo_box">
        <div className="myinfo_info">
          <div className="info_content">
            <h5>닉네임</h5>
            <h4>{user?.nickname}</h4>
          </div>
          <button onClick={handleOpenNickname} className="modifybtn">
            변경하기
          </button>
        </div>
        <div className="myinfo_info">
          <div className="info_content">
            <h5>비밀번호</h5>
            <h4>********</h4>
          </div>
          <button onClick={handleOpenPassword} className="modifybtn">
            변경하기
          </button>
        </div>
        <div className="myinfo_info">
          <div className="info_content">
            <h5>이메일</h5>
            <h4>{user?.email}</h4>
          </div>
        </div>
      </div>
      <button>회원탈퇴</button>
    </MyinfoContent>
  );

  const changeNicknameBody = (
    <NicknameChangeContainer>
      <input
        ref={changeNickname}
        type="text"
        placeholder="닉네임 변경"
        autoComplete="off"
      />
      {nicknameSuccess ? (
        <CheckBoxIcon fontSize="small" htmlColor="green" />
      ) : undefined}
      {nicknameFailure ? <CancelIcon htmlColor="red" /> : undefined}
      <button onClick={handleChangeNickname}>확인</button>
    </NicknameChangeContainer>
  );

  const changePasswordBody = (
    <PasswordChangeContainer>
      <input
        ref={changePassword}
        type="password"
        placeholder="비밀번호 변경"
        autoComplete="off"
      />
      <input
        ref={changePasswordCheck}
        type="password"
        placeholder="비밀번호 재입력"
        autoComplete="off"
      />
      <button onClick={handleChangePassword}>확인</button>
    </PasswordChangeContainer>
  );

  return ReactDOM.createPortal(
    [
      <MyinfoContainer key="info">
        <Modal
          className={classes.modal}
          open={myinfoModal}
          onClose={() => dispatch(closeMyinfo())}
        >
          {body}
        </Modal>
      </MyinfoContainer>,
      <Popover
        key="nickname"
        id={idNickname}
        open={openNickname}
        anchorEl={anchorNickname}
        onClose={handleCloseNickname}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {changeNicknameBody}
      </Popover>,
      <Popover
        key="password"
        id={idPassword}
        open={openPassword}
        anchorEl={anchorPassword}
        onClose={handleClosePassword}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {changePasswordBody}
      </Popover>,
    ],
    document.body,
  );
};

export default Userinfo;

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const MyinfoContainer = styled.div``;

const MyinfoContent = styled.div`
  background-color: #dddddd;
  width: 400px;
  height: 300px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  &:focus {
    outline: none;
  }
  > h2 {
    margin-bottom: 12px;
  }
  > button {
    cursor: pointer;
    color: whitesmoke;
    background-color: black;
    border: none;
    border-radius: 5px;
    transition: 0.4s;
    width: 100px;
    height: 24px;
    margin-top: 16px;
    &:hover {
      background-color: #313030;
      transform: scale(1.03);
    }
    &:focus {
      outline: none;
    }
  }
  .myinfo_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 8px 24px 8px 24px;
    width: 100%;
    border-radius: 8px;
    border: 0.1px solid black;
  }
  .myinfo_info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    margin-bottom: 4px;
  }
  .info_content {
    flex: 0.4;
    display: flex;
    flex-direction: column;
    > h5 {
      color: gray;
    }
  }
  .modifybtn {
    flex: 0.2;
    cursor: pointer;
    color: whitesmoke;
    background-color: black;
    border: none;
    border-radius: 5px;
    transition: 0.4s;
    width: 80%;
    height: 80%;
    &:hover {
      background-color: #313030;
      transform: scale(1.03);
    }
    &:focus {
      outline: none;
    }
  }
`;

const NicknameChangeContainer = styled.div`
  width: 280px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  > input {
    border: none;
    background-color: lightgray;
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    :focus {
      outline: none;
    }
  }
  > button {
    background-color: #24cfaa;
    border: none;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    :hover {
      background-color: #2fdbb6;
    }
    :active {
      background-color: #1da88a;
    }
    :focus {
      outline: none;
    }
  }
`;
const PasswordChangeContainer = styled.div`
  width: 220px;
  height: 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: black;

  > input {
    border: none;
    background-color: lightgray;
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    :focus {
      outline: none;
    }
  }
  > button {
    background-color: #24cfaa;
    border: none;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    :hover {
      background-color: #2fdbb6;
    }
    :active {
      background-color: #1da88a;
    }
    :focus {
      outline: none;
    }
  }
`;
