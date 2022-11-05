import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";
import apisevice from "../../app/apisevice";

const initialState = {
  isLoading: false,
  chairs: [],
  chair: {},
  flight: {},
  flights: [],
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
      console.log(status, userId, chairId);
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
  async ({ chairId, status, userId }, { rejectWithValue }) => {
    try {
      console.log({ chairId, status, userId });
      let url = `chairs/cancel/${chairId}`;
      const response = await apisevice.post(url, {
        status,
        userId: userId,
      });
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const cancelFlights = createAsyncThunk(
  "chair/cancelFlights",
  async ({ status, chairId, flightId }, { rejectWithValue }) => {
    try {
      console.log({ status, chairId, flightId });
      let url = `chairs/cancel/flight/${chairId}`;
      const response = await apisevice.post(url, { status });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getListBooking = createAsyncThunk(
  "list/getListBooking",
  async ({}, { rejectWithValue }) => {
    try {
      let url = `chairs/listBooking`;
      const response = await apisevice.get(url);
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
        const { chairs } = action.payload.data;
        state.chairs = chairs;
        toast.success("cancel success");
      })
      .addCase(cancelChair.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(cancelFlights.pending, (status, action) => {
        status.isLoading = true;
      })
      .addCase(cancelFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        const { chair, flights } = action.payload.data;
        if (chair) {
          state.flights = flights;
          toast.success("cancel flight success");
        } else {
          toast.error(`${action.payload.message}`);
        }
      })
      .addCase(cancelFlights.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getListBooking.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getListBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chairs, flights } = action.payload.data;
        state.message = action.payload.message;
        state.chairs = chairs;
        state.flights = flights;
      })
      .addCase(getListBooking.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = chairSlice;
const {} = actions;
export default reducer;
