import Navbar from "../navbar/Narbar"
import { Box, TextField, ThemeProvider, Container, createTheme, Button, Typography, Grid, InputAdornment } from "@mui/material"
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const theme = createTheme();

export default function UpdateProduct() {

    const [product, setProduct] = useState<Product>()
    const { id } = useParams()

    const intId = id ? id : "0";
    
    useEffect(() => {
            const fetchData = async () => {
            const result = await apiGetProductById(parseInt(intId))
            setProduct(result.payload)
            }
            fetchData()
        }, [])
    console.log(product)
      

    return (
        <>
        {product ?
        <ThemeProvider theme={theme}>
            <Navbar/>
            
            <Container component="main" maxWidth="lg">
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                Update Product
                            </Typography>
                            
                        </Grid>
                        <Grid xs={6}>
                            <Container>
                                <img src={product.image} height="470"/>
                            </Container>
                            <TextField margin="normal" required fullWidth id="pImage" label="Product Image URL" name="pImage" autoFocus defaultValue={product.image}/>
                        </Grid>
                        <Grid container xs={6}>
                            <Grid xs={12}>
                                <TextField margin="normal" required fullWidth id="pName" label="Product Name" name="pName" autoFocus defaultValue={product.name}/>
                                <TextField margin="normal" required fullWidth id="pDescription" label="Product Description" name="oDescription" multiline rows={15} defaultValue={product.description}/>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item xs={6}>
                                    <TextField name="pPrice" required fullWidth id="pPrice" label="Price" defaultValue={product.price.toFixed(2)} InputProps={{startAdornment: 
                                        <InputAdornment position="start">$</InputAdornment>,}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth id="pQuantity" label="Quantity" name="pQuantity" defaultValue={product.quantity} type="number"/>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx={{ mt: 3}}>Update</Button>
                        </Grid>
                    </Grid>
                </Box>
                
            </Container>
        </ThemeProvider>
        :
        <Typography component="h1" variant="h5">
            Loading Product...
        </Typography>
        }
        </>
    )

}