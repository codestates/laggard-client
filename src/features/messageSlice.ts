import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface MessageState {
  changeNicknameSuccess: boolean;
  changeNicknameFailure: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure: boolean;
  correct: boolean;
  wrong: boolean;
  chance: boolean;
  signupSuccess: boolean;
  serverError: boolean;
  alreadySigned: boolean;
  invalidUser: boolean;
  invalidBirthYear: boolean;
}

const initialState: MessageState = {
  changeNicknameSuccess: false,
  changeNicknameFailure: false,
  changePasswordSuccess: false,
  changePasswordFailure: false,
  correct: false,
  wrong: false,
  chance: false,
  signupSuccess: false,
  serverError: false,
  alreadySigned: false,
  invalidUser: false,
  invalidBirthYear: false,
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
    openDecreaseChance: (state) => {
      state.chance = true;
    },
    closeDecreaseChance: (state) => {
      state.chance = false;
    },
    openSignupSuccess: (state) => {
      state.signupSuccess = true;
    },
    closeSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
    openServerError: (state) => {
      state.serverError = true;
    },
    closeServerError: (state) => {
      state.serverError = false;
    },
    openAlreadySigned: (state) => {
      state.alreadySigned = true;
    },
    closeAlreadySigned: (state) => {
      state.alreadySigned = false;
    },
    openInvalidUser: (state) => {
      state.invalidUser = true;
    },
    closeInvalidUser: (state) => {
      state.invalidUser = false;
    },
    openInvalidBirthYear: (state) => {
      state.invalidBirthYear = true;
    },
    closeInvalidBirthYear: (state) => {
      state.invalidBirthYear = false;
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
  openDecreaseChance,
  closeDecreaseChance,
  openSignupSuccess,
  closeSignupSuccess,
  openServerError,
  closeServerError,
  openAlreadySigned,
  closeAlreadySigned,
  openInvalidUser,
  closeInvalidUser,
  openInvalidBirthYear,
  closeInvalidBirthYear,
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
export const selectDecreaseChance = (state: RootState): boolean =>
  state.message.chance;
export const selectSignupSuccess = (state: RootState): boolean =>
  state.message.signupSuccess;
export const selectServerError = (state: RootState): boolean =>
  state.message.serverError;
export const selectAlreadySigned = (state: RootState): boolean =>
  state.message.alreadySigned;
export const selectInvalidUser = (state: RootState): boolean =>
  state.message.invalidUser;
export const selectInvalidBirthYear = (state: RootState): boolean =>
  state.message.invalidBirthYear;

export default messageSlice.reducer;
