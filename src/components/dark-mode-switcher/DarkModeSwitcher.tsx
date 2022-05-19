import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button'; // KHENAN TERRY: Import Button
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightMode = createTheme();
lightMode.palette.background.default = '#ffffff';

const darkMode = createTheme();
darkMode.palette.primary.main = '#a000d0';
darkMode.palette.primary.dark = '#7000a0';
darkMode.palette.background.default = '#121212';

export default function DarkModeSwitcher(){
  const [theme, setTheme] = useState(true);
  const activeTheme = createTheme(theme ? lightMode : darkMode);

  return(
    <>
      <ThemeProvider theme={activeTheme}>
        <Button
          color='primary'
          variant='contained'
          sx={{ mt: 0.30, mb: 0 }}
          onClick={() => setTheme(!theme)}>

          Mode
        </Button>
      </ThemeProvider>
    </>
  );
  // const lightMode = createTheme();
  // lightMode.palette.primary.main = '#ffffff';
  // lightMode.palette.secondary.main = '#474C55';
  //
  // const darkMode = createTheme();
  // darkMode.palette.primary.main = '#000000';
  // darkMode.palette.secondary.main = '#474C55';
  //
  // const colorMode = sessionStorage.getItem('colorMode');
  // const theme = colorMode ==='darkMode' ? darkMode : lightMode;
  //
  // return (
  //   <ThemeProvider>
  //   <Button>Primary</Button>
  //     <Button color="secondary">Secondary</Button>
  //     <CartContext.Provider value={value}>
  //       <Router>
  //         <AppRoutes></AppRoutes>
  //       </Router>
  //     </CartContext.Provider>
  //   </ThemeProvider>
  // );
}
