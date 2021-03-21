import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
NEW_REVIEW_REQUEST,
NEW_REVIEW_SUCCESS,
NEW_REVIEW_FAIL  ,
NEW_REVIEW_RESET ,
ADMIN_PRODUCTS_FAIL,
ADMIN_PRODUCTS_REQUEST,
ADMIN_PRODUCTS_SUCCESS 
} from "../constants/productConstants";





export const productsReducer = function (state = { products: [] }, action) {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };


      case ADMIN_PRODUCTS_SUCCESS:
        return {
          loading: false,
          products: action.payload
         
        };

    case ALL_PRODUCTS_FAIL:
      case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};




export const productDetailReducer = function (state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};




export const newReviewReducer = function (state = {}, action) {


  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success : action.payload
      };

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };


      case NEW_REVIEW_RESET:
      return {
        ...state,
        success : false
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};








