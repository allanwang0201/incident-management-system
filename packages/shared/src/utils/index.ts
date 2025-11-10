export * from './date';

export const getPriorityLabel = (priority: 1 | 2 | 3): string => {
  const labels = {
    1: 'High',
    2: 'Medium',
    3: 'Low',
  };
  return labels[priority] || 'Unknown';
};

export const getPriorityColor = (priority: 1 | 2 | 3): string => {
  const colors = {
    1: '#f44336', // Red for high priority
    2: '#ff9800', // Orange for medium priority
    3: '#2196f3', // Blue for low priority
  };
  return colors[priority] || '#9e9e9e';
};
