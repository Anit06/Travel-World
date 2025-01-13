import React, { useState, useEffect} from 'react';
import Helmet from '../components/helmet/Helmet';
import '../style/Home.css'

import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

import worldImg from "../assets/images/world.png"
import heroImg1 from "../assets/images/heroImg1.jpg"
import hero_video from "../assets/images/hero-video.mp4"
import heroImg2 from "../assets/images/heroImg2.jpg"
import counterImg1 from "../assets/images/Travel-img1.jpg"
import counterImg2 from "../assets/images/Travel-img3.jpg"
import experienceImg from "../assets/images/experience.jpg"

import Services from '../services/Services';
import ProductList from '../components/UI/ProductList';
import Clock from '../components/UI/Clock';
import NewsLetter from '../shared/Newsletter';
import Slide from '../slide/Slide';

import useGetData from '../custom-hooks/useGetData';

import { FaPlus } from "react-icons/fa";


const Home = () => {

  const {data: products, loading} = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setwirelessProducts] = useState([]);
  const [popularProducts, setpopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingTours = products.filter(
      (item) => item.type === "Trending Tours"
    );

    const filteredBestTours = products.filter(
      (item) => item.type === "Best Tours"
    );

    const filteredLimitedOffers = products.filter(
      (item) => item.type === "Limited Offers"
    );

    const filteredNewArrivalTours = products.filter(
      (item) => item.type === "New Arrival Tours"
    );

    const filteredPopularinCategory = products.filter(
      (item) => item.type === "Popular in Category"
    );

    setTrendingProducts(filteredTrendingTours);
    setBestSalesProducts(filteredBestTours);
    setMobileProducts(filteredLimitedOffers);
    setwirelessProducts(filteredNewArrivalTours);
    setpopularProducts(filteredPopularinCategory);
  }, [products])

  return (
    <Helmet title={"Home"}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <div className="hero_subtitle d-flex align-items-center">
                  <h2>Know Before You Go {year}</h2>
                  <img src={worldImg} alt="" />
                </div>
                  <h3>Traveling opens the door to creating <span> memories</span></h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam ipsum nobis asperiores soluta voluptas quas voluptates.
                  Molestiae tempora dignissimos, animi praesentium molestias perferendis porro expedita delectus. Soluta natus porro.
                </p>
                <motion.button whileTap={{scale: 1.2}} className='buy__btn'><Link to='/travel'>Visit Now</Link></motion.button>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero_img-box">
                <img src={heroImg1} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero_img-box hero__video-box mt-4">
                <video src={hero_video} alt="" controls />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero_img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
          </Row>
        </Container>

        <div>
          <h2 className='section__title text-center pt-5'>Our Tours Gallery</h2>
          <Slide/>
        </div>
      </section>

      <Services/>
      
      <section>
        <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Trending Tours</h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductList data={trendingProducts} />
            }  
          </Row>
        </Container>
      </section>

      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Best Tours</h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductList data={bestSalesProducts} />
            } 
          </Row>
        </Container>
      </section>

      <section className='timer__count'>
        <Container>
          <Row>
            <Col lg="6" md='12' className='count__down-col'>
              <div className='clock__top-content'>
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-5 mb-3'>Buy One Get One Free Offers</h3>
              </div>
              <Clock/>

              <motion.button whileTap={{scale: 1.2}} className='buy__btn store__btn'>
                <Link to="/travel">Visit Tours</Link>
              </motion.button>
            </Col>

            <Col lg="6" md='12' className="text-end counter__img">
              <div className='limited__offer'>
                <img src={counterImg1} alt='' />
                <FaPlus className='text-white' />
                <img src={counterImg2} alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <div className="experience_content">
                <h2>Experience</h2>
                <h3>With our all experience <br /> we will serve you</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <br /> Quas aliquam, hic tempora inventore suscipit unde. </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12k+</span>
                  <h6>Successful trip</h6>
                </div>
                <div className="counter_box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter_box">
                  <span>15</span>
                  <h6>Year experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className="experience_img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='new__arrivals'>
        <Container>
          <Row>
            <Col lg="12" className='text-center mb-5'>
              <h2 className='section__title'>New Arrival Tours</h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductList data={mobileProducts} />
            } 
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductList data={wirelessProducts} />
            } 
          </Row>
        </Container>
      </section>

      <section className='popular__category'>
        <Container>
          <Row>
            <Col lg="12" className='text-center mb-5'>
              <h2 className='section__title'>Popular in Category</h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductList data={popularProducts} />
            } 
          </Row>
        </Container>
      </section>

      <section className='p-0 m-0'>
        <NewsLetter/>
      </section>

    </Helmet>
  );
}

export default Home;
