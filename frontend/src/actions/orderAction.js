import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
    ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,

} from "../constants/orderConstants";

import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.Message, 
    });
  }
};






 //Get Order Detail
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getOrders = () => async (dispatch) => {


  try{
    
    dispatch({type : MY_ORDERS_REQUEST})
    const {data} = await axios.get('/api/v1/orders/me');
    dispatch({type: MY_ORDERS_SUCCESS , payload : data.orders} )  
  }


  catch(error)
  {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.Message,
    });
  }
 }



//Admin 


// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {

  try {

      dispatch({ type: ALL_ORDERS_REQUEST });

      const { data } = await axios.get(`/api/v1/admin/orders`);
      dispatch({type: ALL_ORDERS_SUCCESS , payload : data}); 

  } catch (error) {
      dispatch({
          type: ALL_ORDERS_FAIL,
          payload: error.response.data.Message
      })
  }
}







//Update Order 
export const updateOrder = (id , orderData) => async (dispatch) => {
  try {
    console.log(orderData.values())
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.Message, 
    });
  }
};














export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
