import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import TaskList from '@/pages/TaskList/TaskList';
import TaskDetails from '@/pages/TaskDetails/TaskDetails';
import CategoryManager from '@/pages/CategoryManager/CategoryManager';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetails />} />
        <Route path="categories" element={<CategoryManager />} />
      </Route>
    </Routes>
  );
};

export default App; 