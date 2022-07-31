import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Cart } from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import { DisplayProducts } from "../components/display-products/DisplayProducts";
import Login from '../components/login/Login';
import EditProfile from '../components/profile/EditProfile';
import Register from '../components/register/Register';
import UpdateProduct from '../components/modify-products/UpdateProduct';
import { CreateProduct } from '../components/create-product/CreateProduct';

export const AppRoutes: React.FC<unknown> = () => {
  const [user, setUser] = useState("");
  return (
  <Routes>
    <Route path="/" element={<DisplayProducts loginUser={user}/>} />
    <Route path="/login" element={<Login updateLoginUser={setUser}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/checkout" element={<Checkout loginUser={user} />} />
    <Route path="/profile" element={<EditProfile loginUser={user} updateLoginUser={setUser}/>} />
    <Route path="/cart" element={<Cart />} />

    <Route path="/product/:id/update" element={<UpdateProduct />} />
    <Route path="/product/create" element={<CreateProduct />} />
  </Routes>
  )
}
