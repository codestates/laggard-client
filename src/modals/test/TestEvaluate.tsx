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
import { testEndTrue } from '../../features/modalSlice';

const TestEvaluate: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<number>(30);
  const handleNextButton = (e: any) => {
    e.preventDefault();
    dispatch(testEndTrue());
  };

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <EvaluateContainer>
      <Title>
        <h2>노래 #1/15</h2>
      </Title>
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
  > h2 {
    font-size: 30px;
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
    font-size: 20px;
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
