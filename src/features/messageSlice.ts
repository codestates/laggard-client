import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface MessageState {
  changeNicknameSuccess: boolean;
  changeNicknameFailure: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure: boolean;
  correct: boolean;
  wrong: boolean;
}

const initialState: MessageState = {
  changeNicknameSuccess: false,
  changeNicknameFailure: false,
  changePasswordSuccess: false,
  changePasswordFailure: false,
  correct: false,
  wrong: false,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    openNicknameSuccess: (state) => {
      state.changeNicknameSuccess = true;
    },
    closeNicknameSuccess: (state) => {
      state.changeNicknameSuccess = false;
    },
    openNicknameFailure: (state) => {
      state.changeNicknameFailure = true;
    },
    closeNicknameFailure: (state) => {
      state.changeNicknameFailure = false;
    },
    openPasswordSuccess: (state) => {
      state.changePasswordSuccess = true;
    },
    closePasswordSuccess: (state) => {
      state.changePasswordSuccess = false;
    },
    openPasswordFailure: (state) => {
      state.changePasswordFailure = true;
    },
    closePasswordFailure: (state) => {
      state.changePasswordFailure = false;
    },
    openCorrect: (state) => {
      state.correct = true;
    },
    closeCorrect: (state) => {
      state.correct = false;
    },
    openWrong: (state) => {
      state.wrong = true;
    },
    closeWrong: (state) => {
      state.wrong = false;
    },
  },
});

export const {
  openNicknameSuccess,
  closeNicknameSuccess,
  openNicknameFailure,
  closeNicknameFailure,
  openPasswordSuccess,
  closePasswordSuccess,
  openPasswordFailure,
  closePasswordFailure,
  openCorrect,
  closeCorrect,
  openWrong,
  closeWrong,
} = messageSlice.actions;

export const selectChangeNicknameSuccess = (state: RootState): boolean =>
  state.message.changeNicknameSuccess;
export const selectChangeNicknameFailure = (state: RootState): boolean =>
  state.message.changeNicknameFailure;
export const selectChangePasswordSuccess = (state: RootState): boolean =>
  state.message.changePasswordSuccess;
export const selectChangePasswordFailure = (state: RootState): boolean =>
  state.message.changePasswordFailure;
export const selectCorrect = (state: RootState): boolean =>
  state.message.correct;
export const selectWrong = (state: RootState): boolean => state.message.wrong;

export default messageSlice.reducer;
