import React, { useEffect, useRef } from 'react';
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
  // eslint-disable-next-line
  const input = useRef<any>('');

  useEffect(() => {
    console.log(songs);
    console.log(results);
    console.log(currNum);
  }, [currNum]);

  // eslint-disable-next-line
  const handleNextButton = (e: any) => {
    e.preventDefault();
    const currSong = songs?.testData[currNum];
    // eslint-disable-next-line
    const title: any = currSong?.title;
    const ox: boolean = isCorrect(title, input.current.value);
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
            userAnswer: input.current.value,
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
            userAnswer: input.current.value,
            right_or_wrong: ox,
          },
        ]),
      );
    }
    if (ox) {
      dispatch(openCorrect());
      input.current.value = '';
    } else if (!ox) {
      dispatch(openWrong());
      input.current.value = '';
    }
    if (currNum === 14) {
      dispatch(testEndTrue());
    } else {
      dispatch(increaseCurrNum());
    }
  };

  // const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAnswer(e.currentTarget.value);
  // };
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currSong = songs?.testData[currNum];
    // eslint-disable-next-line
    const title: any = currSong?.title;
    const ox: boolean = isCorrect(title, input.current.value);
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
            userAnswer: input.current.value,
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
            userAnswer: input.current.value,
            right_or_wrong: ox,
          },
        ]),
      );
    }
    if (ox) {
      dispatch(openCorrect());
      input.current.value = '';
      dispatch(increaseCurrNum());
    } else if (!ox) {
      dispatch(openWrong());
      input.current.value = '';
    }
    if (currNum === 14) {
      dispatch(testEndTrue());
    }
  };
  // eslint-disable-next-line
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
  align-items: center;
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
`;

const InputAnswer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > input {
    width: 60%;
    height: 24px;
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
  @media (max-width: 900px) {
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 100px;
    > input {
      width: 80%;
      height: 24px;
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
  @media (max-width: 900px) {
    justify-content: center;
    > span {
      font-size: 16px;
    }
    .MuiSvgIcon-root {
      width: 40px;
      height: 40px;
    }
  }
`;
