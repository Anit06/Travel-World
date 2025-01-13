import React from 'react'
import '../../style/ProductCard.css'
import {motion} from "framer-motion"
import { Col } from 'reactstrap'

import useGetData from '../../custom-hooks/useGetData'

import { FaPlus } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';

const ProductCard = ({item}) => {

    const { id: productId } = item;
    const {data: review} = useGetData('reviews', { productId })

    const dispatch = useDispatch()
    const tourReviews = review.filter((item) => item.tourId === productId);

    const totalRating = tourReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / tourReviews.length).toFixed(1);

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

  return (
    <Col lg='3' md='4' className='mb-2'>
        <div className='product__item'>
            <div className='product__img'>
                <motion.img whileHover={{scale: 0.9}} src={item.imgUrl} alt='' />
            </div>
            <div className='p-2 product__info'>
                <h3 className='product__name'>{item.productName}</h3>
                <h6 className='product__location'><IoLocationSharp />{item.location}</h6>
                <span className='text-center d-block'>Category: {item.category}</span>
            </div>
            <div className='px-3 d-flex justify-content-between'>
                <p className='num__reviews'>Reviews ({tourReviews.length})</p>
                <p className='num__rating'><span>{averageRating}</span> Ratings</p> 
            </div>
            <div className='product__card-bottom d-flex align-items-center justify-content-between p-2'>
                <span  className='price'>Rs. {item.price} /Per Person</span>
                <motion.span whileTap={{scale: 1.2}} onClick={addToCart}><i><FaPlus /></i></motion.span>
            </div>
            <button className='btn booking_btn'>
                <Link to={`/travel/${item.id}`}>
                    <motion.button whileHover={{scale: 1.2}} className=' booking__btn'>Book Now</motion.button>
                </Link>
            </button>
        </div>
    </Col>
  )
}

export default ProductCard