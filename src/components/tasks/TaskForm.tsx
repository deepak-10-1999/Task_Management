import React from 'react';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../store/hooks';
import { createTask, updateTask } from '../../store/slices/taskSlice';
import { Task, TaskStatus } from '../../types';
import { taskValidationSchema } from '../../utils/validation';
import toast from 'react-hot-toast';
import Button from '../common/Button';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: (task?.status || 'pending') as TaskStatus,
    },
    validationSchema: taskValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (task) {
          await dispatch(updateTask({ id: task.id, updates: values })).unwrap();
          toast.success('Task updated successfully');
        } else {
          await dispatch(createTask(values)).unwrap();
          toast.success('Task created successfully');
        }
        onClose();
      } catch (error) {
        toast.error(task ? 'Failed to update task' : 'Failed to create task');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={`mt-1 block w-full px-3 py-2 border ${
            formik.touched.title && formik.errors.title
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
          placeholder="Enter task title"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className={`mt-1 block w-full px-3 py-2 border ${
            formik.touched.description && formik.errors.description
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
          placeholder="Enter task description"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formik.errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status *
        </label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.status}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={formik.isSubmitting}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;