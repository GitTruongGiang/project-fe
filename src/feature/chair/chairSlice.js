import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apisevice from "../../app/apisevice";

const initialState = {
  isLoading: false,
  chairs: [],
  chair: {},
  flight: {},
  chairCount: 0,
  rowChairCount: 0,
};

export const getChairs = createAsyncThunk(
  "chairs/getChairs",
  async ({ flightId }, { rejectWithValue }) => {
    try {
      let url = `/chairs/${flightId}`;
      const response = await apisevice.post(url);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateChair = createAsyncThunk(
  "chair/updateChair",
  async ({ status, userId, chairId }, { rejectWithValue }) => {
    try {
      let url = `/chairs/${chairId}`;
      const response = await apisevice.put(url, { status, userId });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getSingleChair = createAsyncThunk(
  "chair/getSingleChair",
  async ({ chairId }, { rejectWithValue }) => {
    try {
      let url = `/chairs?chairId=${chairId}`;
      const response = await apisevice.get(url);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const cancelChair = createAsyncThunk(
  "chair/cancelChair",
  async ({ chairId, status }, { rejectWithValue }) => {
    try {
      let url = `chairs/cancel/${chairId}`;
      const response = await apisevice.post(url, { status: status });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const chairSlice = createSlice({
  name: "chair",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChairs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getChairs.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chairs, chairCount, rowChairCount } = action.payload.data;
        state.chairs = chairs;
        state.chairCount = chairCount;
        state.rowChairCount = rowChairCount;
      })
      .addCase(getChairs.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(updateChair.pending, (status, action) => {
        status.isLoading = true;
      })
      .addCase(updateChair.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chair } = action.payload.data;
        state.chair = chair;
      })
      .addCase(updateChair.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleChair.pending, (status, action) => {
        status.isLoading = true;
      })
      .addCase(getSingleChair.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chair, flight } = action.payload.data;
        state.chair = chair;
        state.flight = flight;
      })
      .addCase(getSingleChair.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(cancelChair.pending, (status, action) => {
        status.isLoading = true;
      })
      .addCase(cancelChair.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chair } = action.payload.data;
        state.chair = chair;
      })
      .addCase(cancelChair.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = chairSlice;
const {} = actions;
export default reducer;
