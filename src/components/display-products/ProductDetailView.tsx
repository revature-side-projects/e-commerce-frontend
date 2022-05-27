/*  
 * This code is intended to 
 * Authors: Grayson Howard, Elenor Johnson, Patrick Rwamasirabo
 * Last Modified: 05/27
 */ 

import Product from "../../models/Product"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";

interface productProps {
  product: Product,
  close: ()=>void,
  open: boolean,
  addToCart: (product: Product) => void
  cartQuantity: number
}

export default function ProductDetailView(props:productProps){
  const [openSnack, setOpenSnack] = useState(false);
  const fullWidth: boolean = true;
  const maxWidth: DialogProps["maxWidth"] = "lg";

  const handleClick = () => {
    props.addToCart({...props.product, quantity: props.cartQuantity});
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  return (
    <React.Fragment>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={props.close}
      >
        <DialogTitle>{props.product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`$ ${props.product.price.toFixed(2)}`}</DialogContentText>
          <Box
            component="img"
            sx={{
              maxHeight: 500,
              display: "flex",
              flexDirection: "column",
              m: "auto",

            }}
            alt={`Product Image of: ${props.product.name}`}
            src={props.product.image}
          />
          <DialogContentText>
            {`${props.product.description} Available: ${props.product.quantity}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button 
              onClick={() => {handleClick()}} >Add to Cart</Button>
        </DialogActions>
        <Snackbar
            open={openSnack}
            onClose={handleCloseSnack}
            autoHideDuration={3000}
            message="Added to Cart"
        />
      </Dialog>
    </React.Fragment>
  );
}