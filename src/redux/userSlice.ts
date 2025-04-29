import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  firstName: string;
  lastName: string;
  emailId: string;
  photoUrl: string;
  age: string;
  about?: string;
  gender?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: null as UserType | null,
  reducers: {
    addUser: (_, action: PayloadAction<UserType>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
