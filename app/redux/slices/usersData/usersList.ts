import { createSlice } from "@reduxjs/toolkit";

interface UsersListState {
  users: Array<{ id: string; userName: string; profileImage: string }>;
}

const initialState: UsersListState = {
  users: [],
};

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    setUsers: (state, action) => { state.users = action.payload },
    clearUsers: (state) => { state.users = [] },
  },
});

export const { setUsers, clearUsers } = usersListSlice.actions;
export default usersListSlice.reducer;