import {
    SearchOutlined,
    ShoppingCartOutlined,
    
  } from "@material-ui/icons";
import {
  CancelPresentationOutlined,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined,
  AddCircleOutlined,
  UpgradeOutlined
} from '@mui/icons-material';
import{
  Button,
  Box
} from '@mui/material'

import { useContext } from "react";
  import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import React,{useState} from "react";

  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;


  interface productProps {
      product: Product,
      key: number,
      loginUser: any
    
  }

  export const ProductCard = (props: productProps) => {

    let [counter, setCount] = useState(0);

    if(counter < 1){
        counter = 1;
    };
    
    // Function to increment count by 1
    const incrementCount = () => {
      // Update state with incremented value
      setCount(counter + 1);
    };
    
    const decrementCount = () => {
        setCount(counter -1);
    };







    const { cart, setCart } = useContext(CartContext);

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    const navigate = useNavigate();

    return (
      <><Container>

        <Circle />
        <Image src={props.product.image} />
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product, quantity: counter})}} />

          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
          <Icon>
            <KeyboardArrowUpOutlined onClick={incrementCount} />
          </Icon>
          <ProductAmount>{counter}</ProductAmount>
          <Icon>
            <KeyboardArrowDownOutlined onClick={decrementCount} />
          </Icon>
           {/*<div className="app">
            <button className="qb"  onClick={incrementCount}>+</button>
            {counter}
            <button className="qb" onClick={decrementCount}>-</button>
          </div>*/}

          {props.loginUser.role == "ADMIN" && <Icon>

            <UpgradeOutlined onClick={() => navigate(`/product/${props.product.id}/update`)} />
          </Icon>}

        </Info>
      </Container>

      </>
    );
  };
