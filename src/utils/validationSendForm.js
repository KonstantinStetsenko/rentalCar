import * as Yup from 'yup';

export const validationSchemaSendForm = Yup.object({
  username: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  message: Yup.string().min(10, 'Too short').max(500, 'Too long'),
});
