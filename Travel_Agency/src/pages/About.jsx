import React from 'react';
import '../style/About.css';

import Member1 from '../pages/Mem1'
import Member2 from '../pages/Mem2'
import Member3 from '../pages/Mem3'


const About = () => {

    return (
        <div className='About'>
            <h3 className='text-center About__heading'>Our Project Members</h3>
            <section className='About__Container1'>
                <Member1/>
                <Member2/>
                <Member3/>

            </section>
        </div>
    );
}

export default About;
