import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { useDispatch, useSelector } from 'react-redux';
import { testEndTrue } from '../../features/modalSlice';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import Audio from '../../util/audio';
import {
  increaseCurrNum,
  postResult,
  selectCurrNum,
  selectSong,
  selectTestResult,
} from '../../features/testInfoSlice';
import { openCorrect, openWrong } from '../../features/messageSlice';

const TestEvaluate: React.FC = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectTestResult);
  const songs = useSelector(selectSong);
  const currNum = useSelector(selectCurrNum);
  const [answer, setAnswer] = useState<string>('');
  const input = useRef<any>();

  useEffect(() => {
    console.log(songs);
    console.log(results);
    console.log(currNum);
  }, [currNum]);

  const handleNextButton = (e: any) => {
    e.preventDefault();
    const currSong = songs?.testData[currNum];
    const title: any = currSong?.title;
    const ox: boolean = isCorrect(title, answer);
    if (currNum === 14) {
      dispatch(testEndTrue());
    } else {
      dispatch(increaseCurrNum());
      if (ox) {
        dispatch(openCorrect());
        setTimeout(() => {
          setAnswer('');
          input.current.value = '';
        }, 1000);
      } else if (!ox) {
        dispatch(openWrong());
        setTimeout(() => {
          setAnswer('');
          input.current.value = '';
        }, 1000);
      }
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(increaseCurrNum());
    const currSong = songs?.testData[currNum];
    const title: any = currSong?.title;
    const ox: boolean = isCorrect(title, answer);
    if (results) {
      dispatch(
        postResult([
          ...results,
          {
            tests_id: songs?.id,
            id: currSong?.id,
            title: title,
            year: currSong?.year,
            genre: currSong?.genre,
            userAnswer: answer,
            right_or_wrong: ox,
          },
        ]),
      );
    } else {
      dispatch(
        postResult([
          {
            tests_id: songs?.id,
            id: currSong?.id,
            title: title,
            year: currSong?.year,
            genre: currSong?.genre,
            userAnswer: answer,
            right_or_wrong: ox,
          },
        ]),
      );
    }
    if (ox) {
      dispatch(openCorrect());
      setTimeout(() => {
        setAnswer('');
        input.current.value = '';
      }, 1000);
    } else if (!ox) {
      dispatch(openWrong());
      setTimeout(() => {
        setAnswer('');
        input.current.value = '';
      }, 1000);
    }
  };

  const isCorrect = (originalTitle: any, userTitle: any) => {
    while (/\(/g.test(originalTitle)) {
      originalTitle = originalTitle.match(/.+(?=\()/g)[0];
    }
    originalTitle = originalTitle.replace(/\s/gi, '');
    const re = new RegExp(originalTitle, 'i');
    userTitle = userTitle.replace(/\s/gi, '');
    const isCorrect: boolean = re.test(userTitle);
    return isCorrect;
  };

  return (
    <EvaluateContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>
            노래 <span>{`${currNum + 1} / 15`}</span>
          </h2>
        </ScrollAnimation>
      </Title>
      <div>
        <ControlButtons>
          <Audio />
        </ControlButtons>
      </div>
      <InputAnswer>
        <input
          ref={input}
          onChange={handleAnswerChange}
          type="text"
          placeholder="노래 제목을 입력하세요"
          autoComplete="off"
        />
        <button onClick={handleSubmit}>정답 등록하기</button>
      </InputAnswer>
      <SkipButton>
        <span>다음 문제로 넘어가기</span>
        <IconButton onClick={handleNextButton} aria-label="next">
          <SkipNextIcon />
        </IconButton>
      </SkipButton>
    </EvaluateContainer>
  );
};

export default TestEvaluate;

const EvaluateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  color: whitesmoke;
  h2 {
    font-size: 30px;
  }
  span {
    font-size: 24px;
  }
`;
const ControlButtons = styled.div`
  display: flex;
  justify-content: center;
  .MuiSvgIcon-root {
    color: whitesmoke;
    width: 64px;
    height: 64px;
  }
`;
const Volume = styled.div`
  width: 200px;
  color: whitesmoke;
  .MuiSlider-root {
    color: #00adb5;
  }
`;
const InputAnswer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  > input {
    width: 60%;
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
  > button {
    width: 140px;
    height: 32px;
    background-color: #00adb5;
    border: none;
    border-radius: 10px;
    transition: 0.3s;
    font-weight: 500;
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

const SkipButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > span {
    color: whitesmoke;
    font-size: 20px;
  }
  .MuiSvgIcon-root {
    color: whitesmoke;
    width: 48px;
    height: 48px;
  }
`;
