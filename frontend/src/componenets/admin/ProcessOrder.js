import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateOrder , delte , clearErrors } from "../../actions/orderAction";
import Loader from "../layouts/Loader"; 
import Sidebar from './Sidebar'
import {UPDATE_ORDER_RESET} from "../../constants/orderConstants"



import {getOrderDetails} from '../../actions/orderAction'
import { orderDetailsReducer } from "../../reducers/orderReducers";

const ProcessOrder = ({match , history}) => {


  

    const [status , setStatus] = useState("");
     const alert = useAlert();
     const dispatch = useDispatch();

    const {error , isUpdated} = useSelector(state => state.order)
     const { loading , order = {}} = useSelector(state=>state.orderDetails)
     const {shippingInfo , paymentInfo  , orderItems , totalPrice ,user} = order

    useEffect(()=>{
        dispatch(getOrderDetails(match.params.id))
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){


            history.push('/admin/orders');
                alert.success('Order updated successfully');
                dispatch({ type: UPDATE_ORDER_RESET })
    
            }

    },[dispatch, alert, error, isUpdated])




    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    
    function paymentStatus(status)
    {
        if(status === "succeeded")
            return true

        else
            return false
    }


    function orderStatus(status)
    {
        if(status === "Delivered")
            return true

        else
            return false
    }


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }




     

     



    return (<Fragment>
    <MetaData title = "Update Order" />
        <div class="row d-flex justify-content-around">
        <div class="col-12 col-lg-7 order-details">

            <h1 class="my-5">Order # {match.params.id}</h1>

            <h4 class="mb-4">Shipping Info</h4>
            <p><b>Name:</b> {user && user.name}</p>
            <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
            <p class="mb-4"><b>Address: </b>{shippingDetails}</p>
            <p><b>Amount:</b> ${totalPrice}</p>

            <hr />

            <h4 class="my-4">Payment</h4>
            <p class= {paymentInfo && paymentStatus(paymentInfo.status) ? "greenColor" : "redColor"}><b>{paymentInfo&& paymentStatus(paymentInfo.status) ? "Paid" : "Not Paid"}</b></p>
            
            <h4 class="my-4">Stripe ID</h4>
            <p ><b>{paymentInfo && paymentInfo.id}</b></p>


            <h4 class="my-4">Order Status:</h4>
            <p class= {order && orderStatus(order.orderStatus) ? "greenColor" : "redColor"} ><b>{order&& orderStatus(order.orderStatus) ? "Delivered" : "Processing"}</b></p>

            <h4 class="my-4">Order Items:</h4> 
            <div class="cart-item my-1">

            {orderItems && orderItems.map((item)=>(
                <Fragment>

                <hr />
                        <div class="row my-5" key = {item._id}>
                            <div class="col-4 col-lg-2">
                                <img src= {item.image} alt= {item.name} height="45" width="65" />
                            </div>

                            <div class="col-5 col-lg-5">
                                <Link to = {`./product/:${item._id}`}>{item.name}</Link>
                            </div>


                            <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>${item.price}</p>
                            </div>

                            <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item.quantity} Piece(s)</p>
                            </div>
                        </div>
            
          
            </Fragment>

            )) }

            </div>
            <hr />  
            

            




        </div>
        
        <div class="col-12 col-lg-3 mt-5">
                        <h4 class="my-4">Status</h4>

                        <div class="form-group">
                            <select
                                class="form-control"
                                name='status'
                                value= {status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                        <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                    </div>
        
    </div>
</Fragment>
    )
}

export default ProcessOrder

