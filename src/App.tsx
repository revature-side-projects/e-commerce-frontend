import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeSwitcher from './components/dark-mode-switcher/DarkModeSwitcher'; // KHENAN TERRY: Dark Mode Switcher
import { GlobalStyles } from "@mui/material";

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const lightMode = createTheme();
  lightMode.palette.primary.main = '#ff00ff';
  lightMode.palette.background.default = '#ffffff';
  lightMode.palette.background.paper = '#ffffff';
  lightMode.palette.secondary.main = '#474C55';

  const darkMode = createTheme();
  darkMode.palette.primary.main = '#00ffff';
  darkMode.palette.background.default = '#474C55';
  darkMode.palette.background.paper = '#474C55';
  darkMode.palette.secondary.main = '#474C55';

  const colorMode = localStorage.getItem('colorMode');
  let theme = lightMode;
  let bgColor = '#ffffff'
  if(colorMode === 'darkMode') {
    theme = darkMode;
    bgColor = '#474C55';
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles ={{ body:{backgroundColor:bgColor}}} />
      <>
      <DarkModeSwitcher />
      <CartContext.Provider value={value}>
        <Router>
          <AppRoutes></AppRoutes>
        </Router>
      </CartContext.Provider>
      </>
    </ThemeProvider>
  );
}

export default App;
