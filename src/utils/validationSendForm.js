import * as Yup from 'yup'; // Импортируем библиотеку для валидации форм

export const validationSchemaSendForm = Yup.object({
  name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  message: Yup.string().min(10, 'Too short').max(500, 'Too long'),
});
