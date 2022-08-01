import Navbar from "../navbar/Narbar"
import { Box, TextField, ThemeProvider, Container, createTheme, Button, Typography, Grid, InputAdornment } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUpsertProduct } from "../../remote/e-commerce-api/productService";
import noIdProduct from "../../models/noIdProduct";
import No_Image from "./No_Image.png"
import { IconButton } from "@material-ui/core";
import AutorenewIcon from '@mui/icons-material/Autorenew';


const theme = createTheme();

export function CreateProduct() {
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
                        <Container>
                                <img id="pPreview"src = {No_Image} height="470"/>
                        </Container>
                            <TextField margin="normal" required fullWidth id="pImage" label="Product Image URL" name="pImage" autoFocus onChange={handleChangeURL} InputProps={{endAdornment:
                                <InputAdornment position="end"><IconButton onClick={changeImage} onMouseDown={(event)=>event.preventDefault}><AutorenewIcon/></IconButton></InputAdornment>}}
                            />
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