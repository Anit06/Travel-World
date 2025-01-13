import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import { toast } from 'react-toastify'

import NewsLetter from '../shared/Newsletter';
import { Link } from 'react-router-dom'

import { GiConfirmed } from "react-icons/gi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const BookingTour = () => {
  const {data:productsData, loading} = useGetData('booking')

  const deleteProduct = async(id) =>{
    await deleteDoc(doc(db, 'booking', id))
    toast.success('Deleted!')
  }
  return (
    <section className='pb-0'>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th className="align-top">Title</th>
                  <th className="align-top">Location</th>
                  <th className="align-top">Price</th>
                  <th className="align-top">Image</th>
                  <th className="align-top">Name</th>
                  <th className="align-top">StartDate</th>
                  <th className="align-top">EndDate</th>
                  <th className="align-top">GuestSize</th>
                  <th className="align-top">Service Fee</th>
                  <th className="align-top">Total Amount</th>
                  <th className="align-top">Booking Status</th> 
                  <th className="align-top">Action</th>  
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <h4 className='py-5 text-center fw-bold'>loading.....</h4> : productsData.map(item =>(
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.location}</td>
                      <td>{item.price}</td>
                      <td><img src={item.imgUrl} alt='' /></td>
                      <td>{item.name}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.guestSize}</td>
                      <td>{item.serviceFee}</td>                 
                      <td>{item.totalAmount}</td>
                      <td>
                      {item.status === 'Confirmed' ? (
                          <button className='btn btn-primary'>
                            <Link to='/confirmed'>
                              <GiConfirmed />Confirm
                            </Link>
                          </button>
                        ) : item.status === 'Cancelled' ? (
                          <button className='btn btn-secondary'>
                            <Link to='/cancelled'>
                              <MdCancel /> Cancel
                            </Link>
                          </button>
                        ) : (
                          <button className='btn btn-warning'>
                            <Link to='/pending'>
                              <FaClockRotateLeft />Pending
                            </Link>
                          </button>
                        )}
                      </td>
                      <td><button onClick={() =>{deleteProduct(item.id)}} className='btn btn-danger'>Delete</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
      <section className='p-0 m-0'>
        <NewsLetter/>
      </section>
    </section>
  )
}

export default BookingTour