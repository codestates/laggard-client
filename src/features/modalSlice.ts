import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  myinfo: boolean;
}

const initialState: ModalState = {
  myinfo: false,
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
  },
});

export const { openMyinfo, closeMyinfo } = modalSlice.actions;

export const selectMyinfo = (state: RootState): boolean => state.modal.myinfo;

export default modalSlice.reducer;
