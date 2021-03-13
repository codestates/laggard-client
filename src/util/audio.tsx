import React, { useEffect, useState } from 'react';
import util from './util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrNum, selectSong } from '../features/testInfoSlice';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import styled from 'styled-components';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CircularProgress from '@material-ui/core/CircularProgress';

const Audio: React.FC = () => {
  const songsData = useSelector(selectSong);
  const currNum = useSelector(selectCurrNum);
  const lyrics = songsData?.testData[currNum].lyrics;
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [audioContext, setAudioContext] = useState<AudioContext>();

  // eslint-disable-next-line
  const [gainNode, setGainNode] = useState('' as any); //음량조절하는 노드

  // eslint-disable-next-line
  const handleChange = (e: any) => {
    gainNode.gain.value = e.target.value;
  };

  const init = async () => {
    const inputLyrics = lyrics?.slice(0, 50);
    const arrBuffer = await axios.post(
      'http://localhost:5000/tests/audio',
      {
        inputLyrics,
      },
      { responseType: 'arraybuffer', withCredentials: true },
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
    const track = await makeTrack(); //! 잠시 주석처리
    track.start();
  };

  useEffect(() => {
    audioContext?.suspend();
    init();
  }, [lyrics]);

  return (
    <Container>
      <Button>
        {audioContext ? (
          <CircularProgress />
        ) : (
          <IconButton onClick={playTrack} aria-label="play/pause">
            <PlayArrowIcon />
          </IconButton>
        )}
      </Button>
      <Volume>
        <VolumeDownIcon fontSize="small" />
        <input
          type="range"
          min="0"
          max="2"
          onChange={handleChange}
          step="0.01"
          defaultValue="1"
        ></input>
        <VolumeUpIcon fontSize="small" />
      </Volume>
    </Container>
  );
};

export default Audio;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
`;
const Button = styled.div`
  .MuiSvgIcon-root {
    color: whitesmoke;
    width: 64px;
    height: 64px;
  }
`;
const Volume = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  color: whitesmoke;
  > .MuiSvgIcon-root {
    width: 32px;
    height: 32px;
  }
`;
