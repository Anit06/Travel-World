import React, { useState, useRef } from 'react'

import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { db } from '../firebase.config'
import { collection, addDoc} from 'firebase/firestore';
import { IoMdStar } from "react-icons/io";

const Review = ({ tourId: propTourId }) => {
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const [ rating, setRating ] = useState(null)
  const [isRatingSelected, setIsRatingSelected] = useState(true);
  const {id} = useParams()

 

  const submitHandler = async (e) => {
    e.preventDefault();

    if (rating === null) {
      setIsRatingSelected(false);
      return;
    }
    
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
  
    try {
      const reviewRef = await collection(db, 'reviews');


      if (propTourId === id) {
        await addDoc(reviewRef, {
          tourId: propTourId,
          userName: reviewUserName,
          text: reviewUserMsg,
          rating,
        });
    
      console.log('Review submitted');
      toast.success('Review submitted');

    } else {
      console.error('Invalid tour ID for the review');
      toast.error('Error submitting review. Invalid tour ID.');
    }
  
    } catch (error) {
      console.error(error);
      console.error('Error submitting review');
    }
  };
  
  return (
    <>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='review__form'>
                 <h4>Leave your experience</h4>
                  <form action='' onSubmit={submitHandler}>
                      <div className='form__group'>
                        <input type='text' placeholder='Enter name' ref={reviewUser} required />
                      </div>

                      <div className='form__group d-flex align-items-center gap-5 rating__group'>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => {
                            setRating(1);
                            setIsRatingSelected(true);
                          }}
                        >
                          1<IoMdStar />
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => {
                            setRating(2);
                            setIsRatingSelected(true);
                          }}
                        >
                          2<IoMdStar />
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => {
                            setRating(3);
                            setIsRatingSelected(true);
                          }}
                        >
                          3<IoMdStar />
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => {
                            setRating(4);
                            setIsRatingSelected(true);
                          }}
                        >
                          4<IoMdStar />
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => {
                            setRating(5);
                            setIsRatingSelected(true);
                          }}
                        >
                          5<IoMdStar />
                        </motion.span>
                      </div>
                      {!isRatingSelected && <p style={{ color: 'red' }}>Please select a rating</p>}

                      <div className='form__group'>
                        <textarea ref={reviewMsg} rows={4} type='text' placeholder='Review Messages...' required/>
                      </div>
                        <motion.button whileTap={{scale: 1.2}} type='submit' className='buy__btn'>Submit</motion.button>
                    </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Review