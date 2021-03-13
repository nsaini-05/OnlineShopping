
import React, { useEffect } from "react";
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css';
import Header from './componenets/layouts/Header'
import Footer from './componenets/layouts/Footer'
import Home from './componenets/Home'
import ProductDetails from './componenets/product/ProductDetails'
import Login from './componenets/user/Login'
import Register from './componenets/user/Register'
import {loadUser} from './actions/userActions' 
import store from './store'
import ProtectedRoute from './componenets/route/ProtectedRoute'
import Profile from './componenets/layouts/Profile'
import UpdateProfile from './componenets/user/UpdateProfile'
import UpdatePassword from './componenets/user/UpdatePassword'



function App() {

  useEffect(()=>{store.dispatch(loadUser()) }, []  )


  return (
    <Router>
    <div className="App">
    <Header />
    <div className = "container container-fluid">
    <Route path = "/" component = {Home} exact />
    <Route path = "/search/:keyword" component = {Home} exact />
    <Route path = "/product/:id" component = {ProductDetails} exact />
    <Route path = "/login" component = {Login}  />
    <Route path = "/register" component = {Register} exact />
    <Route path = "/logout" component = {Home} exact />
    <ProtectedRoute path = "/me" component = {Profile} exact />
    <ProtectedRoute path = "/me/update" component = {UpdateProfile} exact />
    <ProtectedRoute path = "/me/password/update" component = {UpdatePassword} exact />





    </div>

    <Footer />
    </div>
    </Router>
  );
}


export default App;
