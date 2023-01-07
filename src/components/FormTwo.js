import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const FormTwo = ({ formTwo: { firstName, lastName, address }, setFormTwo, setCurrentStep }) => {
  return (
    <Formik
      initialValues={{ firstName, lastName, address }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
          .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
        lastName: Yup.string().matches(
          /^[aA-zZ\s]+$/,
          'Only alphabets are allowed for this field ',
        ),
        address:Yup.string().min(10, 'Too Short!')
      })}
      onSubmit={({ firstName, lastName, address }) => {
        setFormTwo(formTwo => {
          return { ...formTwo, firstName, lastName, address };
        });
        setCurrentStep(prevStep => prevStep + 1);
      }}
    >
      {props => {
        return <FormikForm>
          <Form.Group className="mb-3">
            <Form.Label>FirstName</Form.Label>
            <Field name="firstName" className="form-control" type="text" />
            <ErrorMessage name="firstName">
              {msg => <div className="danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>LastName</Form.Label>
            <Field name="lastName" className="form-control" type="text" />
            <ErrorMessage name="password">
              {msg => <div className="danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address </Form.Label>
            <Field name="address" className="form-control" type="text" />
            <ErrorMessage name="address">{msg => <div className="danger">{msg}</div>}</ErrorMessage>
          </Form.Group>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => setCurrentStep(prevStep => prevStep - 1)}
            type="submit"
          >
            Back
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() =>
              setFormTwo(formTwo => {
                return { ...formTwo,firstName:props.values.firstName, lastName:props.values.lastName, address:props.values.address };
              })
            }
          >
            Save
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            type="submit"
          >
            Next
          </Button>
        </FormikForm>;
      }}
    </Formik>
  );
};

export default FormTwo;
