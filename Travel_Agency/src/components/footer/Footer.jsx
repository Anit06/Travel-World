import React from 'react'
import "./Footer.css"
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4' className='mb-4' md='6'>
            <div className='logo'>
              <div>
                <h1 className='text-white'>Travel World</h1>
              </div>
            </div>
            <p className='footer__text mt-4'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Ullam ipsum nobis asperiores soluta voluptas quas voluptates.
              Molestiae tempora dignissimos, animi praesentium molestias 
              perferendis porro expedita delectus. Soluta natus porro.
            </p>
          </Col>

          <Col lg='3' className='mb-4' md='3'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Top Category</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to=''></Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to=''></Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to=''></Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to=''></Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='2' className='mb-4' md='3'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Useful Links</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/travel'>Travel</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/booking'>Booking</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to=''>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3' md='4'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Contact</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i><IoLocationSharp /></i></span>
                  <p>721134 Kolaghat, west Bengal, India</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i><FaPhoneAlt /></i></span>
                  <p>+91 9434941874</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i><IoMdMail /></i></span>
                  <p>anitsamanta2002@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='12'>
            <p className='footer__copyright'>Copyright {year} developed by . All rights reserved.</p>
          </Col>
        </Row>
      </Container>

    </footer>
  )
}

export default Footer