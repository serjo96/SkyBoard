import React from 'react';
import './breadcrumbs.scss';
import { CategoryNode } from '@/types/visualization.types';

interface BreadcrumbsProps {
  categoryPath: number[];
  originalData: CategoryNode[];
  findCategoryById: (id: number) => CategoryNode | null;
  onNavigate: (categoryId: number | null) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  categoryPath,
  originalData,
  findCategoryById,
  onNavigate 
}) => {
  const handleClick = (categoryId: number | null) => {
    onNavigate(categoryId);
  };

  return (
    <div className="breadcrumbs">
      <button 
        className={`breadcrumbs__item ${!categoryPath.length ? 'breadcrumbs__item--active' : ''}`} 
        onClick={() => handleClick(null)}
      >
        <span className="material-icons">home</span>
        <span>All Categories</span>
      </button>
      
      {categoryPath.map((categoryId) => {
        const category = findCategoryById(categoryId);
        if (!category) return null;
        
        return (
          <React.Fragment key={categoryId}>
            <span className="breadcrumbs__separator">/</span>
            <button 
              className={`breadcrumbs__item ${
                categoryPath[categoryPath.length - 1] === categoryId 
                  ? 'breadcrumbs__item--active' 
                  : ''
              }`}
              onClick={() => handleClick(categoryId)}
            >
              {category.category}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs; 