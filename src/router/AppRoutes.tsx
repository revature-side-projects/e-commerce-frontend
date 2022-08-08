import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Cart } from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import { DisplayProducts } from "../components/display-products/DisplayProducts";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import ProductDetail from '../pages/ProductDetail';
import UpdateProduct from '../components/modify-products/UpdateProduct';
import CreateProduct from '../components/create-product/CreateProduct';
import EditProfile from '../components/profile/EditProfile';

export const AppRoutes: React.FC<unknown> = () => {
  const [user, setUser] = useState("");
  return (
  <Routes>
    <Route path="/" element={<DisplayProducts loginUser={user}/>} />
    <Route path="/login" element={<Login updateLoginUser={setUser}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/checkout" element={<Checkout loginUser={user} />} />
    <Route path="/profile" element={<EditProfile loginUser={user} updateLoginUser={setUser}/>} />
    <Route path="/cart" element={<Cart loginUser={user}/>} />

    <Route path="/product/:id/update" element={<UpdateProduct loginUser={user}/>} />
    <Route path="/product/create" element={<CreateProduct loginUser={user}/>} />
    <Route path="/product/:id" element={<ProductDetail />} />
  </Routes>
  )
}
