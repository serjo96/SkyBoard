import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';
import './DashboardAnalytics.scss';

const DashboardAnalytics: React.FC = () => {
  const { tasks } = useTasks();
  const { categories } = useCategories();

  return (
    <div className="dashboard-analytics">
      <div className="dashboard-analytics__column">
        <h3>Tasks Overview</h3>
        <div className="analytics-value">{tasks.length}</div>
        <div className="analytics-label">Total Tasks</div>
      </div>
      
      <div className="dashboard-analytics__column">
        <h3>Categories</h3>
        <div className="analytics-value">{categories.length}</div>
        <div className="analytics-label">Active Categories</div>
      </div>
      
      <div className="dashboard-analytics__column">
        <h3>Progress</h3>
        <div className="analytics-value">
          {tasks.filter(t => t.done).length}/{tasks.length}
        </div>
        <div className="analytics-label">Completed Tasks</div>
      </div>
      
      <div className="dashboard-analytics__column">
        <h3>Activity</h3>
        <div className="analytics-value">24</div>
        <div className="analytics-label">Updates Today</div>
      </div>
    </div>
  );
};

export default DashboardAnalytics; 