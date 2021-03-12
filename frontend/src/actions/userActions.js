import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,  
  LOAD_USER_FAIL,

  
LOGOUT_USER_SUCCESS ,
LOGOUT_USER_FAIL

} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {



    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const register = (userData) => async (dispatch) => {
    try {  
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        "/api/v1/user/register",
       userData,
        config
      );
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  
export const loadUser = () => async (dispatch) => {
  try {  
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type:  LOAD_USER_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};









export const logout = () => async (dispatch) => {
  try {  

    const { data } = await axios.get("/api/v1/user/logout");

    dispatch({ type:  LOGOUT_USER_SUCCESS});

  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};







export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};






