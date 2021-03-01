import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';

const QuizLogin: React.FC = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.container}>
      <h2 className={classes.title}>LAGGARD</h2>
      <input className={classes.input} placeholder="아이디" />
      <input className={classes.input} placeholder="비밀번호" />
      <button className={classes.button}>로그인</button>
      <p className={classes.text}>
        회원이 아니세요? <span className={classes.register}>회원가입 하기</span>
      </p>
    </div>
  );

  return (
    <div className="gameLogin">
      <LoginContainer>
        <LoginContent>
          <h3>회원이신가요?</h3>
          <button type="button" onClick={handleOpen}>
            로그인하기
          </button>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            {body}
          </Modal>
        </LoginContent>
      </LoginContainer>
    </div>
  );
};

export default QuizLogin;

const LoginContainer = styled.div``;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3 {
    color: white;
    margin-bottom: 4px;
  }

  > button {
    font-size: 1rem;
    font-weight: 600;
    padding: 8px 24px;
    background-color: rgba(191, 191, 191, 0.9);
    border: 3px solid black;
    border-radius: 6px;
    transition: 0.5s;
  }
  > button:hover {
    border: 3px solid #00adb5;
    transform: scale(1.05);
    cursor: pointer;
  }
  > button:focus {
    outline: none;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'grid',
      placeItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: '6px',
      backgroundColor: 'rgba(191, 191, 191, 0.9)',
      padding: theme.spacing(2, 4, 2),
      width: '300px',
      height: '200px',
      '&:focus': {
        outline: 'none',
      },
    },
    title: {
      margin: '5px',
      fontWeight: 700,
      letterSpacing: '1px',
      fontSize: '30px',
    },
    input: {
      margin: '2px',
      padding: '2px',
      '&:focus': {
        outline: 'none',
      },
    },
    button: {
      width: '50%',
      margin: '5px',
      fontSize: '1rem',
      fontWeight: 500,
    },
    register: {
      color: 'blue',
      cursor: 'pointer',
    },
    text: {
      fontSize: '0.9rem',
    },
  }),
);
