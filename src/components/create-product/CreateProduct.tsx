import Navbar from "../navbar/Narbar"
import { Box, TextField, ThemeProvider, Container, createTheme, Button, Typography, Grid, InputAdornment } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";
import noIdProduct from "../../models/noIdProduct";

const theme = createTheme();

export function CreateProduct() {

    const [product] = useState<noIdProduct>()

    const navigate = useNavigate();
    
    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        apiUpsertProduct(new noIdProduct(
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
        <ThemeProvider theme={theme}>
            <Navbar/>
            
            <Container component="form" onSubmit={handleCreate} maxWidth="lg">
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                Create Product
                            </Typography>
                            
                        </Grid>
                        <Grid container xs={6}>
                            <TextField margin="normal" required fullWidth id="pImage" label="Product Image URL" name="pImage" autoFocus/>
                        </Grid>
                        <Grid container xs={6}>
                            <Grid xs={12}>
                                <TextField margin="normal" required fullWidth id="pName" label="Product Name" name="pName" autoFocus/>
                                <TextField margin="normal" required fullWidth id="pDescription" label="Product Description" name="pDescription" multiline rows={15}/>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item xs={6}>
                                    <TextField name="pPrice" required fullWidth id="pPrice" label="Price" InputProps={{startAdornment: 
                                        <InputAdornment position="start">$</InputAdornment>,}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth id="pQuantity" label="Quantity" name="pQuantity" type="number"/>
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

        </>
    )

}