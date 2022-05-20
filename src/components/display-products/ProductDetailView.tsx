/*  
 * This code is intended to 
 * Authors: Grayson Howard, Elenor Johnson, Patrick Rwamasirabo
 * Last Modified: 05/18
 * Problems: Error: Invalid hook call. Hooks can only be called inside of the body of a function component. Line: 62 (ProductCard.tsx)
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

interface productProps {
  product: Product,
  close: ()=>void,
  open: boolean
}

export default function ProductDetailView(props:productProps){
  //const [open, setOpen] = React.useState(false);
  const fullWidth: boolean = true;
  const maxWidth: DialogProps["maxWidth"] = "lg";
  /*
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
*/
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
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content"
            }}
            alt={`Product Image of: ${props.product.name}`}
            src={props.product.image}
          />
          <DialogContentText>
            {props.product.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}