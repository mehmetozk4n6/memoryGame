import { configureStore } from "@reduxjs/toolkit";
import frameworkSlice from "./frameWorkSlice";
import pointSlice from "./pointSlice";

export const store = configureStore({
  reducer: {
    frameworks: frameworkSlice,
    point: pointSlice,
  },
});
