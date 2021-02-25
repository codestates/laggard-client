import React from 'react';
import './Banner.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Banner: React.FC = () => {
  const classes = useStyles();
  return (
    <section className="banner">
      <div className="banner_container">
        <div className="banner_title">
          <h2>
            노래 가사만 듣고
            <br /> 노래 제목을 맞춰보세요
          </h2>
        </div>
        <div className="banner_buttons">
          <Button className={classes.test} variant="contained" color="primary">
            나의 유형 테스트 시작하기
          </Button>
          <Button className={classes.quiz} variant="contained" color="primary">
            퀴즈로 점수 획득하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;

const useStyles = makeStyles(() =>
  createStyles({
    test: {
      border: '2px solid #0f0',
      color: 'white',
      padding: '10px 20px',
      fontWeight: 600,
      fontSize: '1.3rem',
      letterSpacing: '2px',
      transition: '0.5s',
      background: 'black',
      borderRadius: '5px',
      margin: '1rem',
      opacity: 0.9,
      '&:hover': {
        background: '#0f0',
        color: 'black',
      },
    },
    quiz: {
      border: '3px solid #00a1ff',
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      fontWeight: 600,
      fontSize: '1.3rem',
      letterSpacing: '2px',
      transition: '0.5s',
      background: 'black',
      borderRadius: '5px',
      margin: '1rem',
      opacity: 0.9,
      '&:hover': {
        background: '#00a1ff',
        color: 'black',
      },
    },
  }),
);
