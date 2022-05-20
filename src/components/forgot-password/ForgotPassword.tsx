import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MailLockIcon from '@mui/icons-material/MailLock';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { apiForgotPassword } from '../../remote/e-commerce-api/authService';

const theme = createTheme();

export default function ForgotPassword(){

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    apiForgotPassword(`${data.get('email')}`);
    navigate('/check-email');
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
            {/*bgcolor:'#F26925' revature orange: potential future change */}
            <Avatar sx={{ m: 1, bgcolor:'secondary.main' }}>
              < MailLockIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Your Password
            </Typography>
            <FormHelperText>
              Please enter your registered email.
            </FormHelperText>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
            >
              Send
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login"variant="body2" style={{ textDecoration: 'none' }}>
                  <ArrowBackIosIcon fontSize = 'inherit'/>
                  {"Back to sign in"}
                </Link>  
              </Grid>
            </Grid>   
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}