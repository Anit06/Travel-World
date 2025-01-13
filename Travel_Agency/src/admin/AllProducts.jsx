import React, { useState } from 'react';
import { Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { db, storage } from '../firebase.config'; // Assuming you have Firebase storage configured
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { toast } from 'react-toastify';
import useAuth from '../custom-hooks/useAuth';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const AllProducts = () => {
  const { currentUser } = useAuth();
  const { data: productsData, loading } = useGetData('products');
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [editedProduct, setEditedProduct] = useState({
    productName: '',
    location: '',
    distance: '',
    category: '',
    description: '',
    type: '',
    price: ''
  });
  const [newImage, setNewImage] = useState(null);

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setNewImage(image);
  };

  const editProduct = async () => {
    try {
      let imageUrl = editData.imgUrl; // Accessing the old image URL directly from editData
      if (newImage) {
        const imageRef = ref(storage, `product_images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        imageUrl = await getDownloadURL(imageRef);
      }
      const newData = { ...editedProduct, imgUrl: imageUrl };
  
      // Update Firestore document with the new data, including the new image URL
      await updateDoc(doc(db, 'products', editData.id), newData);
  
      toast.success('Edited Product!');
      toggleEditModal();
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Error editing product');
    }
  };
  
  const openEditModal = (item) => {
    setEditData(item); // Set the data of the product being edited
    setEditedProduct(item); // Set the initial values in the edit form
    toggleEditModal(); // Open the edit modal
  };

  const deleteProduct = async (id) => {
    try {
      // Check if the current user has admin privileges
      if (currentUser && currentUser.role === 'admin') {
        await deleteDoc(doc(db, 'products', id));
        toast.success('Deleted!');
      } else {
        toast.error('You do not have permission to delete this product.');
      }
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast.error('Error deleting product');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Distance</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className='text-center' colSpan='9'>Loading...</td>
                  </tr>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.imgUrl} alt='' /></td>
                      <td>{item.productName}</td>
                      <td>{item.location}</td>
                      <td>{item.distance}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button className='mb-2' onClick={() => openEditModal(item)} color='warning'>Edit</Button>
                        <Button className='mt-2' onClick={() => deleteProduct(item.id)} disabled={currentUser.email !== 'anitsamanta2002@gmail.com'} color='danger'>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='productName'>Product Name</Label>
              <Input type='text' name='productName' id='productName' value={editedProduct.productName} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='location'>Location</Label>
              <Input type='text' name='location' id='location' value={editedProduct.location} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='distance'>Distance</Label>
              <Input type='text' name='distance' id='distance' value={editedProduct.distance} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='category'>Category</Label>
              <Input type='text' name='category' id='category' value={editedProduct.category} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description</Label>
              <Input type='text' name='description' id='description' value={editedProduct.description} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='type'>Type</Label>
              <Input type='text' name='type' id='type' value={editedProduct.type} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='price'>Price</Label>
              <Input type='text' name='price' id='price' value={editedProduct.price} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for='newImage'>New Image</Label>
              <Input type='file' name='newImage' id='newImage' onChange={handleImageChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={editProduct}>Save Changes</Button>{' '}
          <Button color='secondary' onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default AllProducts;


