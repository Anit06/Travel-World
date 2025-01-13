import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase.config';
import { getDoc, setDoc, doc } from 'firebase/firestore'; // Import getDoc for reading user data from Firestore
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in, if yes, redirect to home page
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setLoading(false);
      toast.success('Successfully logged in');
      navigate('/'); // Make sure '/checkout' route exists
    } catch (error) {
      setLoading(false);
      toast.error('Authentication failed. Please check your credentials.');
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if the user's email already exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // Email does not exist in Firestore, create a new user entry
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      
      // Proceed with login
      toast.success('Successfully logged in with Google');
      navigate('/');
    } catch (error) {
      toast.error('Google authentication failed.');
      console.error(error);
    }
  };
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Login</h3>

            <Form className='auth__form' onSubmit={signIn}>
              <FormGroup className='form__group'>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormGroup>
              <button type='submit' className='buy__btn auth__btn'>
                Login
              </button>
              <p>
                Don't have an account? <Link to='/signup'>Create an account</Link>
              </p>
              <div className='m-0 p-0'>
                <p>or</p>
              </div>
              <button type='button' className='buy__btn auth__btn' onClick={signInWithGoogle}>
              <FcGoogle /> Login with Google
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
