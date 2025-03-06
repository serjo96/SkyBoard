export const ROUTES = {
  DASHBOARD: '/',
  TASKS: {
    LIST: '/tasks',
    DETAILS: '/tasks/:id',
    CREATE: '/tasks/create',
    EDIT: '/tasks/:id/edit'
  },
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories/create',
    EDIT: '/categories/:id'
  }
} as const; 