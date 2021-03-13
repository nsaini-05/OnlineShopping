import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer , productDetailReducer } from './reducers/productReducers'
import {authReducers , userReducer, forgotPasswordReducer} from './reducers/userReducers'
    import { format } from 'path';


const reducers = combineReducers({
    products : productsReducer ,
    productDetails : productDetailReducer,
    auth : authReducers, 
    user : userReducer,
    forgotUserPassword : forgotPasswordReducer


})



const middleware = [thunk];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))

export default store;