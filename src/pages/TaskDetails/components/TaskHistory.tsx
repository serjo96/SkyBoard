import React from 'react';
import { format } from 'date-fns';

interface TaskHistoryItem {
  id: string;
  action: string;
  timestamp: string;
  changes: Record<string, any>;
}

interface TaskHistoryProps {
  history: TaskHistoryItem[];
}

const TaskHistory: React.FC<TaskHistoryProps> = ({ history }) => {
  return (
    <div className="task-history">
      <h3>History</h3>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            <span>{item.action}</span>
            <time>{format(new Date(item.timestamp), 'PPpp')}</time>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskHistory; 