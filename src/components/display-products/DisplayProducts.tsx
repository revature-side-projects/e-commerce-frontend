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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 10;
  cursor: pointer;
`;



export const DisplayProducts = ({loginUser}: any) => {

  var [products, setProducts] = useState<Product[]>([])

  console.log(loginUser)

  const removeButton =(id: any, image: any)=>{
    for (let i =0;i<products.length;i++){
      if(products[i].id == id){
           setProducts(products.filter(product => product.image !== image));
      }
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
    }
    fetchData()
  }, [])

  return (

    <React.Fragment>
        <Navbar updateLoginUser={loginUser}/>
        <Container>
       
          
        {loginUser && products.map((item) => (

            <><ProductCard product={item} key={item.id} loginUser={loginUser}
            /> <br></br><br></br>
            {loginUser.role =="ADMIN" &&
            <Button onClick={() => removeButton(item.id, item.image)}>REMOVE<br></br> {item.name}</Button> }
            
    
            {/* <Quantity products={products}/> */}
            </> 

             
            
        ))}
         {/* {loginUser.role == "ADMIN" && products.map((item) => <><TopButton onClick={() => removeButton(item.id, item.image)} /></>)} */}
          
          

          {loginUser.role == "ADMIN" && 
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