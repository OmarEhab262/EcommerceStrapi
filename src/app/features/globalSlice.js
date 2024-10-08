import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    isOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onOpenCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});
export const {
  isOpenCartDrawerAction,
  onOpenCartDrawerAction,
  onCloseCartDrawerAction,
} = globalSlice.actions;
export const selectGlobal = ({ global }) => global;
export default globalSlice.reducer;
