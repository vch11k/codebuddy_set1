import React from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const FormThree = ({
  formThree: { countryCode, phoneNumber, acceptTermsAndCondition },
  setFormThree,
  setCurrentStep,
  handleSubmit,
}) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSelect = eventKey => {
    console.log(eventKey);
  };
  return (
    <Formik
      initialValues={{ countryCode, phoneNumber, acceptTermsAndCondition }}
      validationSchema={Yup.object({
        countryCode: Yup.string().required('Country code is required'),
        phoneNumber: Yup.string()
          .required('Phone number is required')
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, 'Too short')
          .max(10, 'Too long'),
        acceptTermsAndCondition: Yup.boolean().oneOf(
          [true],
          'You must accept the terms and conditions',
        ),
      })}
      onSubmit={({ countryCode, phoneNumber, acceptTermsAndCondition }) => {
        setFormThree(formThree => {
          return {
            ...formThree,
            countryCode,
            phoneNumber,
            acceptTermsAndCondition,
          };
        });
        handleSubmit();
      }}
    >
      {props => (
        <FormikForm>
          <div className="mb-3">
            <Form.Label>CountryCode:</Form.Label>
            <Field name="countryCode" as="select" className="w-100  fromThree_dropdown">
              <option value="">Select country code</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </Field>
            <ErrorMessage name="countryCode">
              {msg => <div className="danger">{msg}</div>}
            </ErrorMessage>
          </div>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PhoneNumber</Form.Label>
            <Field name="phoneNumber" className="form-control" type="text" />
            <ErrorMessage name="phoneNumber">
              {msg => <div className="danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3 ">
            <label>
              <Field type="checkbox" name="acceptTermsAndCondition" />
              <span className="mx-2">AcceptTermsAndCondition</span>
            </label>
            <ErrorMessage name="acceptTermsAndCondition">
              {msg => <div className="danger">{msg}</div>}
            </ErrorMessage>
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
              setFormThree(formThree => {
                return {
                  ...formThree,
                  countryCode: props.values.countryCode,
                  phoneNumber: props.values.phoneNumber,
                  acceptTermsAndCondition: props.values.acceptTermsAndCondition,
                };
              })
            }
          >
            Save
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              setFormThree(formThree => {
                return {
                  ...formThree,
                  countryCode: props.values.countryCode,
                  phoneNumber: props.values.phoneNumber,
                  acceptTermsAndCondition: props.values.acceptTermsAndCondition,
                };
              })
            }
            className="mx-2"
            type="submit"
          >
            Next
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default FormThree;
