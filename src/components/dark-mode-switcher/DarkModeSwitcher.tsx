import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function DarkModeSwitcher(){

  function changeMode() {
    const mode = localStorage.getItem('colorMode');
    localStorage.setItem('colorMode', mode === 'lightMode' ? 'darkMode' : 'lightMode');
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
}
