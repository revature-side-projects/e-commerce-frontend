import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const theme = createTheme();

export default function ResetPassword(){
    
    const navigate = useNavigate();

    const [inputErrors, setInputErrors] = useState({
        misMatch:'',
    })

    const [showErrorIcon, setShowErrorIcon] = React.useState(false)

    //returns true if validation error, false if not
    function checkMismatch (password:string, passwordVerify:string):boolean { 
        let error = false; 
        if(password != passwordVerify){
            setInputErrors(state=>({...state, misMatch: 'Please make sure that both passwords match.'}));
            setShowErrorIcon(true);
            error = true;
        } else{
          setInputErrors(state=>({...state, misMatch: ''}));
          setShowErrorIcon(false);
          error = false;
        }
        return error;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //check if the two password inputs are the same
        checkMismatch(`${data.get('password')}`, `${data.get('passwordVerify')}`)
        
        //patch on auth controller; fill in later -   const response = await (); 
        //if (response.status >= 200 && response.status < 300) navigate('/')
    };


    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter new password"
                  type="password"
                  id="password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordVerify"
                  label="Confirm new password"
                  type="password"
                  id="password"
                />
                <FormHelperText error>
                  {showErrorIcon ? <ErrorOutlineOutlinedIcon color ='error' fontSize = 'inherit'/> :null} {inputErrors.misMatch}
                </FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}