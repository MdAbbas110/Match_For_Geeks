import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (_, action) => action.payload,
  },
});

export const { addRequest } = requestSlice.actions;
export default requestSlice.reducer;
