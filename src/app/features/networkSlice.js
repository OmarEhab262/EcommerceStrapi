import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnLine: true,
};

const networklSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action) => {
      state.isOnLine = action.payload;
    },
  },
});

export const { networkMode } = networklSlice.actions;
export const selectNetwork = ({ network }) => network;
export default networklSlice.reducer;
