export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  color: string;
} 