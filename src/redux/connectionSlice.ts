import { createSlice } from "@reduxjs/toolkit";
// import { ConnectionsResponse } from "../components/Connections";

export const connectionSlice = createSlice({
  name: "connections",
  initialState: null,

  reducers: {
    addConnectionList: (_, action) => {
      return action.payload;
    },
  },
});

export const { addConnectionList } = connectionSlice.actions;

export default connectionSlice.reducer;
