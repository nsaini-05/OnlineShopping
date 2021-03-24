import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { allOrders , clearErrors } from "../../actions/orderAction";
import Loader from "../layouts/Loader"; 
import Sidebar from './Sidebar'





const OrderList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders  } = useSelector(state => state.allOrders);


    
  
    useEffect(() => {
      dispatch(allOrders());
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

    
/*
      if(isDeleted)
      {
        alert.success("Product Deleted Successfully")
        history.push('/admin/products');
        dispatch({type: DELETE_PRODUCT_RESET})
      }

*/    }, [dispatch, alert, error,history]);

  
    const setOrders = () => {
      const data = {
        columns: [
          {
            label: 'Order ID',
            field: "id",
            sort: "asc",
          },
          {
            label: "No. of Items",
            field: "numofItems",
            sort: "asc",
          },
          {
            label: "Amount",
            field: "amount",
            sort: "asc",
          },
          {
            label: "Status",
            field: "status",
            sort: "asc",
          },
          {
            label: "Actions",
            field: "actions",
            
          },
        ],
  
        rows: [],
      };
 
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numofItems: order.orderItems.length,
          amount: `$${order.totalPrice}`,

          status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),


        actions: (<Fragment>
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
          <button className = "btn btn-danger py-1 px-2 ml-2">
            <i className="fa fa-trash"></i>
            </button>     
          </Fragment>
        )          
        });
      });
  
      return data;
    };
    
    return (

        <Fragment>
        
        <MetaData title = {'All Orders'}/>

        <div className = "row">
            <div className = "col-12 col-md-2">
                <Sidebar />

            
            </div>
            <div className = "col-12 col-md-10">
            <Fragment>
                <h1 className = "my-5">All Orders</h1>
                {loading ? <Loader></Loader> : <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />}
       
            </Fragment>
            </div>

        </div>
        

        </Fragment>
    )
}

export default OrderList
