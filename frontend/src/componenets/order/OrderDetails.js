import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'




const OrderDetails = ({match}) => {

    //Essential imports 

    const alert = useAlert();
    const dispatch = useDispatch();

    //state loading 


    const {loading , error , order = {} } = useSelector(state => state.orderDetails)
    const {shippingInfo , paymentInfo  , orderItems , totalPrice} = order
    const {user} = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

       if(error)
       {
           alert.error(error)
           dispatch(clearErrors())
       }



    }, [dispatch , alert, error , match.params.id]) 



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


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div class="row d-flex justify-content-between">
                    <div class="col-12 col-lg-8 mt-5 order-details">

                        <h1 class="my-5">Order # {order._id}</h1>

                        <h4 class="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p class="mb-4"><b>Address:</b>{shippingDetails}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 class="my-4">Payment</h4>
                        <p class= {paymentInfo && paymentStatus(paymentInfo.status) ? "greenColor" : "redColor"}><b>{paymentInfo&& paymentStatus(paymentInfo.status) ? "Paid" : "Not Paid"}</b></p>


                        <h4 class="my-4">Order Status:</h4>
                        <p class= {order && orderStatus(order.orderStatus) ? "greenColor" : "redColor"} ><b>{order&& orderStatus(order.orderStatus) ? "Delivered" : "Processing"}</b></p>

                        <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">




                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}




                            </div>
                            <hr />
                        </div>
                    </div>
                       

            </Fragment>} 
        </Fragment>
    )
}

export default OrderDetails
