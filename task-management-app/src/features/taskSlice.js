import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTaskStatus(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      const { title, description, dueDate, priority, assignedUser, status } = action.payload;
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.assignedUser = assignedUser;
        task.status = status;
      }
    },
  },
});

export const { addTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
