import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { deleteTask, updateTask } from '../../store/slices/taskSlice';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiPlayCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import TaskForm from './TaskForm';
import Modal from '../common/Modal';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'in-progress':
        return <FiPlayCircle className="text-yellow-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    await dispatch(updateTask({ id: task.id, updates: { status: newStatus } }));
    toast.success('Task status updated');
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(task.id));
    toast.success('Task deleted successfully');
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2 flex-1">
            {getStatusIcon(task.status)}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {task.title}
            </h3>
          </div>
          <div className="flex space-x-2 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              aria-label="Edit task"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              aria-label="Delete task"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {task.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 cursor-pointer ${getStatusColor(
              task.status
            )}`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Updated {formatDate(task.updatedAt)}
          </div>
        </div>
      </div>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Task">
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the task "{task.title}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;