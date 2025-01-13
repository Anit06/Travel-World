import React, { useState, useEffect } from 'react';
import '../style/About.css';
import { Col, Container, Row } from 'reactstrap';

import img from '../assets/images/Mem7.png';
import img1 from '../assets/images/Mem8.png';
import img2 from '../assets/images/Mem9.png';


import { BiLogoGmail } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { RiWhatsappLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";


const Mem3 = () => {

    const [texts, setTexts] = useState(["Subhajit Raut", "CSE Student", "Content Writer"]); // Array of strings
    const [index, setIndex] = useState(0); // Index to cycle through the array

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % texts.length); // Increment index cyclically
        }, 4000); // Change text every 4 seconds

        return () => clearInterval(interval); // Clean up interval
    }, [texts]); // Re-run effect when texts array changes

    const progressBars = [
        { id: 1, startValue: 0, endValue: 65, speed: 120, circletext: 'HTML'},
        { id: 2, startValue: 0, endValue: 50, speed: 120, circletext: 'CSS' },
        { id: 3, startValue: 0, endValue: 15, speed: 120, circletext: 'JS' },
        { id: 4, startValue: 0, endValue: 20, speed: 120, circletext: 'Firebase' }
    ];

    const [progressValues, setProgressValues] = useState(progressBars.map(bar => bar.startValue));

    useEffect(() => {
        const intervals = progressBars.map((bar, index) => {
            return setInterval(() => {
                if (progressValues[index] < bar.endValue) {
                    setProgressValues(prevValues => {
                        const newValues = [...prevValues];
                        newValues[index] += 1;
                        return newValues;
                    });
                }
            }, bar.speed, bar.circletext);
        });

        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, [progressValues]);

  return (
    <section className='p-0'>
        <Container className='Member1'>
            <Row>
                <Col lg='8'>
                    <div className='About__Section1'>
                        <div className="About__container2">
                            <span className="About__text first-text text-dark">HI, I'm a</span>
                            <span className="About__text sec-text"> {texts[index]}</span>
                            <h3 className='text-dark'>Role : Content Writer</h3>
                            <p className='text-dark'>I am a student of Computer Science Engineering in College of Engineering and Management, Kolaghat. With the expertise of content writer, I am selecting the content aspect of tours and travel websites. My roll number is CSE/20/41, and my university roll is 10700120094.</p>
                        </div>
                    </div>
                    <div className='About__Section2'>
                        {progressBars.map((bar, index) => (
                            <div key={bar.id} className="About__container3 m-1">
                                <div className="About__circular-progress" style={{ background: `conic-gradient(#2a50e8 ${progressValues[index] * 3.6}deg, #ededed 0deg)` }}>
                                    <span className="About__progress-value">{`${progressValues[index]}%`}</span>
                                </div>
                                <span className="About__Circle-text">{bar.circletext}</span>
                            </div>
                        ))}
                    </div>
                            
                    <div className='About__Section3'>
                        <a href='mailto:cse20041@cemk.ac.in'><BiLogoGmail /></a>
                        <a href='tel:+91 7602926177'><FaPhone /></a>
                        <a href='https://wa.me/7602926177'><RiWhatsappLine /></a>
                        <a href=''><FaLinkedin /></a>
                    </div>

                </Col>

                <Col lg='4'>
                    <div className="About__card">
                        <div className="About__wrapper">
                            <img src={img} className="About__cover-image" alt="Cover" />
                        </div>
                        <img src={img2} className="About__title" alt="Title" />
                        <img src={img1} className="About__character" alt="Character" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Mem3