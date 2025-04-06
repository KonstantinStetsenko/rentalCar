import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { validationSchemaSendForm } from '../../utils/validationSendForm.js';
import DateCalendarReferenceDate from '../Calendars/Calendars.jsx';
import css from './SendForm.module.css';

const initialValues = {
  username: '',
  email: '',
  message: '',
};

export default function SendForm() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();

  const handleSubmit = (values, actions) => {
    toast.success('Form submitted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaSendForm}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldContainer}>
              <Field
                className={css.inputForm}
                type="text"
                name="username"
                placeholder="Name*"
                id={nameFieldId}
              />
              <div className={css.errorContainer}>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.fieldContainer}>
              <Field
                className={css.inputForm}
                type="email"
                name="email"
                id={emailFieldId}
                placeholder="Email*"
              />
              <div className={css.errorContainer}>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>

            <DateCalendarReferenceDate />

            <div className={css.fieldContainer}>
              <Field
                className={css.inputTextarea}
                as="textarea"
                name="message"
                id={msgFieldId}
                rows="5"
                placeholder="Message*"
              />
              <div className={css.errorContainer}>
                <ErrorMessage
                  name="message"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.btnFormContainer}>
              <button type="submit" className={css.btnForm}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
