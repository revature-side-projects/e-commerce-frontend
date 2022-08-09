import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetProductById } from "../remote/e-commerce-api/productService";
import Navbar from '../components/navbar/Narbar';
import { CartContext } from "../context/cart.context";

type Props ={};

const ProductDetail = (props: Props) => {
  let navigate = useNavigate();

  const detail = {
    margin:"20px 0px 0px 0px",
    backgroundColor:"rgba(242, 105, 38)",
    display: "flex"
  };
  const image={
    backgroundColor:"white",
    margin: "5px 2.5px 5px 5px",
    width: "60%"
  }
  const content={
    backgroundColor: "white",
    padding: "0px 15px 0px 15px",
    margin: "5px 5px 5px 2.5px",
    width: "40%"
  }
  const button={
    margin: "0px 20px 0px 20px",
  }
  const desc={
    borderTop: "2px solid black",
    padding: "20px 0px 0px 0px",
    margin: "20px 0px 0px 0px"
  }
  
  
    let [count, setCount]=useState(0);
    if(count<1){
      count=1;
    };

    const incrementCount=()=>{
      setCount(count+1);
    };

    const decrementCount=()=>{
      setCount(count-1);
    };

    const [product, setProduct] = React.useState<any>({});
    const [loading, setLoading] = React.useState<boolean>(true);
 
    const location = window.location.href;
    const productId = parseInt(location.split("/")[4]);
   
    const { cart, setCart } = useContext(CartContext);

      useEffect(() => {
        getProduct();

      },[])

      const getProduct = async() =>{
        const currentProd = await apiGetProductById(productId);        
        setProduct(currentProd);
        setLoading(false);
      };    
      
      const addItemToCart = (props: Props) => {
        const readyProduct=product.payload;
        const newCart = [...cart]

        const index = newCart.findIndex((searchProduct) => {
          console.log("SearchProduct: ",searchProduct)
          return searchProduct.id === readyProduct.id;
        })
  
        if (index === -1) {
          readyProduct.quantity=count;

          newCart.push(readyProduct)
        }
        else       
        newCart[index].quantity += count;


        navigate("/cart", {replace: true});
        setCart(newCart)
        if(newCart[index].quantity<=0){
          newCart[index].quantity=0;
          console.log("Out of Stock!");
        }
      }
      
  if (loading) {
    return (
      <>
        Loading
      </>
    )
  }

  return (
    <React.Fragment>
      <Navbar/>
      <>
      <div style={detail}>
        <img style={image} src={product.payload.image} />
               
        <div style={content}>
          <div>Product Detail</div>
          <h1>{product.payload.name}</h1>
          <p>${product.payload.price}</p>
          <p>Quantity: {product.payload.quantity}</p>
          <div>
            <span>Qty</span>
            <div className="app">
            <button className=""  onClick={incrementCount}>+</button>
            {count}
            <button className="" onClick={decrementCount}>-</button>
          </div>
            <button onClick={() => {addItemToCart({...product.payload, quantity: count})}} style={button}>
              Add To Cart
            </button>           
          </div>
          <div style={desc}>
          <p>Description: {product.payload.description}</p>
          </div>
          
        </div>
      </div>
      </>
    </React.Fragment>
  )
};

export default ProductDetail;