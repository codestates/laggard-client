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
    console.log('getAudioContext');
    const audioContext = new AudioContext();
    console.table(audioContext);
    return audioContext;
  },
  makeGainNode: (audioContext: any) => {
    console.log('makeGainNode');
    const gainNode = audioContext.createGain();
    return gainNode;
  },
  makeAudioBuffer: async (audioContext: any, arrBuffer: any) => {
    console.log('makeAudioBuffer');
    const audioBuffer = await audioContext.decodeAudioData(arrBuffer);
    return audioBuffer;
  },
  makeAudio: async (audioContext: any, audioBuffer: any, gainNode: any) => {
    console.log(audioContext);
    console.log(audioBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    console.log('makeAudio');

    source.connect(gainNode).connect(audioContext.destination);
    return source;
  },
};

export default util;
