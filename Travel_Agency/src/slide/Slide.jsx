import React from 'react'
import Slider from './Slider'

import photo1 from '../assets/images/photo1.jpg'
import photo2 from '../assets/images/photo2.jpg'
import photo3 from '../assets/images/photo3.jpg'
import photo4 from '../assets/images/photo4.jpg'
import photo5 from '../assets/images/photo5.jpg'
import photo6 from '../assets/images/photo6.jpg'
import photo7 from '../assets/images/photo7.jpg'
import photo8 from '../assets/images/photo8.jpg'
import photo9 from '../assets/images/photo9.jpg'
import photo10 from '../assets/images/photo10.jpg'
import photo11 from '../assets/images/photo11.jpg'
import photo12 from '../assets/images/photo12.jpg'
import photo13 from '../assets/images/photo13.jpg'
import photo14 from '../assets/images/photo14.jpg'
import photo15 from '../assets/images/photo15.jpg'
import photo16 from '../assets/images/photo16.jpg'
import photo17 from '../assets/images/photo17.jpg'
import photo18 from '../assets/images/photo18.jpg'
import photo19 from '../assets/images/photo19.jpg'
import photo20 from '../assets/images/photo20.jpg'


const slides = [
    { image: photo1, caption: 'Slide 1' },
    { image: photo2, caption: 'Slide 2' },
    { image: photo3, caption: 'Slide 3' },
    { image: photo4, caption: 'Slide 4' },
    { image: photo5, caption: 'Slide 5' },
    { image: photo6, caption: 'Slide 6' },
    { image: photo7, caption: 'Slide 7' },
    { image: photo8, caption: 'Slide 8' },
    { image: photo9, caption: 'Slide 9' },
    { image: photo10, caption: 'Slide 10' },
    { image: photo11, caption: 'Slide 11' },
    { image: photo12, caption: 'Slide 12' },
    { image: photo13, caption: 'Slide 13' },
    { image: photo14, caption: 'Slide 14' },
    { image: photo15, caption: 'Slide 15' },
    { image: photo16, caption: 'Slide 16' },
    { image: photo17, caption: 'Slide 17' },
    { image: photo18, caption: 'Slide 18' },
    { image: photo19, caption: 'Slide 19' },
    { image: photo20, caption: 'Slide 20' },
  ];

const Slide = () => {
  return (
    <div className='container'>
        <Slider slides={slides} />
    </div>
  )
}

export default Slide