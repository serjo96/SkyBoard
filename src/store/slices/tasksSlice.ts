import { createSlice } from '@reduxjs/toolkit';
import type { Task } from '../../types';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
