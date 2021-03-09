import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer , productDetailReducer } from './reducers/productReducers'



const reducers = combineReducers({
    products : productsReducer ,
    productDetails : productDetailReducer   
})


let initialState = {} // this is the state of the whole application

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;