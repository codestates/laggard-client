import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface MessageState {
  changeNicknameSuccess: boolean;
  changeNicknameFailure: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure: boolean;
}

const initialState: MessageState = {
  changeNicknameSuccess: false,
  changeNicknameFailure: false,
  changePasswordSuccess: false,
  changePasswordFailure: false,
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
} = messageSlice.actions;

export const selectChangeNicknameSuccess = (state: RootState): boolean =>
  state.message.changeNicknameSuccess;
export const selectChangeNicknameFailure = (state: RootState): boolean =>
  state.message.changeNicknameFailure;
export const selectChangePasswordSuccess = (state: RootState): boolean =>
  state.message.changePasswordSuccess;
export const selectChangePasswordFailure = (state: RootState): boolean =>
  state.message.changePasswordFailure;

export default messageSlice.reducer;
