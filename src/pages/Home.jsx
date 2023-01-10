import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import FormOne from '../components/FormOne';
import FormThree from '../components/FormThree';
import FormTwo from '../components/FormTwo';
import './Home.css';
import { Stepper } from 'react-form-stepper';

const Home = () => {
  const [formOne, setFormOne] = useState({ email: '', password: '' });
  const [formTwo, setFormTwo] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });
  const [formThree, setFormThree] = useState({
    countryCode: '',
    phoneNumber: '',
    acceptTermsAndCondition: false,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(formThree);
    fetch('https://codebuddy.review/submit', {
      method: 'POST',
      body: JSON.stringify({
        'emailId': formOne?.email,
        'password': formOne?.password,
        'firstName': formTwo?.firstName,
        'lastName': formTwo?.lastName,
        'address': formTwo?.address,
        'countryCode': formThree?.countryCode,
        'phoneNumber': formThree?.phoneNumber,
      }),
    })
      .then(res => {
        if (res.status == 200) navigate('/posts');
      })
      .catch(err => {
        alert('Something went wrong');
        console.log(err);
      });
  };

  return (
    <main>
      <Container className="my-auto ">
        <Stepper
          steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
          activeStep={currentStep}
        />
        <Row>
          <Col xs={6} className="mx-auto">
            {currentStep == 0 && (
              <FormOne formOne={formOne} setFormOne={setFormOne} setCurrentStep={setCurrentStep} />
            )}
            {currentStep == 1 && (
              <FormTwo formTwo={formTwo} setFormTwo={setFormTwo} setCurrentStep={setCurrentStep} />
            )}
            {currentStep == 2 && (
              <FormThree
                formThree={formThree}
                setFormThree={setFormThree}
                setCurrentStep={setCurrentStep}
                handleSubmit={handleSubmit}
              />
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
