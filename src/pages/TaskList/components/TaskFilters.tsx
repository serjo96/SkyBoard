import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { TASK_STATUSES } from '../../../constants/taskStatuses';

const TaskFilters: React.FC = () => {
  const { categories } = useCategories();

  return (
    <div className="task-filters">
      <select>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      <select>
        <option value="">All Statuses</option>
        {Object.values(TASK_STATUSES).map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilters; 