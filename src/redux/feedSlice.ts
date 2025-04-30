import { createSlice } from "@reduxjs/toolkit";
import { FeedApiResponse } from "../components/Feed";

const feedSlice = createSlice({
  name: "feed",
  initialState: [] as FeedApiResponse | [],
  reducers: {
    addFeed: (_, action) => action.payload,
    removeFeed: () => {
      return [];
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
