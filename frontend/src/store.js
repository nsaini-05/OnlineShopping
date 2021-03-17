import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer , productDetailReducer } from './reducers/productReducers'
import {authReducers , userReducer, forgotPasswordReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
    import { format } from 'path';
import { JsonWebTokenError } from 'jsonwebtoken';


    let initialState = {
        cart : {
            cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
            shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
        
        }
    }

const reducers = combineReducers({
    products : productsReducer ,
    productDetails : productDetailReducer,
    auth : authReducers, 
    user : userReducer,
    forgotUserPassword : forgotPasswordReducer,
    cart : cartReducer


})



const middleware = [thunk];

const store = createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;