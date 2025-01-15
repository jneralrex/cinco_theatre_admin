import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  admin: '',
  error: '',
};

export const loggWebAdmin = createAsyncThunk(
  'admin/loggWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`/auth/signin`, credentials,{ withCredentials: true });
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
        state.admin = action.payload;
        state.error = "";
      })
      .addCase(loggWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.admin = '';
        state.error = action.payload; 
      });
  },
});

export default webAdminSlice.reducer;
