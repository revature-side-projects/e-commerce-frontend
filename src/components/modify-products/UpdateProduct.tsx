import Navbar from "../navbar/Narbar"
import { Box, TextField, ThemeProvider, Container, createTheme, Button, Typography, Grid, InputAdornment, TextFieldClasses } from "@mui/material"
import React, { useEffect, useState } from "react";
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import { useParams, useNavigate } from "react-router-dom";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { IconButton } from "@material-ui/core";

const theme = createTheme();

export default function UpdateProduct() {

    // funcitons and state varible to handle changing image
    let [URL, setURL] = useState(null);
    //sets changed image when button pressed
    function changeImage(event: any) {
        {URL && ((document.getElementById("pPreview") as HTMLImageElement).src=URL)};
    }
    //sets url when product image url changed
    function handleChangeURL(event: any){
        setURL(event.target.value);
    }

    //sets product as state variable
    const [product, setProduct] = useState<Product>()
    const { id } = useParams() //prams
    const navigate = useNavigate();

    // removes falsyness
    const intId = id ? id : "0";
    
    //retrieves and sets products
    useEffect(() => {
            const fetchData = async () => {
            const result = await apiGetProductById(parseInt(intId))
            setProduct(result.payload)
            }
            fetchData();
        }, []
    )

    
    // updates the database with given variables and redirects user
    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        apiUpsertProduct(new Product(
            parseInt(intId),
            `${data.get('pName')}`,
            parseInt(`${data.get('pQuantity')}`),
            `${data.get('pDescription')}`,
            parseFloat(`${data.get('pPrice')}`),
            `${data.get('pImage')}`
        ));
        // TODO: navigate to updated product rather than home
        navigate('/');
    }
      

    return (
        <>
        {product ?
        <ThemeProvider theme={theme}>
            <Navbar/>
            
            <Container component="form" onSubmit={handleUpdate} maxWidth="lg">
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                Update Product
                            </Typography>
                            
                        </Grid>
                        <Grid container xs={6}>
                            <Container>
                                <img id="pPreview" src={product.image} height="470"/>
                                
                            </Container>
                            <TextField margin="normal" required fullWidth id="pImage" label="Product Image URL" name="pImage" autoFocus defaultValue={product.image} onChange={handleChangeURL} InputProps={{endAdornment:
                                <InputAdornment position="end"><IconButton onClick={changeImage} onMouseDown={(event)=>event.preventDefault}><AutorenewIcon/></IconButton></InputAdornment>}}
                            />

                        </Grid>
                        <Grid container xs={6}>
                            <Grid xs={12}>
                                <TextField margin="normal" required fullWidth id="pName" label="Product Name" name="pName" autoFocus defaultValue={product.name}/>
                                <TextField margin="normal" required fullWidth id="pDescription" label="Product Description" name="pDescription" multiline rows={15} defaultValue={product.description}/>
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