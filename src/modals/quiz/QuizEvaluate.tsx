import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDispatch } from 'react-redux';
import { quizEndTrue } from '../../features/modalSlice';
import ReactDOM from 'react-dom';
import Popover from '@material-ui/core/Popover';

const QuizEvaluate: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<number>(30);

  const handleNextButton = (e: any) => {
    e.preventDefault();
    dispatch(quizEndTrue());
  };

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const [anchorHint, setAnchorHint] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpenHint = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorHint(event.currentTarget);
  };

  const handleCloseHint = () => {
    setAnchorHint(null);
  };

  const openHint = Boolean(anchorHint);
  const idHint = openHint ? 'simple-popover' : undefined;
  const body = <HintBody>가수: 가수</HintBody>;

  return (
    <EvaluateContainer>
      <Title>
        <h2>2000년대 노래</h2>
      </Title>
      <Points>
        <div className="left">
          <p>
            Total score: <span>0</span>
          </p>
          <p>
            남은 기회: <span>0</span>
          </p>
        </div>
        <div className="center">
          <p>
            점수 : <span>10</span>
          </p>
        </div>
        <div className="right">
          <button onClick={handleOpenHint}>힌트 (-5점)</button>
        </div>
      </Points>
      <div>
        <ControlButtons>
          <div className="play">
            <IconButton aria-label="play/pause">
              <PlayArrowIcon />
            </IconButton>
          </div>
        </ControlButtons>
        <Volume>
          <div>
            <Typography id="continuous-slider" gutterBottom>
              볼륨
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  value={value}
                  onChange={handleChange}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </div>
        </Volume>
      </div>
      <InputAnswer>
        <input type="text" placeholder="노래 제목을 입력하세요" />
        <button>정답 등록하기</button>
      </InputAnswer>
      <SkipButton>
        <div className="left">
          <button>점수 제출하고 그만하기</button>
        </div>
        <div className="right">
          <span>다음 문제로 넘어가기</span>
          <IconButton onClick={handleNextButton} aria-label="next">
            <SkipNextIcon />
          </IconButton>
        </div>
      </SkipButton>
      {ReactDOM.createPortal(
        <Popover
          key="nickname"
          id={idHint}
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
          {body}
        </Popover>,
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
  > h2 {
    font-size: 30px;
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
    justify-content: center;
    color: whitesmoke;
    font-weight: 600;
  }
  .right button {
    color: whitesmoke;
    font-weight: 600;
    background: black;
    border: none;
    width: 88px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    :hover {
      background: #181818;
      transform: scale(1.01);
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
`;

const SkipButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: whitesmoke;
    font-size: 20px;
  }
  .MuiSvgIcon-root {
    color: whitesmoke;
    width: 48px;
    height: 48px;
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
  width: 160px;
  background: whitesmoke;
  font-size: 14px;
  font-weight: 600;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
