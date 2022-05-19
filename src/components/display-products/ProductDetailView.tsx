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
}

export default function ProductDetailView(props:productProps){
  const [open, setOpen] = React.useState(false);
  const fullWidth: boolean = true;
  const maxWidth: DialogProps["maxWidth"] = "lg";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onLoad={handleClickOpen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Product Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Product Description</DialogContentText>
          <Box
            component="img"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content"
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <DialogContentText>
            Or Put descriptions down here? Incorporate (or ask the Item Quantity
            team to incorporate) into Item Quantity feature?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}