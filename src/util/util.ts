import axios from 'axios';

const util = {
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
  getAudioContext: () => {
    const audioContext = new AudioContext();
    return audioContext;
  },
  makeGainNode: (audioContext: any) => {
    const gainNode = audioContext.createGain();
    return gainNode;
  },
  makeAudioBuffer: async (audioContext: any, arrBuffer: any) => {
    const audioBuffer = await audioContext.decodeAudioData(arrBuffer);
    return audioBuffer;
  },
  makeAudio: async (audioContext: any, audioBuffer: any, gainNode: any) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(gainNode).connect(audioContext.destination);
    return source;
  },
};

export default util;
