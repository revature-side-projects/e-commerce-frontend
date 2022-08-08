import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import React,{useState} from "react";
import { Typography} from "@material-ui/core";
import { Grid } from "@mui/material";

  
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

  const Grid2 = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  interface productProps {
  product:Product
    }

  export const SearchProductCard = (props: productProps) => {
    return(
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Container>
                    <img src={props.product.image} height="300" />
                </Container>
            </Grid>
                <Grid item xs={9}>
                    <Typography component="h1" variant="h5" align="left">{props.product.name}</Typography>
                    <Typography component="h1" variant="h5" align="left">{props.product.price}</Typography>
                </Grid>
        </Grid>
    </Container>
    )
}