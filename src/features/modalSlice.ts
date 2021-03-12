import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  myinfo: boolean;
  testStart: boolean;
  testEnd: boolean;
  quizStart: boolean;
  quizEnd: boolean;
}

const initialState: ModalState = {
  myinfo: false,
  testStart: false,
  testEnd: false,
  quizStart: false,
  quizEnd: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openMyinfo: (state) => {
      state.myinfo = true;
    },
    closeMyinfo: (state) => {
      state.myinfo = false;
    },
    testStartTrue: (state) => {
      state.testStart = true;
    },
    testStartFalse: (state) => {
      state.testStart = false;
    },
    testEndTrue: (state) => {
      state.testEnd = true;
    },
    testEndFalse: (state) => {
      state.testEnd = false;
    },
    quizStartTrue: (state) => {
      state.quizStart = true;
    },
    quizStartFalse: (state) => {
      state.quizStart = false;
    },
    quizEndTrue: (state) => {
      state.quizEnd = true;
    },
    quizEndFalse: (state) => {
      state.quizEnd = false;
    },
  },
});

export const {
  openMyinfo,
  closeMyinfo,
  testStartTrue,
  testStartFalse,
  testEndTrue,
  testEndFalse,
  quizStartTrue,
  quizStartFalse,
  quizEndTrue,
  quizEndFalse,
} = modalSlice.actions;

export const selectMyinfo = (state: RootState): boolean => state.modal.myinfo;
export const selectTestStart = (state: RootState): boolean =>
  state.modal.testStart;
export const selectQuizStart = (state: RootState): boolean =>
  state.modal.quizStart;
export const selectTestEnd = (state: RootState): boolean => state.modal.testEnd;
export const selectQuizEnd = (state: RootState): boolean => state.modal.quizEnd;

export default modalSlice.reducer;
