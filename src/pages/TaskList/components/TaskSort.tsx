import React from 'react';

interface TaskSortProps {
  onSort: (field: string) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ onSort }) => {
  return (
    <div className="task-sort">
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="createdAt">Created Date</option>
        <option value="updatedAt">Updated Date</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};

export default TaskSort; 