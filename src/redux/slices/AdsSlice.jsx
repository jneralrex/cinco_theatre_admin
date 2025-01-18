import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Api from "../../utils/AxiosInstance";


const initialState = {
    loading: false,
    ads:[],
    singleAds:"",
    error:""
};


export const getAllAds = createAsyncThunk("ads/getAllAds", async(_,{rejectWithValue})=>{
    try {
        const res = await Api.get(`ads/all-advertisements `)
        console.log(res)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});


const adsSlice = createSlice({
    name:"ads",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(getAllAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.ads = action.payload.allAds;
            state.error = ""
        })
        .addCase(getAllAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    },

});

export default adsSlice.reducer;
 

