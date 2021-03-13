import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type QuizInfo = {
  songId: number;
  title: string;
  year: number;
  rank: number;
  album_title: string;
  lyrics: string;
  artist: string;
};

interface SongState {
  quizSong: QuizInfo | null;
  quizAge: number | string | null;
  totalScore: number;
}
const initialState: SongState = {
  quizSong: null,
  quizAge: null,
  totalScore: 0,
};

export const quizInfoSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getQuizSong: (state, action: PayloadAction<QuizInfo>) => {
      state.quizSong = action.payload;
    },
    resetQuizSong: (state) => {
      state.quizSong = null;
    },
    chooseQuizAge: (state, action: PayloadAction<number>) => {
      state.quizAge = action.payload;
    },
    resetQuizAge: (state) => {
      state.quizAge = null;
    },
    addTotalScore: (state, action: PayloadAction<number>) => {
      state.totalScore = action.payload;
    },
    resetTotalScore: (state) => {
      state.totalScore = 0;
    },
  },
});

export const {
  getQuizSong,
  resetQuizSong,
  chooseQuizAge,
  resetQuizAge,
  addTotalScore,
  resetTotalScore,
} = quizInfoSlice.actions;

export const selectQuizSong = (state: RootState): QuizInfo | null =>
  state.quiz.quizSong;
export const selectQuizTime = (state: RootState): number | string | null =>
  state.quiz.quizAge;
export const selectTotalScore = (state: RootState): number =>
  state.quiz.totalScore;

export default quizInfoSlice.reducer;
