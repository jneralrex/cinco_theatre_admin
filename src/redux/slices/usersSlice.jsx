import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/user/all-users`, {
        withCredentials: true, 
      });
      if (Array.isArray(res.data)) {
        return res.data;
      }
      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
        state.error = "";
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
