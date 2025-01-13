import React, {useRef, useEffect, useState} from 'react'
import './Header.css'

import {motion} from "framer-motion"

import logo from '../../assets/images/logo.png'
import user_icon from '../../assets/images/user-icon.png'

import { Container, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase.config'
import { getDoc, doc} from 'firebase/firestore';
import { toast } from 'react-toastify'

import { SiYourtraveldottv } from "react-icons/si";
import { IoMenu } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const nav__links =[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/travel',
    display:'Travel'
  },
  {
    path:'/bookingTour',
    display:'Booking'
  },
  {
    path:'/cart',
    display:'Cart'
  },
]

const Header = () => {

  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const [userRole, setUserRole] = useState(null);

  const stickyHeaderFunc = () => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add('sticky__header');
        } else {
          headerRef.current.classList.remove('sticky__header');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };
  

  const logout = () =>{
    signOut(auth).then(() =>{
      toast.success('Logged out')
      navigate('/home');
    }).catch(err =>{
      toast.error(err.message);
    })
  }

  useEffect(() => {
    stickyHeaderFunc();
  
    if (currentUser) {
      const fetchUserRole = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userData = userDoc.data();
          setUserRole(userData?.role || 'user');
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };
      fetchUserRole();
    }
  
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, [currentUser]);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('active__menu');
    }
  };
  

  const navigateToCart = () =>{
    navigate("/cart")
  }

  const toggleProfileActions = () => {
    const profileActions = profileActionRef.current;
  
    // Check if profileActions exists and is not null
    if (profileActions && (profileActions.style.display === 'none' || !profileActions.style.display)) {
      profileActions.style.display = 'block';
    } else if (profileActions) {
      profileActions.style.display = 'none';
    }
  };
  
  
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>

            <div className='logo'>
              <img src={logo} alt='logo' />
              <div>
                <h1>Travel World</h1>
                <p>Since 2024</p>
              </div>
            </div>

            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              <ul className='menu'>
                {
                  nav__links.map((item, index) =>(
                    <li className='nav__item'>
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav__active" : ""}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className='nav__icons'>
              <span className='fav__icon'>
                <i><FaHeart /></i>
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i><SiYourtraveldottv /></i>
                <span className='badge'>{totalQuantity}</span>
              </span>

              <div className='profile'>
                <motion.img whileTap={{ scale: 1.2}} src={currentUser? currentUser.photoURL : user_icon} alt='' onClick={toggleProfileActions}/>
                <div className='profile__actions' ref={profileActionRef} onClick={toggleProfileActions}>
                {
                  currentUser ? (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        {userRole === 'admin' || userRole === 'subadmin' ? (
                          <Link to='/dashboard'>Dashboard</Link>
                        ) : null}
                        <span onClick={logout}>Logout</span>
                      </div>

                  ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                          <Link to='/signup'>Signup</Link>
                          <Link to='/login'>Login</Link>
                        </div>
                  )
                }
                </div>
              </div>
              <div className='mobile__menu'>
                <span onClick={menuToggle}><IoMenu /></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header

