import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Cart } from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import { DisplayProducts } from "../components/display-products/DisplayProducts";
import Login from '../components/login/Login';
import EditProfile from '../components/profile/EditProfile';
import Register from '../components/register/Register';

export const AppRoutes: React.FC<unknown> = () => {
  const [user, setUser] = useState("");
  return (
  <Routes>
    <Route path="/" element={<DisplayProducts updateLoginUser={user}/>} />
    <Route path="/login" element={<Login updateLoginUser={setUser}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/checkout" element={<Checkout updateLoginUser={user}/>} />
    <Route path="/profile" element={<EditProfile updateLoginUser={user}/>} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
  )
}
