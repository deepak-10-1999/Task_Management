import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
});

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status'),
});

export const validateTaskStatus = (status: string): boolean => {
  return ['pending', 'in-progress', 'completed'].includes(status);
};