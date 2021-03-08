import React, { useEffect, useState } from 'react';
import util from './util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrNum, selectSong } from '../features/testInfoSlice';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// let audioContext: any;
// let audioBuffer: any;
// let audioFile: any;

const Audio: React.FC = () => {
  const songsData = useSelector(selectSong);
  const currNum = useSelector(selectCurrNum);
  const lyrics = songsData?.testData[currNum].lyrics;
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [audioContext, setAudioContext] = useState<AudioContext>();
  // const [audioFile, setAudioFile] = useState<any>(null);

  const [gainNode, setGainNode] = useState('' as any); //음량조절하는 노드

  const handleChange = (e: any) => {
    gainNode.gain.value = e.target.value;
  };

  console.log(audioContext);
  console.log(audioBuffer);
  const init = async () => {
    console.log('getAudio!!');
    const inputLyrics = lyrics?.slice(0, 10);
    const arrBuffer = await axios.post(
      'http://localhost:5000/tests/audio',
      {
        inputLyrics,
      },
      { responseType: 'arraybuffer' },
    );
    const audioContext = util.getAudioContext();
    const gainNode = util.makeGainNode(audioContext);
    console.log('audioContext : ', audioContext);
    console.log('arrBuffer : ', arrBuffer?.data);
    const audioBuffer = await util.makeAudioBuffer(
      audioContext,
      arrBuffer?.data,
    );
    setAudioContext(audioContext);
    setGainNode(gainNode);
    setAudioBuffer(audioBuffer);
    // // let inputLyrics = lyrics.slice(0, 100);
    // // console.log(`100자 가사: ${inputLyrics}`);
    // const url = 'http://localhost:5000/tests/audio';
    // const inputLyrics = lyrics?.slice(0, 10);
    // // let inputLyrics = '써놓은 건 되는데'
    // const arrBuffer = await axios.post(
    //   url,
    //   { inputLyrics },
    //   { responseType: 'arraybuffer' },
    // );

    // // let arrBuffer = await util.axiosGetArrayBufferRequest(url, inputLyrics);
    // // console.log(arrBuffer);

    // // audioContext = util.getAudioContext(); //audioContext
    // // console.log(audioContext);
    // const ac = util.getAudioContext(); //AudioContext

    // setAudioContext(ac);

    // // gainNode = util.makeGainNode(audioContext); // 음량조절node
    // if (arrBuffer) {
    //   audioBuffer = await util.makeAudioBuffer(audioContext, arrBuffer.data);
    // } //! 주석처리

    // // if (arrBuffer) {
    // //   let ab = await util.makeAudioBuffer(audioContext, arrBuffer.data);
    // //   setAudioBuffer(audioBuffer);
    // // }

    // // audioFile = await util.makeAudio(audioContext, audioBuffer);

    // // let file = await util.makeAudio(audioContext, audioBuffer);
    // // console.log(file);
    // // setAudioFile(file);
    // // console.log(audioFile);
    // console.log('audio');
    // console.log(audioBuffer);
    // console.log(audioFile);
  };

  const makeTrack = async () => {
    console.log('makeTrack');
    const audioFile = await util.makeAudio(audioContext, audioBuffer, gainNode);
    return audioFile;
  };

  const playTrack = async () => {
    // if(trackStatus){
    //     makeTrack().start();
    // }else{
    //     makeTrack();

    // }
    const track = await makeTrack(); //! 잠시 주석처리
    track.start();
    // removeBufferData();
  };

  // const removeBufferData = () => {
  //   setAudioBuffer();
  // };

  // const handleVolume = (e: React.MouseEvent<HTMLInputElement>) => {
  //   gainNode.gain.value = e.currentTarget.value;
  //   // setVolume(e.target.volume);
  // };

  // useEffect(() => {
  //   console.log("useEffect in Audio.tsx");
  //   if (!audioBuffer || !audioContext) {
  //     init();
  //   }
  // }, []);

  useEffect(() => {
    console.log('==============================');
    init();
  }, [lyrics]);

  return (
    <div className="play">
      <IconButton onClick={playTrack} aria-label="play/pause">
        <PlayArrowIcon />
      </IconButton>
      <input
        type="range"
        min="0"
        max="2"
        onChange={handleChange}
        step="0.01"
        defaultValue="1"
      ></input>
    </div>
  );
};

export default Audio;
