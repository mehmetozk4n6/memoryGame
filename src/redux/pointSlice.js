import { createSlice } from "@reduxjs/toolkit";

const pointSlice = createSlice({
  name: "point",
  initialState: {
    value: 200,
    diff: 0,
  },
  reducers: {
    updatePoint: (state, action) => {
      state.value = state.value + action.payload;
      state.diff = action.payload;
    },
  },
});

export const { updatePoint } = pointSlice.actions;
export default pointSlice.reducer;
