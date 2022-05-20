import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../reset-password/SuccessBox.module.css'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Link from '@mui/material/Link';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme();

export default function CheckEmailNotification(){

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
                    <MarkEmailReadIcon color ='success' fontSize='inherit'/>
                </div>
                <Typography component="h1" variant="h4">
                    Check your email
                </Typography>
                <Box>
                <div className={styles.successTextBox}>
                    <Typography component="h1" variant="h5" sx={{pt:2}}>
                        Emailgoeshere@gmail.com
                    </Typography>
                    <br />
                        You will receive instructions to reset your password if the email address you entered is registered.
                    <br />
        
                </div>
                <Button
                    href="/"      
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Ok
                </Button>
                <FormHelperText>
                    <Typography align="center" variant='inherit'>
                        Didn't get the email? If it doesn't arrive soon, check your spam folder or&nbsp;
                        <Link href="/forgot-password" underline="hover">
                            {"send the email again."}
                        </Link>
                    </Typography>
                </FormHelperText>
                </Box>
            </Box>
        </Container>
      </ThemeProvider>
    );
}