import React from 'react';
import './Banner.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

const Banner: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const moveToTest = () => {
    history.push('/test');
  };
  const moveToGame = () => {
    history.push('/quiz');
  };
  return (
    <section className="banner">
      <div className="banner_container">
        <div className="banner_title">
          <h2 className="title_top">노래 가사만 듣고</h2>
          <h2 className="title_bottom">노래 제목을 맞춰보세요</h2>
        </div>
        <div className="banner_buttons">
          <ScrollAnimation
            offset={100}
            animateIn="animate__slideInDown"
            duration={0.8}
          >
            <Button
              onClick={moveToTest}
              className={classes.test}
              variant="contained"
              color="primary"
            >
              나의 음악 타입은?
            </Button>
          </ScrollAnimation>
          <ScrollAnimation
            offset={100}
            animateIn="animate__slideInUp"
            duration={0.8}
          >
            <Button
              onClick={moveToGame}
              className={classes.quiz}
              variant="contained"
              color="primary"
            >
              가사 낭독 퀴즈
            </Button>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Banner;

const useStyles = makeStyles(() =>
  createStyles({
    test: {
      width: `90%`,
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
      width: '90%',
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
