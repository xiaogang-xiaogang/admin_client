import React, { Component } from 'react'
import {Route, BrowserRouter,Routes, Navigate} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
import Home from './pages/Home'
import Charts from './pages/charts'
import Category from './pages/category'
import User from './pages/user'
import Role from './pages/role'
import Product from './pages/product'
import ProductDetail from './pages/product/product_detail'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes >
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}>
            <Route path='/admin/home' element={<Home/>}></Route>
            <Route path='/admin/product' element={<Product/>}>
             
            </Route>
            <Route path='/admin/product/detail' element={<ProductDetail/>}></Route>
            <Route path='/admin/user' element={<User/>}></Route>
            <Route path='/admin/category' element={<Category/>}></Route>
            <Route path='/admin/charts' element={<Charts/>}></Route>
            <Route path='/admin/role' element={<Role/>}></Route>
          </Route>
          <Route path='*' element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

