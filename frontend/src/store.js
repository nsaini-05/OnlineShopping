import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer , productDetailReducer } from './reducers/productReducers'



const reducers = combineReducers({
    products : productsReducer ,
    productDetails : productDetailReducer   
})



const middleware = [thunk];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))

export default store;