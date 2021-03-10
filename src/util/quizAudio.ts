import axios from 'axios';

const util = {
  // eslint-disable-next-line
  axiosGetArrayBufferRequest: async (url: string) => {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      return response;
    } catch (e) {
      console.log('request err : ', e);
    }
  },
  // eslint-disable-next-line
  axiosPostArrayBufferRequest: async (url: string, lyrics: string) => {
    try {
      const response = await axios.post(
        url,
        {
          lyrics,
        },
        {
          responseType: 'arraybuffer',
        },
      );
      return response;
    } catch (e) {
      console.log('request err : ', e);
    }
  },
  // eslint-disable-next-line
  getAudioContext: () => {
    // AudioContext = window.AudioContext;
    const audioContext = new AudioContext();
    return audioContext;
  },
  // eslint-disable-next-line
  makeGainNode: (audioContext: any) => {
    const gainNode = audioContext.createGain();
    return gainNode;
  },
  // eslint-disable-next-line
  makeAudioBuffer: async (audioContext: any, arrBuffer: any) => {
    const audioBuffer = await audioContext.decodeAudioData(arrBuffer);
    return audioBuffer;
  },
  // eslint-disable-next-line
  makeAudio: async (audioContext: any, audioBuffer: any, gainNode: any) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(gainNode).connect(audioContext.destination);
    return source;
  },
};

export default util;
