<<<<<<< HEAD
import React, { useEffect, useState } from "react"
import {useLocation, useParams} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { apiGetProductByName } from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import No_Image from "./No_Image.png"


=======
import React, { useState, useEffect } from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Typography } from "@mui/material";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
>>>>>>> 4707e2e6d451716054f3e552dd4d445fda8fa2e4

export const SearchProducts = () =>{
    const location = useLocation();

    var [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await apiGetAllProducts()
        setProducts(result.payload)
        }
        fetchData()
    }, [])

    return(
        <>
        <Navbar/>
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <Grid container xs={6}>
            <img src="No_Image.png"></img>

            <p>{new URLSearchParams(location.search).get('keyword')}</p>
<<<<<<< HEAD
            </Grid>
            <Grid container xs={6}>
                <Grid xs={12}>
                    <h1> Product Name </h1>
                </Grid>
            </Grid>
=======
            {products.map((item) => (
            <>
                <Typography>item</Typography>
            </> 
            ))}
>>>>>>> 4707e2e6d451716054f3e552dd4d445fda8fa2e4
        </Box>
        </>

    )
}