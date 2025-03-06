import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';

export const useCategories = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  return {
    categories: categories.items,
    loading: categories.loading,
    error: categories.error
  };
}; 