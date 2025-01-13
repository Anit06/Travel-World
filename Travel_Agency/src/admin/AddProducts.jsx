import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterLocation, setEnterLocation] = useState('');
  const [enterDistance, setEnterDistance] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterType, setEnterType] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, 'products');

      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on('state_changed', null, (error) => {
        toast.error(`Error uploading image: ${error.message}`);
        setLoading(false);
      }, async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(docRef, {
            productName: enterTitle,
            location: enterLocation,
            distance: enterDistance,
            description: enterDescription,
            category: enterCategory,
            type: enterType,
            price: enterPrice,
            imgUrl: downloadURL,
          });

          toast.success('Product successfully added!');
          setLoading(false);
          navigate("/dashboard/all-products");
        } catch (error) {
          console.error(error);
          toast.error('Error getting download URL.');
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      toast.error('Product not added!');
      setLoading(false);
    }
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? <h4 className='py-5'>Loading.....</h4> :<>
                <h4 className='mb-5'>Add Tour</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className='form__group'>
                    <span>Title</span>
                    <input
                      type='text'
                      placeholder='lorem.....'
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Location</span>
                    <input
                      type='text'
                      placeholder='lorem.....'
                      value={enterLocation}
                      onChange={(e) => setEnterLocation(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Distance</span>
                    <input
                      type='number'
                      placeholder='lorem.....'
                      value={enterDistance}
                      onChange={(e) => setEnterDistance(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Description</span>
                    <input
                      type='text'
                      placeholder='Description.....'
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className='d-flex align-items-center justify-content-between gap-5'>
                    <FormGroup className='form__group w-50'>
                      <span>Price</span>
                      <input
                        type='number'
                        placeholder='Rs. 100'
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className='form__group w-50'>
                      <span>Category</span>
                      <select
                        className='w-100 p-2'
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                        required
                      >
                        <option>Select Category</option>
                        <option value='Mountain'>Mountain</option>
                        <option value='Forest'>Forest</option>
                        <option value='Sea'>Sea</option>
                        <option value='Island'>Island</option>
                        <option value='Waterfall'>Waterfall</option>
                        <option value='Lake'>Lake</option>
                        <option value='Valley'>Valley</option>
                        <option value='Desert'>Desert</option>
                        <option value='River'>River</option>
                        <option value='Cultural'>Cultural</option>
                      </select>
                    </FormGroup>
                    <FormGroup className='form__group w-50'>
                      <span>Type</span>
                      <select
                        className='w-100 p-2'
                        value={enterType}
                        onChange={(e) => setEnterType(e.target.value)}
                        required
                      >
                        <option>Select Type</option>
                        <option value='Trending Tours'>Trending Tours</option>
                        <option value='Best Tours'>Best Tours</option>
                        <option value='Limited Offers'>Limited Offers</option>
                        <option value='New Arrival Tours'>New Arrival Tours</option>
                        <option value='Popular in Category'>Popular in Category</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className='form__group'>
                      <span>Product Image</span>
                      <input
                        type='file'
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className='buy__btn' type='submit'>
                    Add Product
                  </button>
                </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
