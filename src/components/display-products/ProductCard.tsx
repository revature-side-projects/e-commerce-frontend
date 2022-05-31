import {
    SearchOutlined,
    ShoppingCartOutlined,
    Close
  } from "@material-ui/icons";
  import { 
    Snackbar,
    IconButton 
  } from "@material-ui/core";
import { useState, useContext, ChangeEvent } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import ProductDetailView from "./ProductDetailView"
import { useTheme } from '@mui/material/styles'
  
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
    background: ${sessionStorage.getItem('colorMode') === 'lightMode' ? '#f5fbfd' : '#474C55'};
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: #000;
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

  const InventoryAlert = Snackbar;

  interface productProps {
      product: Product,
      key: number
  }

  export const ProductCard = (props: productProps) => {

    const { cart, setCart } = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(1);
    const [showCartQuantityInput, setShowCartQuantityInput] = useState(false);
    const [showInventoryAlert, setShowInventoryAlert] = useState(false);
    const [inventoryAlertMessage, setInventoryAlertMessage] = useState("");

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const alertCloseAction = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={hideInventoryAlert}
      >
        <Close fontSize="small" />
      </IconButton>
    );


    function hideInventoryAlert(){
      setShowInventoryAlert(false)
    }

    function hideCartQuantityInput(){
      setShowCartQuantityInput(false)
    }

    function updateShowCartQuantityInput(){
      setShowCartQuantityInput(true)
    }

    function updateQuantity(event: ChangeEvent<HTMLInputElement>){
      setCartQuantity(Number(event.target.value))
    }
  
  function salePrice(){
    const product = props.product
    const sale = <><SaleBanner>Sale {product.saleRate}% Off</SaleBanner><OldPrice>${product.price}</OldPrice>
    <NewPrice>${product.price-(product.price *(product.saleRate/100))}</NewPrice></>
    return product.sale? sale: "$"+product.price
}

    const addItemToCart = (product: Product) => {      

      if(cartQuantity < 1 ){
        setInventoryAlertMessage(`Quantity must be greater than 1`)
        setShowInventoryAlert(true)
        return
      }
      if(props.product.quantity < cartQuantity){
        setInventoryAlertMessage(`We do not have enough in stock. We only have ${props.product.quantity} left.`)
        setShowInventoryAlert(true)
      }else{
        const newCart = [...cart]
        const index = newCart.findIndex((searchProduct) => {
          return searchProduct.id === product.id
        })

        if (index === -1){ 
          newCart.push(product)
          setCart(newCart)
        }
        else{
          const newCartQuantity = newCart[index].quantity + product.quantity
          if(props.product.quantity < newCartQuantity){
            setInventoryAlertMessage(`You can only add up to ${props.product.quantity-newCart[index].quantity} more to your cart. `)
            setShowInventoryAlert(true)
            return
          } else{
            newCart[index].quantity = newCartQuantity
            setCart(newCart)
          }
        }
      }
    }

    const theme = useTheme();

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info onMouseLeave={hideCartQuantityInput}>
          <Icon>
            <ShoppingCartOutlined 
              onMouseOver={updateShowCartQuantityInput} 
              onClick={() => {addItemToCart({...props.product, quantity: cartQuantity})}} />
          </Icon>
          {(showCartQuantityInput) ? <CartQuantityInput onChange={updateQuantity} placeholder="1"/> :  null}
          <Icon>
            {
              // Button should creates pop up to display details for the product clicked on
            }
            <SearchOutlined onClick={handleOpen}/>
          </Icon>
        </Info>
        <ProductDetailView product={props.product} close={handleClose} open={open}/>
        <Price>{salePrice()}</Price>
        <InventoryAlert 
             style={{ height: "100%"}}
             anchorOrigin={{
                vertical: "top",
                horizontal: "center"
             }}
            open={showInventoryAlert}
            autoHideDuration={6000}
            onClose={hideInventoryAlert}
            message= {inventoryAlertMessage}
            action={alertCloseAction}
          />
      </Container>
    );
  };