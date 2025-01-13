import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../style/Payment.css';

import Card1 from '../assets/images/Card1.png';
import Card2 from '../assets/images/Card2.png';
import Card3 from '../assets/images/Card3.png';
import Card4 from '../assets/images/Card4.png';

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    nameOnCard: '',
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardImage, setSelectedCardImage] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCardSelection = (card, cardImage) => {
    setSelectedCard(card);
    setSelectedCardImage(cardImage);
  };
  

  const open = () => {
    const isValid = validateForm();
    if (isValid) {
      if (selectedCard) {
        enableScrolling();
        navigate("/bookingTour", { selectedCard, selectedCardImage, formData });
      } else {
        alert("Please select your card.");
      }
    } else {
      alert("Please fill all required fields.");
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === '' && key !== 'selectedCardImage') {
        return false;
      }
    }
    return true;
  };

  const enableScrolling = () => {
    document.body.style.overflow = ''; // Set overflow to default value
  };

  // Update form validity whenever form data changes
  useEffect(() => {
    setFormValid(validateForm());
  }, [formData]);

  return (
    <Container className='Payment'>
      <Form>
        <Row>
          <Col>
            <h3 className="Payment__title">Billing address</h3>
            <FormGroup>
              <Label for="fullName">Full Name :</Label>
              <Input type="text" id="fullName" placeholder="john deo" onChange={handleInputChange} required/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email :</Label>
              <Input type="email" id="email" placeholder="example@example.com" onChange={handleInputChange} required/>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address :</Label>
              <Input type="text" id="address" placeholder="room - street - locality" onChange={handleInputChange} required/>
            </FormGroup>
            <FormGroup>
              <Label for="city">City :</Label>
              <Input type="text" id="city" placeholder="mumbai" onChange={handleInputChange} required/>
            </FormGroup>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="state">State :</Label>
                  <Input type="text" id="state" placeholder="india" onChange={handleInputChange} required/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="zipCode">Zip Code :</Label>
                  <Input type="text" id="zipCode" placeholder="123 456" onChange={handleInputChange} required/>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col>
            <h3 className="Payment__title">Payment</h3>
            <FormGroup>
              <Label>Cards Accepted :</Label>
              <div className='Payment__Card-Image'>
                <img
                  src={Card1}
                  alt="Cards Accepted"
                  onClick={() => handleCardSelection('Card1', Card1)}
                  className={selectedCard === 'Card1' ? 'selected' : ''}
                />
                <img
                  src={Card2}
                  alt="Cards Accepted"
                  onClick={() => handleCardSelection('Card2', Card2)}
                  className={selectedCard === 'Card2' ? 'selected' : ''}
                />
                <img
                  src={Card3}
                  alt="Cards Accepted"
                  onClick={() => handleCardSelection('Card3', Card3)}
                  className={selectedCard === 'Card3' ? 'selected' : ''}
                />
                <img
                  src={Card4}
                  alt="Cards Accepted"
                  onClick={() => handleCardSelection('Card4', Card4)}
                  className={selectedCard === 'Card4' ? 'selected' : ''}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="nameOnCard">Name on Card :</Label>
              <Input type="text" id="nameOnCard" placeholder="mr. john deo" onChange={handleInputChange} required/>
            </FormGroup>
            <FormGroup>
              <Label for="creditCardNumber">Credit Card Number :</Label>
              <Input type="number" id="creditCardNumber" placeholder="1111-2222-3333-4444" onChange={handleInputChange} required/>
            </FormGroup>
            <FormGroup>
              <Label for="expMonth">Exp Month :</Label>
              <Input type="text" id="expMonth" placeholder="january" onChange={handleInputChange} required/>
            </FormGroup>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="expYear">Exp Year :</Label>
                  <Input type="number" id="expYear" placeholder="2022" onChange={handleInputChange} required/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="cvv">CVV :</Label>
                  <Input type="text" id="cvv" placeholder="1234" onChange={handleInputChange} required/>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button color="primary" className="submit-btn" onClick={open}>Payment</Button>
      </Form>
    </Container>
  );
}

export default Payment;
