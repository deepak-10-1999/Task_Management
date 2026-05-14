import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setStatusFilter, setSearchFilter, clearFilters } from '../../store/slices/taskSlice';
import { TaskStatus } from '../../types';
import { FiSearch, FiX } from 'react-icons/fi';
import { debounce } from '../../utils/helpers';

const TaskFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tasks);

  const statusOptions: { value: TaskStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleSearchChange = debounce((value: string) => {
    dispatch(setSearchFilter(value));
  }, 300);

  const handleClearFilters = () => {
    dispatch(clearFilters());
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Search tasks by title or description..."
            defaultValue={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filters.status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as TaskStatus | 'all'))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm cursor-pointer"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {(filters.search || filters.status !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <FiX className="h-4 w-4 mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;