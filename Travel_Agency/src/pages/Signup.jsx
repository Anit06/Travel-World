import React, { useEffect, useState } from 'react';
import '../style/Login.css';
import Helmet from '../components/helmet/Helmet';
import { Col, Container, Row, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, provider } from '../firebase.config';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      const user = userCredential.user;
  
      let userRole = 'user'; // Default role
  
      if (userCredential.additionalUserInfo?.providerId === 'google.com') {
        // User signed up with Google
        const googleUser = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL } = googleUser.user;
  
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          role: userRole // Include the default role
        });
      } else {
        // User signed up with email/password
        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            toast.error(`Error uploading image: ${error.message}`);
            setLoading(false);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              });
  
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: downloadURL,
                role: userRole // Include the default role
              });
            });
          }
        );
      }
  
      setLoading(false);
      toast.success('Account created');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  

  const handleGoogleSignup = async () => {
    try {
      const googleUser = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = googleUser.user;
  
      // Check if the email is already registered
      const userDoc = await getDoc(doc(db, 'users', googleUser.user.uid));
      if (userDoc.exists()) {
        // Email already exists in Firestore
        toast.error('This email is already registered');
        // Return here to prevent further execution
        return;
      }
  
      // Store user data in Firestore only if email is not already registered
      await setDoc(doc(db, 'users', googleUser.user.uid), {
        uid: googleUser.user.uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        role: 'user', // Include the default role
      });
  
      toast.success('Signed up with Google successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign up with Google');
    }
  };
  
  
  

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <div className='m-0 p-0'>
                  <p>or</p>
                </div>
                <button type='button' className='buy__btn auth__btn' onClick={handleGoogleSignup}>
                    <FcGoogle /> Continue with Google
                  </button>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
