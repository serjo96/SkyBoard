import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="task-details">
      <h2>Task Details: {id}</h2>
    </div>
  );
};

export default TaskDetails; 