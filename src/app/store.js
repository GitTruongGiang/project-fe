import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../feature/flights/flightSlice";
import airlinesReducer from "../feature/airlines/airlineSlice";
import chairsReducer from "../feature/chair/chairSlice";
import usersReducer from "../feature/user/userSlice";
const store = configureStore({
  reducer: {
    flights: flightReducer,
    airlines: airlinesReducer,
    chairs: chairsReducer,
    users: usersReducer,
  },
});

export default store;
