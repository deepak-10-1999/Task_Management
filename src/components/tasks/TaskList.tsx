import React from 'react';
import { useAppSelector } from '../../store/hooks';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiInbox } from 'react-icons/fi';

const TaskList: React.FC = () => {
  const { tasks, loading, filters } = useAppSelector((state) => state.tasks);
  
  // Ensure tasks is an array
  const tasksArray = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = tasksArray.filter((task) => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          task.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <TaskFilters />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <FiInbox className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new task.
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTasks.length} of {tasksArray.length} tasks
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;