import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  users: [],
  error: "",
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
};

export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      // Pass pagination parameters to the API
      const res = await Api.get(`/user/all-users`, {
        params: { page, limit }, // Include page and limit in the request
      });

      if (res.data.success) {
        return {
          users: res.data.users,
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalUsers: res.data.totalUsers,
        };
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await Api.delete(`/user/delete/${userId}`, { withCredentials: true });

      dispatch(getAllUser({ page: 1, limit: 10 }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editUser = createAsyncThunk(
    'users/editUser',
    async ({ userId, userData }, { rejectWithValue }) => {
      try {
        const response = Api.patch(`/user/individual-user/${userId}`, userData, {withCredentials: true},
        );
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
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
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
        state.error = "";
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
