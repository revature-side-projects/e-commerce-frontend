import React, { useState, useEffect } from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Typography } from "@mui/material";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";

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
            <h1>
                Test
            </h1>
            <p>{new URLSearchParams(location.search).get('keyword')}</p>
            {products.map((item) => (
            <>
                <Typography>item</Typography>
            </> 
            ))}
        </Box>
        </>

    )
}