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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './SuccessBox.module.css';

const theme = createTheme();

export default function ResetPasswordSuccess(){

    const navigate = useNavigate();

    return(        
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={styles.SuccessBox}
                sx={{
                border: '1px solid #1565c0',
                borderRadius:3,
                p:3,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <div className={styles.successCheckMark}>
                    <CheckCircleOutlineIcon color ='success' fontSize='inherit'/>
                </div>
                <Typography component="h1" variant="h4">
                Success!
                </Typography>
                <br />
                <Box>
                <div className={styles.successTextBox}>
                    <Typography component="h1" variant="h5">
                    Your account password has been successfully changed.
                    </Typography>
                    <br />
                    Please sign in with your new password.
                </div>
                <Button
                    href="/login"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign in now
                </Button>
                </Box>
            </Box>
        </Container>
      </ThemeProvider>
    );
}