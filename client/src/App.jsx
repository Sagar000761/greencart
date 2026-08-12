import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import useAppContext from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategories from './pages/ProductCategories';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProdustList from './pages/seller/ProdustList';
import Order from './pages/seller/Order';
import Loading from './components/Loading';

export default function App(){
  const isSellerPath=useLocation().pathname.includes('seller')
  const {showUserLogin , isSeller}=useAppContext()
  return (
    <div className='text:default min-h-screen text-gray-700 bg-white'>
    {isSellerPath ? null : <Navbar/> }
    {showUserLogin ? <Login/> : null}

    <Toaster/>
    <div className={`${isSellerPath ? ' ' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='/allproducts/:category' element={<ProductCategories/>}/>
        <Route path='/allproducts/:category/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loader' element={<Loading/>}/>
        <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>  
        <Route index element={isSeller ? <AddProduct/> : null}/>
        <Route path='product-list' element={<ProdustList/>}/>
        <Route path='orders' element={<Order/>}/>

        </Route>
      </Routes>
    </div>
    { !isSellerPath && <Footer/>}
    </div>
  )
}
