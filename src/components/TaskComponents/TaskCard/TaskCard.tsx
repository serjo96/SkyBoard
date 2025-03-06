import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Link to={`/tasks/${task.id}`} className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-card__status">
        {task.done ? 'Completed' : 'In Progress'}
      </div>
    </Link>
  );
};

export default TaskCard; 