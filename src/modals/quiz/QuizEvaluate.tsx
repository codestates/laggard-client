import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useDispatch, useSelector } from 'react-redux';
import { quizEndTrue } from '../../features/modalSlice';
import ReactDOM from 'react-dom';
import Popover from '@material-ui/core/Popover';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import {
  addTotalScore,
  getQuizSong,
  selectQuizSong,
  selectQuizTime,
  selectTotalScore,
} from '../../features/quizInfoSlice';
import axios from 'axios';
import { selectGuestToken } from '../../features/userSlice';
import util from '../../util/quizAudio';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  openCorrect,
  openDecreaseChance,
  openInvalidUser,
  openServerError,
  openWrong,
} from '../../features/messageSlice';

const QuizEvaluate: React.FC = () => {
  const dispatch = useDispatch();
  const quizAge = useSelector(selectQuizTime);
  const song = useSelector(selectQuizSong);
  const guestToken = useSelector(selectGuestToken);
  const totalScore = useSelector(selectTotalScore);
  const [currCount, setCurrCount] = useState(1);
  const [score, setScore] = useState(10);
  const [life, setLife] = useState(5);
  const [userAnswer, setUserAnswer] = useState('');
  const [singerHintOpened, setSingerHintOpened] = useState(false);
  const [rankHintOpened, setRankHintOpened] = useState(false);

  useEffect(() => {
    if (life === 0) {
      dispatch(quizEndTrue());
    }
    axios
      .get(`https://laggard-server.ga/quiz/songInfo?quizAge=${quizAge}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getQuizSong(res.data));
        getAudio(res.data.lyrics);
        // console.log(res.data);
      })
      .catch(() => {
        dispatch(openServerError());
      });
    setScore(10);
    setUserAnswer('');
    setSingerHintOpened(false);
    setRankHintOpened(false);
  }, [currCount]);

  {
    /* UI and button handlers*/
  }
  // eslint-disable-next-line
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  // eslint-disable-next-line
  const handleNextButton = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken') || guestToken;
    axios
      .get(
        `https://laggard-server.ga/quiz/recordResult?songs_id=${song?.songId}&correct=false`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      )
      .then(() => {
        setLife(life - 1);
        setCurrCount(currCount + 1);
        dispatch(openDecreaseChance());
        audioContext?.suspend();
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 409') {
          dispatch(openInvalidUser());
        } else {
          dispatch(openServerError());
        }
      });
  };
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let answer = song?.title
      .substring(0, song.title.indexOf('('))
      .toUpperCase()
      .trim();
    let writtenAnswer: string;

    song?.title.includes('(')
      ? (answer = song?.title
          .substring(0, song?.title.indexOf('('))
          .toUpperCase()
          .trim()
          .replace(/ /g, ''))
      : (answer = song?.title.toUpperCase().trim().replace(/ /g, ''));
    userAnswer?.includes('(')
      ? (writtenAnswer = userAnswer
          .substring(0, userAnswer?.indexOf('('))
          .toUpperCase()
          .trim()
          .replace(/ /g, ''))
      : (writtenAnswer = userAnswer?.toUpperCase().trim().replace(/ /g, ''));

    if (answer === writtenAnswer) {
      const token = localStorage.getItem('accessToken') || guestToken;
      axios
        .get(
          `https://laggard-server.ga/quiz/recordResult?songs_id=${song?.songId}&correct=true`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        )
        .catch((err) => {
          if (err.message === 'Request failed with status code 409') {
            dispatch(openInvalidUser());
          } else {
            dispatch(openServerError());
          }
        });
      dispatch(addTotalScore(totalScore + score));
      setCurrCount(currCount + 1);
      dispatch(openCorrect());
      audioContext?.suspend();
    } else {
      dispatch(openWrong());
      setUserAnswer('');
    }
  };

  const handleUserAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleStop = () => {
    dispatch(quizEndTrue());
  };

  {
    /* Audio related handlers*/
  }

  const [audioBuffer, setAudioBuffer] = useState('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  // eslint-disable-next-line
  const [gainNode, setGainNode] = useState<any>(null);

  const getAudio = async (lyrics: string) => {
    const arrBuffer = await util.axiosPostArrayBufferRequest(
      'https://laggard-server.ga/quiz/audioFile',
      lyrics,
    );
    const audioContext = util.getAudioContext();
    const gainNode = util.makeGainNode(audioContext);

    const audioBuffer = await util.makeAudioBuffer(
      audioContext,
      arrBuffer?.data,
    );

    setAudioContext(audioContext);
    setGainNode(gainNode);
    setAudioBuffer(audioBuffer);
  };

  const makeTrack = async () => {
    const audioFile = await util.makeAudio(audioContext, audioBuffer, gainNode);
    return audioFile;
  };

  const playTrack = async () => {
    const track = await makeTrack();
    track.start();
  };
  // eslint-disable-next-line
  const handleVolume = (e: any) => {
    gainNode.gain.value = e.target.value;
  };

  {
    /* Hint related states/handlers/content */
  }

  const [anchorHint, setAnchorHint] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [
    anchorHint2,
    setAnchorHint2,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenHint = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorHint(event.currentTarget);
  };
  const handleOpenHint2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorHint2(event.currentTarget);
  };

  const handleCloseHint = () => {
    setAnchorHint(null);
  };
  const handleCloseHint2 = () => {
    setAnchorHint2(null);
  };
  const openHint = Boolean(anchorHint);
  const openHint2 = Boolean(anchorHint2);
  const singerHint = openHint ? 'simple-popover' : undefined;
  const rankHint = openHint2 ? 'simple-popover' : undefined;
  const singerHintBody = <HintBody>{`가수: ${song?.artist}`}</HintBody>;
  const rankHintBody = (
    <HintBody>{`순위: ${song?.year}년 TOP ${song?.rank}위`}</HintBody>
  );

  return (
    <EvaluateContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>
            {quizAge}~{quizAge ? Number(quizAge) + 4 : undefined}
            {'년'}
            <span>{`(#${currCount})`}</span>
          </h2>
        </ScrollAnimation>
      </Title>
      <Points>
        <div className="left">
          <p>
            총 점수: <span>{totalScore}</span>
          </p>
          <p>
            남은 기회: <span>{life}</span>
          </p>
        </div>
        <div className="center">
          <p>
            점수 : <span>{score}</span>
          </p>
        </div>
        <div className="right">
          <button
            onClick={(e) => {
              if (!singerHintOpened) {
                setSingerHintOpened(true);
                setScore(score - 5);
                handleOpenHint(e);
              } else if (singerHintOpened) {
                handleOpenHint(e);
              }
            }}
          >{`가수힌트(-5점)`}</button>
          <button
            onClick={(e) => {
              if (!rankHintOpened) {
                setRankHintOpened(true);
                setScore(score - 2);
                handleOpenHint2(e);
              } else if (rankHintOpened) {
                handleOpenHint2(e);
              }
            }}
          >{`순위힌트(-2점)`}</button>
        </div>
      </Points>
      <ControlButtons>
        {audioContext ? (
          [
            <div key="playbutton" className="play">
              <IconButton onClick={playTrack} aria-label="play/pause">
                <PlayArrowIcon />
              </IconButton>
            </div>,
            <Volume key="volumeui">
              <VolumeDownIcon fontSize="small" />
              <input
                type="range"
                min="0"
                max="2"
                onChange={handleVolume}
                step="0.01"
                defaultValue="1"
              ></input>
              <VolumeUpIcon fontSize="small" />
            </Volume>,
          ]
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </ControlButtons>
      <InputAnswer>
        <input
          type="text"
          placeholder="노래 제목을 입력하세요"
          autoComplete="off"
          value={userAnswer}
          onChange={handleUserAnswer}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
        />
        <button onClick={handleSubmit}>정답 등록하기</button>
      </InputAnswer>
      <SkipButton>
        <div className="left">
          <button onClick={handleStop}>점수 제출하고 그만하기</button>
        </div>
        <div className="right">
          <span>다음 문제로 넘어가기</span>
          <IconButton onClick={handleNextButton} aria-label="next">
            <SkipNextIcon />
          </IconButton>
        </div>
      </SkipButton>
      {ReactDOM.createPortal(
        [
          <Popover
            key="singerhint"
            id={singerHint}
            open={openHint}
            anchorEl={anchorHint}
            onClose={handleCloseHint}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            {singerHintBody}
          </Popover>,
          <Popover
            key="rankhint"
            id={rankHint}
            open={openHint2}
            anchorEl={anchorHint2}
            onClose={handleCloseHint2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            {rankHintBody}
          </Popover>,
        ],
        document.body,
      )}
    </EvaluateContainer>
  );
};

export default QuizEvaluate;

const EvaluateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  color: whitesmoke;
  width: 100%;
  h2 {
    font-size: 30px;
  }
  span {
    font-size: 24px;
  }
`;
const Points = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  .left,
  .center,
  .right {
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: whitesmoke;
    font-weight: 600;
    font-size: 20px;
  }
  .right button {
    color: whitesmoke;
    font-weight: 600;
    font-size: 12px;
    background: black;
    border: none;
    width: 88px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 2px;
    margin-bottom: 2px;
    :hover {
      background: #181818;
      transform: scale(1.03);
    }
    :active {
      background: #272727;
    }
    :focus {
      outline: none;
    }
  }
`;
const ControlButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .play {
    display: flex;
    justify-content: center;
    align-items: center;
    .MuiSvgIcon-root {
      width: 64px;
      height: 64px;
    }
  }
  .MuiSvgIcon-root {
    color: whitesmoke;
  }
`;
const Volume = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .MuiSvgIcon-root {
    width: 32px;
    height: 32px;
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
    border-radius: 8px;
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
    height: 28px;
    background-color: #00adb5;
    border: none;
    border-radius: 8px;
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
    width: 100%;
  }
`;

const SkipButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: whitesmoke;
    font-size: 20px;
    word-break: keep-all;
    text-align: center;
    @media (max-width: 900px) {
      font-size: 16px;
    }
  }
  .MuiSvgIcon-root {
    color: whitesmoke;
    width: 48px;
    height: 48px;
    @media (max-width: 900px) {
      width: 40px;
      height: 40px;
    }
  }
  .left,
  .right {
    flex: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left button {
    width: 184px;
    height: 32px;
    background-color: #00adb5;
    border: none;
    border-radius: 8px;
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

const HintBody = styled.div`
  width: 200px;
  background: whitesmoke;
  font-size: 14px;
  font-weight: 600;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
