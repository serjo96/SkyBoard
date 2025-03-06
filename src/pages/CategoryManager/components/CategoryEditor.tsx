import React, { useState } from 'react';
import { useCategories } from '../../../hooks/useCategories';

interface CategoryEditorProps {
  categoryId?: string;
  onSave: (data: any) => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ categoryId, onSave }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const { categories } = useCategories();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave({ name, color });
    }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <select>
        <option value="">No Parent</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Save Category</button>
    </form>
  );
};

export default CategoryEditor; 