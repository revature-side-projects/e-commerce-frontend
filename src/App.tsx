import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const lightMode = createTheme();
  lightMode.palette.primary.main = '#ffffff';
  lightMode.palette.secondary.main = '#474C55';

  const darkMode = createTheme();
  darkMode.palette.primary.main = '#000000';
  darkMode.palette.secondary.main = '#474C55';

  const colorMode = sessionStorage.getItem('colorMode');
  const theme = colorMode ==='darkMode' ? darkMode : lightMode;


  return (
    <ThemeProvider theme={theme}>
    <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <CartContext.Provider value={value}>
        <Router>
          <AppRoutes></AppRoutes>
        </Router>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
