import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  myinfo: boolean;
  testStart: boolean;
  testEnd: boolean;
}

const initialState: ModalState = {
  myinfo: false,
  testStart: false,
  testEnd: false,
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
  },
});

export const {
  openMyinfo,
  closeMyinfo,
  testStartTrue,
  testStartFalse,
  testEndTrue,
  testEndFalse,
} = modalSlice.actions;

export const selectMyinfo = (state: RootState): boolean => state.modal.myinfo;
export const selectTestStart = (state: RootState): boolean =>
  state.modal.testStart;
export const selectTestEnd = (state: RootState): boolean => state.modal.testEnd;

export default modalSlice.reducer;
