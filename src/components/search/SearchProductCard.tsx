
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Typography} from "@material-ui/core";
import { Grid, Link } from "@mui/material";



  
  
  interface productProps {
    product:Product
  }

  export const SearchProductCard = (props: productProps) => {
    const navigate = useNavigate();

    return(

        <Grid container spacing={2} maxWidth="lg">
            <Grid item xs={3}>
              <img src={props.product.image} height="300" />
            </Grid>
            <Grid item xs={9}>
              <Link onClick={()=>navigate("/product/" + props.product.id)}>
                <Typography component="h1" variant="h5" align="left" >{props.product.name}</Typography>
              </Link>
              <Typography component="h1" variant="h6" align="left">${props.product.price.toFixed(2)}</Typography>
              <Typography component="h1" variant="h6" align="left">{props.product.description}</Typography>
            </Grid>
        </Grid>

    )
}