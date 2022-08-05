import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Cart } from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import { DisplayProducts } from "../components/display-products/DisplayProducts";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import UpdateProduct from '../components/modify-products/UpdateProduct';
import { CreateProduct } from '../components/create-product/CreateProduct';
import { SearchProducts } from '../components/search/SearchProducts';

export const AppRoutes: React.FC<unknown> = () => {
  const [user, setUser] = useState("");
  return (
  <Routes>
    <Route path="/" element={<DisplayProducts updateLoginUser={user}/>} />
    <Route path="/login" element={<Login updateLoginUser={setUser}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/checkout" element={<Checkout updateLoginUser={user}/>} />
    <Route path="/cart" element={<Cart />} />

    <Route path="/product/:id/update" element={<UpdateProduct />} />
    <Route path="/product/create" element={<CreateProduct />} />
    <Route path="/search" element={<SearchProducts/>}/>
  </Routes>
  )
}
