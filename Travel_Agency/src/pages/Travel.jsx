import React, { useState } from 'react';
import CommonSection from '../components/UI/CommonSection'
import NewsLetter from '../shared/Newsletter';
import Helmet from "../components/helmet/Helmet"
import { Col, Container, Row } from 'reactstrap'
import '../style/Shop.css'

import useGetData from '../custom-hooks/useGetData';

import ProductList from '../components/UI/ProductList';

import { IoMdSearch } from "react-icons/io";

const Travel = () => {

  const { data: products, loading } = useGetData('products');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    let filteredCategory = [];
    if (filterValue === "Mountain") {
      filteredCategory = products.filter(
        (item) => item.category === "Mountain"
      );
    } else if (filterValue === "Forest") {
      filteredCategory = products.filter(
        (item) => item.category === "Forest"
      );
    } else if (filterValue === "Sea") {
      filteredCategory = products.filter(
        (item) => item.category === "Sea"
      );
    } else if (filterValue === "Island") {
      filteredCategory = products.filter(
        (item) => item.category === "Island"
      );
    } else if (filterValue === "Waterfall") {
      filteredCategory = products.filter(
        (item) => item.category === "Waterfall"
      );
    } else if (filterValue === "Lake") {
      filteredCategory = products.filter(
        (item) => item.category === "Lake"
      );
    } else if (filterValue === "Valley") {
      filteredCategory = products.filter(
        (item) => item.category === "Valley"
      );
    } else if (filterValue === "Desert") {
      filteredCategory = products.filter(
        (item) => item.category === "Desert"
      );
    } else if (filterValue === "River") {
      filteredCategory = products.filter(
        (item) => item.category === "River"
      );
    } else if (filterValue === "Cultural") {
      filteredCategory = products.filter(
        (item) => item.category === "Cultural"
      );
    }

    setFilteredProducts(filteredCategory);
  };

  const handleSort = (e) => {
    const selectedOrder = e.target.value;
    setFilteredProducts(prevFilteredProducts => {
      let sortedProducts = [...prevFilteredProducts]; // Copying filteredProducts
      if (selectedOrder === 'ascending') {
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
      } else if (selectedOrder === 'descending') {
        sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
      }
      return sortedProducts;
    });
  };

  const handleSearch = (e) => {
    console.log('Searching...');
    const searchTerm = e.target.value;
    const searchedProducts = products.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Searched Products:', searchedProducts);
    setFilteredProducts(searchedProducts);
  }
  

  return (
    <Helmet title="Shop">
      <CommonSection title="Tours" />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className='filter__widget'>
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
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
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className='filter__widget'>
                <select onChange={handleSort}>
                  <option>Sort By</option>
                  <option value='ascending'>Ascending</option>
                  <option value='descending'>Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className='search__box'>
                <input type='text' placeholder='Search.......' onChange={handleSearch} />
                <span><i><IoMdSearch /></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            <h2 className='section__title text-center'>Displayed Tours</h2>
            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
                <ProductList data={filteredProducts.length > 0 ? filteredProducts : products} />
            }
          </Row>
        </Container>
      </section>
      <section className='p-0 m-0'>
        <NewsLetter />
      </section>
    </Helmet>
  )
}

export default Travel;
