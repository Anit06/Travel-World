import React, { useState, useEffect } from 'react';
import Payment from '../pages/Payment';
import { useParams } from 'react-router-dom'
import './Booking.css'

import { Container, Form, FormGroup, ListGroup, ListGroupItem} from "reactstrap";

import { db, storage } from '../firebase.config';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import useGetData from '../custom-hooks/useGetData'
import {motion} from "framer-motion"

import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

import { FaPlus } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";

const Booking = ({item}) => {

  const [enterName, setEnterName] = useState('');
  const [enterPhone, setEnterPhone] = useState('');
  const [enterStartDate, setEnterStartDate] = useState('');
  const [enterEndDate, setEnterEndDate] = useState('');
  const [enterGuestSize, setEnterGuestSize] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch()
  const {data: review} = useGetData('reviews')

  const tourReviews = review.filter((item) => item.tourId === id);

  const totalRating = tourReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / tourReviews.length).toFixed(1);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, 'booking');

      // Assuming enterProductImg is declared and holds the selected file
      const storageRef = ref(storage, `bookingImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on('state_changed', null, (error) => {
          console.error(`Error uploading image: ${error.message}`);
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await addDoc(docRef, {
              productName: product.productName,
              location: product.location,
              price: product.price,
              category: product.category,
              name: enterName,
              phone: enterPhone,
              startDate: enterStartDate,
              endDate: enterEndDate,
              guestSize: enterGuestSize,
              amount: calculatePrice,
              serviceFee: serviceFee,
              totalAmount: totalAmount,
              imgUrl: downloadURL,
            });

            console.log('Product successfully added!');
            setLoading(false);
          } catch (error) {
            console.error(error);
            console.error('Error getting download URL.');
            setLoading(false);
          }
        }
      );
    } catch (err) {
      console.error(err);
      console.error('Tour not Booking!');
      setLoading(false);
    }
  };

    
  const docRef = doc(db, 'products', id);

  useEffect(() => {
   const getProduct = async () => {
      try {
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('no product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, [docRef]);

  const {location, price, category /* avgRating, */, reviews } = product;



 const [booking, setBooking] = useState({
  guestSize: enterGuestSize || 1,
  });

  const serviceFee = 799
  const calculatePrice = Number(booking.guestSize) * Number(price) 
  const totalAmount = Number(calculatePrice ) + Number(serviceFee)

  const addToCart = () =>{
    dispatch(cartActions.addItem({
        id:item.id,
        productName:item.productName,
        location:item.location,
        price: item.price,
        imgUrl: item.imgUrl,
    })
    )
    toast.success('Product added successfully')
}


const [isOpen, setIsOpen] = useState(false);

const openModal = () => {
  // Check if all required fields are filled
  if (enterName && enterPhone && enterStartDate && enterEndDate && enterGuestSize && enterProductImg) {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
  } else {
    // Notify user to fill all required fields
    alert('Please fill all required fields.');
  }
};

const closeModal = () => {
  setIsOpen(false);
  document.body.style.overflow = ''; // Enable scrolling
};

  return (
  <div className="booking">

  {loading ? <h4 className='py-5'>Loading.....</h4> :<>

  <div className="booking_top d-flex align-items-center justify-content-between">
    {product && (
      <div className="product__details">
        <h2>{product.productName}</h2>
        <div className="product__rating d-flex align-items-center gap-5 mb-3">
          <div>
            <span><i><IoStar /></i></span>
            <span><i><IoStar /></i></span>
            <span><i><IoStar /></i></span>
            <span><i><IoStar /></i></span>
            <span><i><IoStarHalf /></i></span>
            <p><span className='num__rating'>{averageRating}</span> Ratings</p>
          </div>
          <div>
            <span>Reviews ({tourReviews.length})</span> 
          </div>
        </div>
        <div className="product__rating d-flex align-items-center gap-5 mb-3">
          <span><IoLocationSharp /> {location}</span>
          <motion.span className='add__cart' whileTap={{scale: 1.2}} onClick={addToCart}><i><FaPlus /></i></motion.span>
        </div>
        <p>{/* <span className='num__rating'>{product.avgRating}</span>Ratings */}</p>
        <div className='d-flex align-items-center gap-5'>
          <span className='product__price'>Rs. {price}</span>
          <span>Category: {category}</span>
        </div>         
      </div>
    )}
  </div>

        <div className="booking_form">
          <h5 className='text-dark fw-bold'>Information</h5>
          <Form onSubmit={addProduct}>
            <FormGroup>
            <p className='text-dark fw-bold'>Full Name</p>
              <input
                className='border border-dark'
                type="text"
                placeholder="Full Name"
                id="fullName"
                value={enterName}
                onChange={(e) => setEnterName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
            <p className='text-dark fw-bold'>Phone No.</p>
              <input
                className='border border-dark'
                type="tel"
                placeholder="Phone"
                id="phone"
                value={enterPhone}
                onChange={(e) => setEnterPhone(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
            <p className='text-dark fw-bold'>Starting Date</p>
              <input
                className='border border-dark'
                type="date"
                placeholder="Book At"
                id="bookAt"
                value={enterStartDate}
                onChange={(e) => setEnterStartDate(e.target.value)}
                required
              />
            <p className='text-dark fw-bold'>Ending Date</p>
              <input
                className='border border-dark'
                type="date"
                placeholder="Book At"
                id="bookAt"
                value={enterEndDate}
                onChange={(e) => setEnterEndDate(e.target.value)}
                required
              />
            <p className='text-dark fw-bold'>Guest Size</p>
              <input
                className='border border-dark'
                type="number"
                placeholder="Guest"
                id="guestSize"
                value={enterGuestSize}
                onChange={(e) => {
                  setEnterGuestSize(e.target.value);
                  setBooking((prevBooking) => ({ ...prevBooking, guestSize: e.target.value }));
                }}
                required
              />
            </FormGroup>

            <div>
              <FormGroup  className="d-flex gap-3">
                <p className='text-dark fw-bold'>Identity Proof</p>
                  <input
                    type='file'
                      onChange={(e) => setEnterProductImg(e.target.files[0])}
                      required
                  />
              </FormGroup>
            </div>

            <div className="booking_bottom">
              <ListGroup>
                <ListGroupItem className="border-0 px-0">
                  <h5 className="d-flex align-items-center gap-1">
                    <i className="BiRupee"><BiRupee /></i>
                    {price}
                    <i><RiCloseFill />Per Person</i>
                  </h5>
                  <span>
                    <i className="BiRupee"><BiRupee /></i>
                    {calculatePrice}
                  </span>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0">
                  <h5>Service Charge</h5>
                  <span>
                    <i className="BiRupee"><BiRupee /></i>
                    {serviceFee}
                  </span>
                </ListGroupItem>
                <ListGroupItem className="total border-0 px-0">
                  <h5>Total</h5>
                  <span>
                    <i className="BiRupee">
                      <BiRupee />
                    </i>
                    {totalAmount}
                  </span>
                </ListGroupItem>
              </ListGroup>

              <button className="w-100 mt-4" onClick={openModal}>Booking Now</button>

              {isOpen && (
                <div className="modal">
                <Container className="modal-content">
              
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>

                  <div>
                    <Payment />
                  </div>
                  
                </Container>
                </div>
              )}
            </div>
          </Form>
        </div>

        </>
              }
  </div>
  )
}

export default Booking


