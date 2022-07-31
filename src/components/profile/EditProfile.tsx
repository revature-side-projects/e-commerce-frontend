import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import eCommerceClient from '../../remote/e-commerce-api/eCommerceClient';
import { apiLogout } from '../../remote/e-commerce-api/authService';
import { EditOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';



export default function EditProfile({loginUser, updateLoginUser}: any) {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(`${data.get('firstName')}`)

        const response = await eCommerceClient.put<any>(
            `users/${loginUser.id}`,
            { 
            id: loginUser.id,
            email: `${data.get('email')}`,
            password: `${data.get('password')}`,
            firstName: `${data.get('firstName')}`,
            lastName: `${data.get('lastName')}`, 
            role: loginUser.role
            }
        );

        // If user was able to edit their profile, log out of the API, update the user object and redirect.
        if (response.status >= 200 && response.status < 300) {

          const res = await apiLogout();
          updateLoginUser(res.payload);
          // Jest did not like navigate outside of <Router>, replaced with this to navigate to homepage.
          navigate("/");
        }

  };

  return (
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
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Edit Profile
          </Typography>
          <Box component="form" textAlign='center' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  defaultValue={loginUser.firstName}
                  placeholder="First Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  defaultValue={loginUser.lastName}
                  placeholder="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                  defaultValue={loginUser.email}
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  defaultValue={loginUser.password}
                  placeholder="Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr:4, width:90 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/")}
            >
             Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete Profile
            </Button>
          </Box>
        </Box>
      </Container>
  );
}