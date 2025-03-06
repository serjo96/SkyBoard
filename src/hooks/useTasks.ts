import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';

export const useTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  return {
    tasks: tasks.items,
    loading: tasks.loading,
    error: tasks.error
  };
}; 