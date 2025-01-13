import React, { useState} from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../style/Cheakout.css'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable} from 'firebase/storage'
import { collection, addDoc} from 'firebase/firestore';

const Checkout = () => {

  const [enterName, setEnterName] = useState('');
  const [enterPhone, setEnterPhone] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [enterAdress, setEnterAdress] = useState('');
  const [enterCity, setEnterCity] = useState('');
  const [enterPostalCode, setEnterPostalCode] = useState('');
  const [enterState, setEnterState] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const userdetails = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const docRef = await collection(db, 'userdetails');

    // Assuming enterProductImg is declared and holds the selected file
    const storageRef = ref(storage, `path/to/storage/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, enterEmail);

    uploadTask.on('state_changed', null, (error) => {
      console.error(`Error uploading image: ${error.message}`);
      setLoading(false);
    }, async () => {
      try {
        await addDoc(docRef, {
          name: enterName,
          phone: enterPhone,
          email: enterEmail,
          address: enterAdress,
          city: enterCity,
          postalcode: enterPostalCode,
          state: enterState,
        });

        console.log('Successfully Join PremimumMembership!');
        toast.success('Successfully Join PremimumMembership!');
        setLoading(false);
        navigate('/cart');
      } catch (error) {
        console.error(error);
        console.error('Error getting download URL.');
        setLoading(false);
      }
    });
  } catch (err) {
    console.error(err);
    console.error('Not join!');
    setLoading(false);
  }
};

  


  const PremimumMembership = 2499
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const discount = Number(totalAmount) * 0.17
  const premimumAmount = Number(totalAmount) - Number(discount)
  const formattedPremimumAmount = premimumAmount.toFixed(0);

  return (
    <Helmet title="Chekout">
      <CommonSection title="Checkout"/>
        <section>
          <Container>
            <Row>
              <Col lg='8'>
                {loading ? <h4 className='py-5'>Loading.....</h4> :<>
                <h6 className='mb-4 fw-bold'>User Information</h6>
                <Form className='billing__form' onSubmit={userdetails}>
                  <FormGroup className='form__group'>
                    <input type='text' placeholder='Enter your name'                 
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='email' placeholder='Enter your email' 
                    value={enterEmail}
                    onChange={(e) => setEnterEmail(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='number' placeholder='Phone number'                 
                    value={enterPhone}
                    onChange={(e) => setEnterPhone(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='text' placeholder='Address'                 
                    value={enterAdress}
                    onChange={(e) => setEnterAdress(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='text' placeholder='City' 
                    value={enterCity}
                    onChange={(e) => setEnterCity(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='number' placeholder='Postal code'                 
                    value={enterPostalCode}
                    onChange={(e) => setEnterPostalCode(e.target.value)}
                    required/>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type='text' placeholder='State' 
                    value={enterState}
                    onChange={(e) => setEnterState(e.target.value)}
                    required/>
                  </FormGroup>
                  <button className='booking__btn mb-2 w-100'>Submit</button>
                </Form>
                </>
                }
                </Col>

                <Col lg='4'>
                  <div className='checkout__cart'>
                    <h6>Tour Booking: <span>{totalQty} </span></h6>
                    <h6>Subtotal: <span>Rs. {totalAmount}</span></h6>
                    <h6>
                      <span>Premimum Membership: <br/>17% discount any Tour</span>
                      <span>Rs. {PremimumMembership} /year</span>
                    </h6>
                    <h4>Total Cost: <span>Rs. {formattedPremimumAmount}</span></h4>
                    <button className='buy__btn auth__btn w-100'>Join Our Premimum Membership</button>
                  </div>
                </Col>
              </Row>

          </Container>
        </section>
    </Helmet>
  )
}

export default Checkout