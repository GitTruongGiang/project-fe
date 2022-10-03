import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apisevice from "../../app/apisevice";

const initialState = {
  isLoading: false,
  flights: [],
  flight: {},
  count: 0,
  totalPage: 0,
};

export const getFlights = createAsyncThunk(
  "flight/getFlights",
  async (
    { page, limit, fromDay, timeFrom, timeTo, from, to, nameAirlines },
    { rejectWithValue }
  ) => {
    page = page || 1;
    limit = limit || 9;
    nameAirlines = nameAirlines ? nameAirlines : "";
    try {
      let url = `/flights/flight?page=${page}&limit=${limit}&from=${from}&to=${to}&nameAirlines=${nameAirlines}`;
      const response = await apisevice.post(url, { timeFrom, timeTo, fromDay });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getSingleFlight = createAsyncThunk(
  "flight/getSingleFlight",
  async ({ flightId }, { rejectWithValue }) => {
    try {
      let url = `/flights/single?flightId=${flightId}`;
      const response = await apisevice.get(url);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        const { flights, count, totalPage } = action.payload.data;
        state.flights = flights;
        state.count = count;
        state.totalPage = totalPage;
      })
      .addCase(getFlights.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleFlight.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSingleFlight.fulfilled, (state, action) => {
        state.isLoading = false;
        const { flight } = action.payload.data;
        state.flight = flight;
      })
      .addCase(getSingleFlight.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const { reducer, actions } = flightSlice;
export const {} = actions;
export default reducer;
