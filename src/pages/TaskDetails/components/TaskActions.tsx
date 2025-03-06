import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TaskActionsProps {
  taskId: string;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ taskId, onDelete, onStatusChange }) => {
  const navigate = useNavigate();

  return (
    <div className="task-actions">
      <button onClick={() => navigate(`/tasks/${taskId}/edit`)}>
        Edit
      </button>
      <button onClick={onDelete}>
        Delete
      </button>
      <select onChange={(e) => onStatusChange(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default TaskActions; 