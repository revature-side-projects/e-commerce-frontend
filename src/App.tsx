import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import DarkMode from "./DarkMode";
import logo from "./logo.svg";

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      <Router><DarkMode />

        <AppRoutes></AppRoutes>
    <div className="App">
      <header className="App-header">
   
      </header>
    </div>
</Router>
    </CartContext.Provider>
    

  );
}

export default App;
