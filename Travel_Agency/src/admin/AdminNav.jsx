import React, {useRef, useEffect, useState} from 'react'
import '../style/admin-nav.css'
import { Container, Row } from 'reactstrap'

import {motion} from "framer-motion"

import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

const admin__nav = [
  {
    display: 'Dashboard',
    path: '/dashboard',
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products',
  },
  {
    display: 'Add-Products',
    path: '/dashboard/add-products',
  },
  {
    display: 'Booking-List',
    path: '/dashboard/booking-list',
  },
  {
    display: 'Users',
    path: '/dashboard/users',
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const profileActionRef = useRef(null);

  const logout = () =>{
    signOut(auth).then(() =>{
      toast.success('Logged out')
      navigate('/home');
    }).catch(err =>{
      toast.error(err.message);
    })
  }

  const toggleProfileActions = (event) => {
    const profileActions = profileActionRef.current;
  
    // Stop event propagation if the user clicked on the user icon image
    if (event.target === profileActionRef.current) {
      event.stopPropagation();
    }
    
    // Toggle the display of profile actions
    if (profileActions && (profileActions.style.display === 'none' || !profileActions.style.display)) {
      profileActions.style.display = 'block';
    } else if (profileActions) {
      profileActions.style.display = 'none';
    }
  };
  
  
  

  return (
    <>
      <header className='admin__header'>
        <div className='admin__nav-top'>
          <Container>
            <div className='admin__nav-wrapper-top'>
              <div className='logo'>
                <h2>Travel World</h2>
              </div>

              <div className='search__box'>
                <input type='text' placeholder='Search.....' />
                <span>
                  <i>
                    <IoSearch />
                  </i>
                </span>
              </div>
              <div className='admin__nav-top-right'>
                <span>
                  <i>
                    <IoIosNotifications />
                  </i>
                </span>
                <span>
                  <i>
                    <IoMdSettings />
                  </i>
                </span>
                <div className='profile'>
                  <motion.img whileTap={{ scale: 1.1}} src={currentUser && currentUser.photoURL} alt='' onClick={toggleProfileActions}/>
                  <div className='profile__actions' ref={profileActionRef} onClick={toggleProfileActions}>
                    {currentUser && (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Link to='/'>Home</Link>
                        <span onClick={logout}>Logout</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className='admin__menu p-0'>
        <Container>
          <Row>
            <div className='admin__navigation'>
              <ul className='admin__menu-list'>
                {admin__nav.map((item, index) => (
                  <li className='admin__menu-item' key={index}>
                    <NavLink
                      to={item.path}
                      activeClassName='active__admin-menu'
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;