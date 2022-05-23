import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeSwitcher from './components/dark-mode-switcher/DarkModeSwitcher'; // KHENAN TERRY: Dark Mode Switcher
import { GlobalStyles } from "@mui/material";
import Typography from '@mui/material/Typography';

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const lightMode = createTheme({
    palette: {
      primary: {main: '#474C55', contrastText: "#fff"},
      secondary: {main:'#bbbbbb', contrastText: "#fff"},
      text: {primary: '#000000'},
      background: {default: '#ffffff'}
    }
  });

  const darkMode = createTheme({
    palette: {
      primary: {main: '#000000', contrastText: "#fff"},
      secondary: {main:'#000000', contrastText: "#fff"},
      text: {primary: '#ffffff', secondary: '#ffffff'},
      background: {default: '#212121', paper: '#212121'}
    }
  });

  const colorMode = localStorage.getItem('colorMode');
  let theme = colorMode === 'darkMode' ? lightMode : darkMode;

  return (
    <ThemeProvider theme={theme}>
      <Typography color="textPrimary">
        <GlobalStyles styles ={{ body:{backgroundColor:theme.palette.background.default}}} />
        <>
        <DarkModeSwitcher />
        <CartContext.Provider value={value}>
          <Router>
            <AppRoutes></AppRoutes>
          </Router>
        </CartContext.Provider>
        </>
      </Typography>
    </ThemeProvider>
  );
}

export default App;
