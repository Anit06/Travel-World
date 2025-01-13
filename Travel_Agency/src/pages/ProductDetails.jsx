import React, { useState, useEffect } from 'react'
import '../style/ProductDetails.css'
import Booking from '../Booking/Booking'

import { useParams } from 'react-router-dom'
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import ProductsList from '../components/UI/ProductList'
import Review from '../review/Review'

import { db } from '../firebase.config'
import {doc, getDoc} from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'




const ProductDetails = () => {

  const {data: products} = useGetData('products')
  const {data: review} = useGetData('reviews')

  const [product, setProduct] = useState({});
  const [ tab, setTab ] = useState('desc')

  const {id} = useParams()

  const docRef = doc(db, 'products' , id)

  useEffect(() =>{
    const getProduct = async() =>{
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        setProduct(docSnap.data())
      } else{
        console.log('no product!')
      }
    }

    getProduct()
  }, [])

  const { 
    imgUrl, 
    productName, 
    price, 
    avgRating, 
    description, 
    category 
  } = product
 
  const relatedProducts = products.filter(item => item.category === category)
  const tourReviews = review.filter((item) => item.tourId === id);


  useEffect(() => {
    window.scrollTo(0,0)
  }, [product])

  return (
    <Helmet title={productName}>
      <CommonSection title={productName}/>
      
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt='' />
            </Col>

            <Col lg="6">
            <Booking item={product} />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
          <Col lg='12'>
              <div className='tab__wrapper d-flex align-items-center gap-5'>
                <h6 className={`${tab === 'desc' ? 'active__tab' : "" }`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : "" }`} onClick={() => setTab('rev')}>Reviews ({tourReviews.length})</h6>
              </div>

              {
                tab === 'desc' ? (
                  <div className='tab__content mt-5'>
                    <p>{description}</p>
                  </div> 
                ) : (
                  <div className='product__review mt-5'>
                    <div className='review__wrapper'>
                      <Review tourId={id}/>
                      <ul>
                        { tourReviews.map((item, index) => (
                          <li key={index} className='mb-4'>
                            <h6>{item.userName}</h6>
                            <span>{item.rating} (rating)</span>
                            <p>{item.text}</p>
                          </li>
                        )) }
                      </ul>
                    </div>
                  </div>
                )}
            </Col>

            <Col lg='12' className='mt-5'>
              <h2 className='related__title'>You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails