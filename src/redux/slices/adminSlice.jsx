import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  theatre: '',
  error: '',
};

export const loggWebAdmin = createAsyncThunk(
  'admin/loggWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`/theatre/signin`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signUpWebAdmin = createAsyncThunk(
  'admin/signUpWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`/auth/signup`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'admin/logOut',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`/theatre/signout`, credentials,{ withCredentials: true });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const webAdminSlice = createSlice({
  name: "web-admin",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(loggWebAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.theatre = action.payload;
        state.error = "";
      })
      .addCase(loggWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.theatre = '';
        state.error = action.payload; 
      })
      .addCase(signUpWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(signUpWebAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(signUpWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.theatre = '';
        state.error = action.payload; 
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.theatre = '';
        state.error = action.payload; 
      })
  },
});

export default webAdminSlice.reducer;
