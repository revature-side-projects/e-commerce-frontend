import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 30px;
`;

const SearchBar = styled.input`
    border: none;
    width: 30%;
    font-size: 30px;
    border-bottom: 1px solid;
    outline: none;
    padding: 10px 0px;
`;

const Text = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;`

export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterBy, setFilterBy] = useState("name");
  const [category, setCategory] = useState("category");

  //Search Function
  //let value = value of Input Tag.
  //If value is null, setFilteredProducts to products.
  //If value is not null, let results = filtered products list using value and product name.
  //setFilteredProducts to the results list.
  let search = (e: SyntheticEvent) => {
    let value = (e.target as HTMLInputElement).value;

    if (!value) {
      setFilteredProducts(products);
    } else {
      let results = products.filter((product: Product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      })
      setFilteredProducts(results);
    }

  }

  //Search by Category Function
  //Checks if category state equals "category", if true then setFilteredProducts to products.
  //If category state does not equal "category", 
  //let results = filtered products list using value and product category.
  //If results length is 0, setFilteredProducts to empty list.
  //setFilteredProducts to the results list.
  let categorySearch = () => {
    if (category === "category") {
      setFilteredProducts(products);
    } else {
      let results = products.filter((product: Product) => {
        return product.category.toLowerCase().includes(category.toLowerCase());
      })
      if (results.length === 0) {
        setFilteredProducts([]);
      } else {
        setFilteredProducts(results);
      }
    }
  }

  //Checks filterBy state to determine when categorySearch() is run.
  useEffect(() => {
    if (filterBy === "category") {
      categorySearch();
    }
  })

  //fetchData async fuction gets all product using apiGetAllProducts function
  //setProducts to result.payload
  //setFilteredProducts to result.payload
  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts();
      setProducts(result.payload);
      setFilteredProducts(result.payload);
    }
    fetchData()
  }, [])


  return (
    <React.Fragment>
      <Navbar />
      <SearchDiv>
        {filterBy === "name" ? <SearchBar type='text' onChange={search} placeholder="Search" className='searchbar'></SearchBar> : null}
        {filterBy === "category" ?
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Search"
            onChange={event => setCategory(event.target.value as string)}            >
            <MenuItem value="category">Category</MenuItem>

            <MenuItem value="Moon">Moons</MenuItem>
            <MenuItem value="Sun">Suns</MenuItem>
            <MenuItem value="Star">Stars</MenuItem>
          </Select> : null}
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={filterBy}
          label="Search"
          onChange={event => setFilterBy(event.target.value as string)}            >
          <MenuItem value="name">Search By Name</MenuItem>
          <MenuItem value="category">Search By Category</MenuItem>
        </Select>
      </SearchDiv>
      <Container>
        {filteredProducts.length <= 0 && <Text>No Products Found</Text>}
        {filteredProducts.length > 0 && filteredProducts.map((item) => (
          <ProductCard product={item} key={item.id} />))}
      </Container>
    </React.Fragment>

  );
};