import { Input } from '@material-ui/core';
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

export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

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
        <Navbar/>
        <SearchDiv>
        <SearchBar type='text' onChange={search} placeholder="Search" className='searchbar'></SearchBar>
        </SearchDiv>
        <Container> 
        {filteredProducts.map((item) => (
            <ProductCard product={item} key={item.id} />
        ))}
        </Container>
    </React.Fragment>
    
  );
};  