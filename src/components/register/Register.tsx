import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const defaultPasswordHelper = "Enter a password containing at least 8 characters containing at least an UPPERCASE, lowercase, number and special character";
  const [emailError, setEmailError] = React.useState(false);
  const [emailHelper, setEmailHelper] = React.useState<String>("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordHelper, setPasswordHelper] = React.useState<String>(defaultPasswordHelper);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailError || passwordError) return;

    const firstName: String = data.get('firstName')?.valueOf() as String;
    const lastName: String = data.get('lastName')?.valueOf() as String;
    const email: String = data.get('email')?.valueOf() as String;
    const password: String = data.get('password')?.valueOf() as String;
    if (firstName == null || firstName.trim().length == 0 ||
      lastName == null || lastName.trim().length == 0)
      return;
    const response = await apiRegister(`${firstName}`, `${lastName}`, `${email}`, `${password}`)
    if (response.status >= 200 && response.status < 300) {
      navigate('/login');
      return;
    }
    if (response.status === 400) {
      setEmailError(true);
      setEmailHelper("Account with email already exists")
    }
  };

  const checkValidEmail = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rege = new RegExp(".*@.*\\..*");
    const text = event.currentTarget.value;

    if (!rege.exec(text) && text.length != 0) {
      setEmailError(true);
      return;
    }
    setEmailHelper("");
    setEmailError(false);
  };

  const checkValidPass = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;
    if (text.length == 0) {
      setPasswordError(false);
      setPasswordHelper(defaultPasswordHelper);
      console.log(event);
      return;
    }

    const lowerRegex = new RegExp("(?=.*[a-z])");
    const upperRegex = new RegExp("(?=.*[A-Z])");
    const numRegex = new RegExp("(?=.*\\d)");
    const specialRegex = new RegExp("(?=.*[@$!%*?&])");

    let newHelper: String = "Missing:\n";
    let anyErrors: boolean = false;
    if (!lowerRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tlowercase\n,";
    }
    if (!upperRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tUPPERCASE\n,";
    }
    if (!numRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tnumbers\n,";
    }
    if (!specialRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tspecial characters @$!%*?&\n,";
    }
    if (text.length < 8) {
      anyErrors = true;
      newHelper += "\tat least 8 characters";
    }
    else {
      newHelper = newHelper.substring(0, newHelper.length - 1);
    }
    if (anyErrors) {
      setPasswordHelper(newHelper);
      setPasswordError(true);
      return;
    }

    setPasswordHelper("");
    setPasswordError(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={checkValidEmail}
                error={emailError}
                helperText={emailHelper}
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
                onChange={checkValidPass}
                error={passwordError}
                helperText={passwordHelper}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
