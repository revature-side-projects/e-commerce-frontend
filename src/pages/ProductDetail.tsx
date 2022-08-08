
import React, {useEffect, useState} from 'react';
import { apiGetProductById } from "../remote/e-commerce-api/productService";

type Props = {}

const ProductDetail = (props: Props) => {

    const [product, setProduct] = React.useState<any>({});
    const [loading, setLoading] = React.useState<boolean>(true);
 
        const location = window.location.href;
        const productId = parseInt(location.split("/")[4]);

      useEffect(() => {
        getProduct();
      },[])

      const getProduct = async() =>{
        const currentProd = await apiGetProductById(productId);        
        setProduct(currentProd);
        setLoading(false);
      };    

if (loading) {
  return (
    <>
      Loading
    </>
  )
}
  return (
    <>
    <div>Product Detail</div>
    <div>Name: {product.payload.name}</div>
    <div>Description: {product.payload.description}</div>
    <div>Quantity: {product.payload.quantity}</div>
    <div>Price: {product.payload.price}</div>
    <div><img src={product.payload.image} /></div>
 
  

    </>
  )
}

export default ProductDetail
