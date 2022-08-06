import React, { useEffect, useState } from "react"
import {useLocation, useParams} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { apiGetProductByName } from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import No_Image from "./No_Image.png"



export const SearchProducts = () =>{
    const location = useLocation();

    return(
        <>
        <Navbar/>
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <Grid container xs={6}>
            <img src="No_Image.png"></img>

            <p>{new URLSearchParams(location.search).get('keyword')}</p>
            </Grid>
            <Grid container xs={6}>
                <Grid xs={12}>
                    <h1> Product Name </h1>
                </Grid>
            </Grid>
        </Box>
        </>

    )
}