import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function DarkModeSwitcher(){

  //Switches color modes, and stores the value so the change is persistent.
  function changeMode() {
    const mode = sessionStorage.getItem('colorMode');
    sessionStorage.setItem('colorMode', mode != 'lightMode' ? 'lightMode' : 'darkMode');
    window.location.reload();
  }

  return(
    <>
        <Button
          color='primary'
          variant='contained'
          sx={{ mt: 0.30, mb: 0 }}
          onClick={() => changeMode()}>

          Mode
        </Button>
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
