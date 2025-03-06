import React, { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';

interface TaskFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  
  const { categories } = useCategories();

  return (
    <form className="task-form" onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ title, description, categoryId });
    }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm; 