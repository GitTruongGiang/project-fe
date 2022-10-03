import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apisevice from "../../app/apisevice";

const initialState = {
  isLoading: false,
  airlines: [],
};

export const getAirlines = createAsyncThunk(
  "airlines/getAirlines",
  async ({ page, limit }, { rejectWithValue }) => {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    try {
      let url = `/airlines?page=${page}&limit=${limit}`;
      const response = await apisevice.get(url);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const airlinesSlice = createSlice({
  name: "airlines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAirlines.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAirlines.fulfilled, (state, action) => {
        state.isLoading = false;
        const { airlines } = action.payload.data;
        state.airlines = airlines;
      })
      .addCase(getAirlines.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = airlinesSlice;
export const {} = actions;
export default reducer;
