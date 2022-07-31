import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
// import { Quantity } from '../quantity/Quantity';
import { ProductCard } from "./ProductCard";
import { PropaneSharp } from '@mui/icons-material';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const DisplayProducts = ({updateLoginUser}: any) => {

  var [products, setProducts] = useState<Product[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
    }
    fetchData()
  }, [])

  return (

    <React.Fragment>
        <Navbar updateLoginUser={updateLoginUser}/>
        <Container>
          
        {products.map((item) => (

            <><ProductCard product={item} key={item.id} updateUser={updateLoginUser}/>
    
            {/* <Quantity products={products}/> */}
            </> 
            
        ))}
          {updateLoginUser.role == "ADMIN" && 
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 2,
            width: 300,
            height: 350,
            },
            }}
          >
          <Button href="/product/create" color="success" size="large" variant="outlined" startIcon={<AddCircleIcon />}>
          Add new product
          </Button>
        </Box>}
        </Container>
    </React.Fragment>
    
  );
};