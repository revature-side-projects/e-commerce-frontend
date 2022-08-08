import React, { useState, useEffect } from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Container, Grid, Typography } from "@mui/material";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
import { SearchProductCard }  from "./SearchProductCard";
import { StringDecoder } from "string_decoder";


export const SearchProducts = () =>{
    const location = useLocation();
    const keys = new URLSearchParams(location.search).get('keyword')

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
            <Typography component="h1" variant="h5">
                Results for "{keys}"
            </Typography>
            {products.map(
                (item) => (
                    <>
                        {item.name.toLocaleLowerCase().includes(keys ? keys.toLocaleLowerCase() : "") &&


                        <SearchProductCard product={item}/>


                        }
                    </>
                )
            )}
        </Box>
        </>
    )
}