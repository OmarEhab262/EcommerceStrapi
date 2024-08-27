import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CookieService from "../../services/CookieService";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Define the async thunk for user login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      // Send a POST request with user credentials
      const { data } = await axios.post(
        "http://localhost:1337/api/auth/local",
        credentials
      );
      return data;
    } catch (error) {
      // Pass the error message to rejectWithValue
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 3);
        const options = { path: "/", expires: date };
        CookieService.set("jwt", action.payload.jwt, options);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload; // Use action.payload for the error message
      });
  },
});

export const selectLogin = (state) => state.login;
export default loginSlice.reducer;
