import * as Yup from 'yup';

export const validationSchema = Yup.object({
  minMileage: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Cannot be negative'),
  maxMileage: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Cannot be negative'),
});
