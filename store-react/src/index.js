// importing all the necessary dependencies for our app
import React from "react";

// ReactDOM provides top-level access to native DOM methods
// Please refer to https://reactjs.org/docs/react-dom.html
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// importing the Provider higher order component
// we wrap our components with it so that they have access to global application state
// global application state includes functions and data
import { Provider } from "react-redux";

// import all the ncessary styling
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

// import all of our components
// a component in this case is merely a logical grouping of HTML+CSS+JS
// this allows us to reuse the said HTML+CSS+JS
import Login from "views/Login.jsx";
import Register from "views/Register.jsx";
import Products from "./views/Products.jsx";
import Cart from "./views/Cart.jsx";
import AddProduct from "./views/AddProduct.jsx"
import Purchases from "./views/Purchases.jsx";
import AddManufacturer from "./views/AddManufacturer.jsx";
import AddCategory from "./views/AddCategory.jsx"
import ReviewProduct from "./views/ReviewProduct.jsx"

// import the store
// the store is basically an object containing data and methods
// it is visible to all components wrapped by Provider
// please refer to https://redux.js.org/api/store
import store from "./store/index";

// call the render method and pass it the div with id root (public/index.html)
// we wrap our components firstly with Provider that has access to the store
// this way our components can now interact with the store
// we then wrap out app using BrowserRouter and Swtutch components
// this allows us to define routes within our applications
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/products" render={props => <Products {...props} />} />
        <Route path="/cart" render={props => <Cart {...props} />} />
        <Route path="/purchases" render={props => <Purchases {...props} />} />
        <Route path="/add-product" render={props => <AddProduct {...props} />} />
        <Route path="/add-manufacturer" render={props => <AddManufacturer {...props} />} />
        <Route path="/add-category" render={props => <AddCategory {...props} />} />
        <Route path="/review-product" render={props => <ReviewProduct {...props} />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);