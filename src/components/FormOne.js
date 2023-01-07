import React from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const FormOne = ({ formOne: { email, password }, setFormOne, setCurrentStep }) => {
  return (
    <Formik
      initialValues={{ email, password }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[A-Z])(?=.*?[0-9])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[a-z])(?=.*?[0-9])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$/,
            'Password can only contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.',
          ),
      })}
      onSubmit={({ email, password }) => {
        setFormOne(formOne => {
          return { ...formOne, email, password };
        });
        setCurrentStep(prevStep => prevStep + 1);
      }}
    >
      <FormikForm>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Field name="email" className="form-control" type="text" />
          <ErrorMessage name="email">{msg => <div className="danger">{msg}</div>}</ErrorMessage>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Field name="password" className="form-control" type="password" />
          <ErrorMessage name="password">{msg => <div className="danger">{msg}</div>}</ErrorMessage>
        </Form.Group>

        <Button variant="primary" className="mx-2" type="submit">
          Save & Next
        </Button>
      </FormikForm>
    </Formik>
  );
};

export default FormOne;
