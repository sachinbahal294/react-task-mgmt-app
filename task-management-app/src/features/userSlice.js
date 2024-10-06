import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, name: 'Shenam', avatar: 'https://gravatar.com/avatar/53d18b9e237d951741aa7ba8b5913e2f?s=200&d=robohash&r=x' },
    { id: 2, name: 'Sangam', avatar: 'https://gravatar.com/avatar/08c087d03a6b0c29cb9d527bd1063960?s=200&d=robohash&r=x' },
  ],
  loggedInUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;