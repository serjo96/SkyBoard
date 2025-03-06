import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useCategories = () => {
  const categories = useSelector((state: RootState) => state.categories);

  return {
    categories: categories.items,
    loading: categories.loading,
    error: categories.error,
  };
};
