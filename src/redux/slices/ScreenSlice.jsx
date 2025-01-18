import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";

const initialState = {
  loading: true,
  screens: [],
  singleScreen: "",
  error: "",
};

export const getAllScreen = createAsyncThunk(
  "screens/getAllScreen",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(`screen/all-screens`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createScreen = createAsyncThunk(
  "screens/createScreen",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`screen/create-screen`, credentials);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occured, please try again"
      );
    }
  }
);

export const editScreen = createAsyncThunk(
  "screens/editScreen",
  async ({ screenId, screenData }, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(screenId);
      console.log(decryptedId);
      const res = await Api.put(
        `screen/edit-screen/${decryptedId}`,
        screenData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occurred, please try again"
      );
    }
  }
);

export const deleteScreen = createAsyncThunk(
  "screens/deleteScreen",
  async ({screenId}, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(screenId);
      await Api.delete(`screen/delete-screen/${decryptedId}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occurred, please try again"
      );
    }
  }
);

export const viewSingleScreen = createAsyncThunk("screens/viewSingleScreen", async({screenId}, {rejectWithValue})=>{
  try {
    const decryptedId = decryptId(screenId);
   const res = await Api.get(`screen/screen/${decryptedId}`);
   return res.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Something occurred, please try again"
    );
  }
}
);

const screenSlice = createSlice({
  name: "screens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllScreen.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.screens;
        state.error = "";
      })
      .addCase(getAllScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createScreen.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(createScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editScreen.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(editScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteScreen.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewSingleScreen.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(viewSingleScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.singleScreen = action.payload;
        state.error = "";
      })
      .addCase(viewSingleScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default screenSlice.reducer;
