import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { useState, useContext, ChangeEvent } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
  
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

  const Price = styled.div`
    position:absolute;
    right: 10px;
    bottom: 10px;
    text-align:center;
    z-index: 10;
    padding: 10px;
  `;

  const SaleBanner = styled.div`
    background-color:rgba(255,0,0,.8);
    border-radius: 5px;
    color : white;
    padding: 5px;
  `;

  const NewPrice = styled.div`

  `;

  const OldPrice = styled.div`
    color: red;
    text-decoration: line-through;
    padding: 10px;
  `;

  const CartQuantityInput = styled.input`
    width: 40px
  `;
  
  interface productProps {
      product: Product,
      key: number
  }

  export const ProductCard = (props: productProps) => {
    const { cart, setCart } = useContext(CartContext);
    const [cartQuantity, setCartQuantity] = useState(1);
    const [showCartQuantityInput, setShowCartQuantityInput] = useState(false);


    function updateShowCartQuantityInput(){
      setShowCartQuantityInput(true)
    }

    function hideShowCartQuantityInput(){
      setShowCartQuantityInput(false)
    }

    function updateQuantity(event: ChangeEvent<HTMLInputElement>){
      setCartQuantity(Number(event.target.value))
    }

    function salePrice(){
        const product = props.product
        const sale = <><SaleBanner>Sale {product.saleRate}% Off</SaleBanner><OldPrice>${product.price}</OldPrice>
        <NewPrice>${product.price-product.saleFlat}</NewPrice></>
        return product.sale? sale: "$"+product.price
    }

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info onMouseLeave={hideShowCartQuantityInput}>
          <Icon >
            <ShoppingCartOutlined 
              onMouseOver={updateShowCartQuantityInput} 
              onClick={() => {addItemToCart({...props.product, quantity: cartQuantity})}} />
          </Icon>
          {(showCartQuantityInput) ? <CartQuantityInput onChange={updateQuantity} placeholder="1"/> :  null}
          <Icon>
            <SearchOutlined />
          </Icon>
        </Info>
        <Price>{salePrice()}</Price>
      </Container>
    );
  };