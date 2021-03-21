
import React, { useEffect , useState } from "react";
import {BrowserRouter as Router , Route} from 'react-router-dom'
import axios from "axios";

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
import ForgotPassword from './componenets/user/ForgotPassword'
import NewPassword from './componenets/user/NewPassword'
import Cart from './componenets/cart/Cart'
import Shipping from './componenets/cart/Shipping'
import { SAVE_SHIPPING_INFO } from "./constants/cartConstants";
import { ConfirmOrder } from "./componenets/cart/ConfirmOrder";
import Payment from './componenets/cart/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {OrderSuccess} from './componenets/cart/OrderSuccess'

//Order Imports
import {ListOrders} from './componenets/order/ListOrders'
import OrderDetails from "./componenets/order/OrderDetails";


//Admin Imports 
import {Dashboard} from './componenets/admin/Dashboard'
import ProductsList from "./componenets/admin/ProductsList";




function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');



  useEffect(()=>{
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi');    
      setStripeApiKey(data.stripeApiKey)
    } 
    getStripeApiKey();    
   }, []  )


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
    <Route path = "/password/forgot" component = {ForgotPassword} exact />
    <ProtectedRoute path = "/me" component = {Profile} exact />
    <ProtectedRoute path = "/me/update" component = {UpdateProfile} exact />
    <ProtectedRoute path = "/me/password/update" component = {UpdatePassword} exact />
    <Route path = "/password/reset/:token" component = {NewPassword} exact />
    <Route path = "/cart" component = {Cart} exact />
    <ProtectedRoute path = '/shipping' component = {Shipping} />
    <ProtectedRoute path = '/confirm' component = {ConfirmOrder} />

    {stripeApiKey && <Elements stripe = {loadStripe(stripeApiKey)}>
    <ProtectedRoute path = "/payment" component = {Payment} exact />
    </Elements>     
    }


    <ProtectedRoute path = '/success' component = {OrderSuccess}/>
    <ProtectedRoute path = '/orders/me' component = {ListOrders} />
    <ProtectedRoute path = '/order/:id' component = {OrderDetails} exact />










    </div>

    <ProtectedRoute path = '/dashboard' isAdmin = {true} component = {Dashboard} exact />
    <ProtectedRoute path = '/admin/products' isAdmin = {true} component = {ProductsList} exact />


    <Footer />
    </div>
    </Router>
  );
}


export default App;
