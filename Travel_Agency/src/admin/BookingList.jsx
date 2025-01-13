import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { db } from '../firebase.config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { toast } from 'react-toastify';
import useAuth from '../custom-hooks/useAuth'; // Adjust the path as per your project structure

import NewsLetter from '../shared/Newsletter';

const BookingList = () => {
  const { data: productsData, loading } = useGetData('booking');
  const { currentUser } = useAuth(); // Access currentUser from useAuth hook

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'booking', id), { status });
      toast.success('Status Updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'booking', id));
      toast.success('Deleted!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

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
                        <button
                          onClick={() => updateStatus(item.id, 'Confirmed')}
                          className='btn btn-primary mb-2'
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(item.id, 'Cancelled')}
                          className='btn btn-secondary'
                        >
                          Cancel
                        </button>
                        {item.status === 'Confirmed' ? (
                          <span className='fw-bold text-primary'>{item.status}</span>
                        ) : (
                          <span className='fw-bold text-danger'>{item.status}</span>
                        )}
                      </td>

                      <td><button onClick={() =>{deleteProduct(item.id)}} disabled={currentUser.email !== 'anitsamanta2002@gmail.com'}  className='btn btn-danger'>Delete</button></td>
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

export default BookingList;
