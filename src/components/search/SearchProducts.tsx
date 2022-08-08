import React, { useState, useEffect } from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box, Container, Grid, Typography } from "@mui/material";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
<<<<<<< HEAD
=======
import Pic from "./Pic.png"
import { FormatPaint } from "@mui/icons-material";
>>>>>>> 16daf6a1015cb20f936220b4fd67c696bf700491


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
<<<<<<< HEAD
            <h1>
                Results
            </h1>
            
            <p>{new URLSearchParams(location.search).get('keyword')}</p>
            {products.map((item) => (
               <h1>
                item
               </h1>
            ))}
        </Box>
=======
            <Typography component="h1" variant="h5">
                Results for "{keys}"
            </Typography>
            {products.map(
                (item) => (
                    <>
                        {item.name.toLocaleLowerCase().includes(keys ? keys.toLocaleLowerCase() : "") &&

                            <Container>
                                <Typography align="center">{item.name}</Typography>
                                <img src={item.image} height="300" />
                            </Container>
                        
                        }
                    </>
                )
            )}
            </Box>
>>>>>>> 16daf6a1015cb20f936220b4fd67c696bf700491
        </>
    

    )
}