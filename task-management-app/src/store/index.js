import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});

export default store;