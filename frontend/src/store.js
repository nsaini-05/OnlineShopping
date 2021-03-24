import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer , productDetailReducer, newReviewReducer , newProductReducer, productReducer } from './reducers/productReducers'
import {authReducers , userReducer, forgotPasswordReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import {newOrderReducer , myOrdersReducers , orderDetailsReducer, allOrdersReducer} from './reducers/orderReducers'



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
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders   :  myOrdersReducers,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    product : productReducer,
    allOrders  : allOrdersReducer  

})



const middleware = [thunk];

const store = createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;