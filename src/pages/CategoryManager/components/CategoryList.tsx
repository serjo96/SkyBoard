import React from 'react';
import { useCategories } from '../../../hooks/useCategories';

const CategoryList: React.FC = () => {
  const { categories } = useCategories();

  return (
    <div className="category-list">
      {categories.map(category => (
        <div key={category.id} className="category-item">
          <span style={{ backgroundColor: category.color }}></span>
          <h4>{category.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default CategoryList; 