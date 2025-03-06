import React from 'react';
import { useTasks } from '../../../hooks/useTasks';
import { useCategories } from '../../../hooks/useCategories';
import './dashboard-stats.scss';

const DashboardStats: React.FC = () => {
  const { tasks } = useTasks();
  const { categories } = useCategories();

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <p>{tasks.length}</p>
      </div>
      <div className="stat-card">
        <h3>Categories</h3>
        <p>{categories.length}</p>
      </div>
    </div>
  );
};

export default DashboardStats; 