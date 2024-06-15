const calculateProgress = (subtasks) => {
  if (subtasks.length === 0) return 0;
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  return (completedSubtasks / subtasks.length) * 100;
};

export default calculateProgress;
