export interface BaseCategoryNode {
  id: number;
  count: number;
  category: string;
  subcategories?: BaseCategoryNode[];
}

export const mockCategoryData: BaseCategoryNode[] = [
  {
    id: 1,
    count: 10,
    category: 'Business',
    subcategories: [
      { id: 6, count: 5, category: 'Startups' },
      { id: 7, count: 7, category: 'Investments' },
      { id: 10, count: 6, category: 'Marketing' },
    ],
  },
  {
    id: 2,
    count: 25,
    category: 'Photography',
    subcategories: [
      { id: 8, count: 6, category: 'Portraits' },
      { id: 9, count: 8, category: 'Landscapes' },
      { id: 12, count: 7, category: 'Street' },
    ],
  },
  { id: 3, count: 15, category: 'Travel' },
  { id: 4, count: 5, category: 'Creativity' },
  { id: 5, count: 30, category: 'Tech' },
];
