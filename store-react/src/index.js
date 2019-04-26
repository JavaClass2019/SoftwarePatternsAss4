import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Login from "views/Login.jsx";
import Register from "views/Register.jsx";
import AddUser from "./views/Admin/AddUser.jsx";
import Products from "./views/Products.jsx";
import AdminProducts from "./views/Admin/Products.jsx";
import Cart from "./views/Cart.jsx";
import AddProduct from "./views/AddProduct.jsx"
import Purchases from "./views/Purchases.jsx";
import AddManufacturer from "./views/AddManufacturer.jsx";
import AddCategory from "./views/AddCategory.jsx";
import ReviewProduct from "./views/ReviewProduct.jsx";
import ViewProduct from "./views/Admin/ViewProduct.jsx";
import EditProduct from "./views/Admin/EditProduct.jsx";

import store from "./store/index";

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/add-user" render={props => <AddUser {...props} />} />
        <Route path="/products" render={props => <Products {...props} />} />
        <Route path="/admin-products" render={props => <AdminProducts {...props} />} />
        <Route path="/cart" render={props => <Cart {...props} />} />
        <Route path="/purchases" render={props => <Purchases {...props} />} />
        <Route path="/add-product" render={props => <AddProduct {...props} />} />
        <Route path="/add-manufacturer" render={props => <AddManufacturer {...props} />} />
        <Route path="/add-category" render={props => <AddCategory {...props} />} />
        <Route path="/review-product" render={props => <ReviewProduct {...props} />} />
        <Route path="/view-product" render={props => <ViewProduct {...props} />} />
        <Route path="/edit-product" render={props => <EditProduct {...props} />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);