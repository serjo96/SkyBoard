export const TASK_STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
} as const;

export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES]; 