import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type SongInfo = {
  id: number;
  testData: [
    {
      id: number;
      title: string;
      artist: string;
      year: number;
      genre: string;
      lyrics: string;
    },
  ];
};

type ResultInfo = {
  tests_id?: number;
  id?: number;
  title?: string;
  year?: number;
  genre?: string;
  userAnswer?: string;
  right_or_wrong?: boolean;
};

interface SongState {
  song: SongInfo | null;
  result: ResultInfo[] | null;
  currNum: number;
}
const initialState: SongState = {
  song: null,
  result: null,
  currNum: 0,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    getSongs: (state, action: PayloadAction<SongInfo>) => {
      state.song = action.payload;
    },
    resetSongs: (state) => {
      state.song = null;
    },
    postResult: (state, action: PayloadAction<ResultInfo[] | null>) => {
      state.result = action.payload;
    },
    resetResult: (state) => {
      state.result = null;
    },
    increaseCurrNum: (state) => {
      state.currNum += 1;
    },
    resetCurrNum: (state) => {
      state.currNum = 0;
    },
  },
});

export const {
  getSongs,
  resetSongs,
  postResult,
  resetResult,
  increaseCurrNum,
  resetCurrNum,
} = songSlice.actions;

export const selectSong = (state: RootState): SongInfo | null =>
  state.song.song;
export const selectTestResult = (state: RootState): ResultInfo[] | null =>
  state.song.result;
export const selectCurrNum = (state: RootState): number => state.song.currNum;

export default songSlice.reducer;
