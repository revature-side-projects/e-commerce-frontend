import {
  CancelPresentationOutlined,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined
} from '@mui/icons-material';

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Navbar from "../navbar/Narbar";
import {useState} from "react";
import { CardTravel } from "@mui/icons-material";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;


export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  let [count, setCount] = useState(0);
  
 

  const editQuantityUp =(id: any)=>{
    for (let i =0;i<cart.length;i++){
      if(cart[i].id == id){
        cart[i].quantity = cart[i].quantity + 1
        setCount(cart[i].quantity + 1) 
      }
    }
  }
  const editQuantityDown =(id: any, image: any)=>{
    for (let i =0;i<cart.length;i++){
      if(cart[i].id == id){
        cart[i].quantity = cart[i].quantity - 1
        if(cart[i].quantity <= 0){
          cart[i].quantity = 0 
          removeButton(id, image);
        }
        setCount(cart[i].quantity - 1)
      }
    }
  }

  const removeButton =(id: any, image: any)=>{
    for (let i =0;i<cart.length;i++){
      if(cart[i].id == id){
           setCart(cart.filter(product => product.image !== image));
      }
    }
  }

 

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => {navigate('/')}}>CONTINUE SHOPPING</TopButton>
          <TopButton onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cart.map((product)=> (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Icon>
                          <KeyboardArrowUpOutlined onClick={() => editQuantityUp(product.id)} />
                        </Icon>
                        <ProductAmount> {product.quantity} </ProductAmount>
                        <Icon>
                          <KeyboardArrowDownOutlined onClick={() => editQuantityDown(product.id, product.image)} />
                        </Icon>
                        <Icon>
                          <CancelPresentationOutlined onClick={() => removeButton(product.id, product.image)} />
                        </Icon>
                        {/*}
                        <button className="qb" onClick={() => editQuantityUp(product.id)}>^</button>
                        <ProductAmount> {product.quantity} </ProductAmount>
                        <button className="qb" onClick={() => editQuantityDown(product.id, product.image)}>v</button>
                        <button className="qb" onClick={() => removeButton(product.id, product.image)}>-</button>
                      */}
                      </ProductAmountContainer>
                      <ProductPrice>$ {product.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr/>
                </>
              ))
            }
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 
                  {cart.reduce<number>((total, product) => total + product.price * (product.quantity), 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 
                {cart.reduce<number>((total, product) => total + product.price * (product.quantity), 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};