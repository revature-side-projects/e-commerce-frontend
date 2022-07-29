import Navbar from "../navbar/Narbar"
import { Box, TextField, ThemeProvider, Container, createTheme, Button, Typography, Grid, InputAdornment } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import noIdProduct from "../../models/noIdProduct";

const theme = createTheme();

export default function UpdateProduct() {

    const [product, setProduct] = useState<Product>()
    const { id } = useParams()
    const navigate = useNavigate();

    const intId = id ? id : "0";
    
    useEffect(() => {
            const fetchData = async () => {
            const result = await apiUpsertProduct(new noIdProduct("", 0, "", 0, ""))
            setProduct(result.payload)
            }
            fetchData()
        }, [])

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
    //console.log(product)
      

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
                                Create Product
                            </Typography>
                            
                        </Grid>
                        <Grid container xs={6}>
                            <Container>
                                <img src={product.image} height="470"/>
                            </Container>
                            <TextField margin="normal" required fullWidth id="pImage" label="Product Image URL" name="pImage" autoFocus defaultValue={product.image}/>
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
                            <Button type="submit" variant="contained" sx={{ mt: 3}}>Create</Button>
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