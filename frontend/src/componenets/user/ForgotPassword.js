import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import {forgotPassword, loadUser , clearErrors} from '../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'


export const ForgotPassword = ({history}) => {
   
    const [email , setEmail] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const{isAuthenticated } = useSelector((state) => state.auth)
    const {message ,error,loading} = useSelector( state=>state.forgotUserPassword)


    
    useEffect(() =>{


        if(isAuthenticated){
            history.push('/');
        }
        
         if(error)
         {              
           alert.error(error);
           dispatch(clearErrors());
         }

         if(message)
         {              
           alert.success(message);
           dispatch(clearErrors());
         }
     
     } ,[dispatch, alert,message, isAuthenticated, error, history])
  

   
     const  submitHandler = (event)=>{
        event.preventDefault();
        const formData = new FormData();       
        formData.set('email', email);      
        dispatch(forgotPassword(formData))
    }

   
   
    return (
        <Fragment>
        <MetaData title = {"Forgot Passsword "} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit = {submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value= {email}
                                onChange = {(event)=>{setEmail(event.target.value)}}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled = {loading ? true : false}
                            >
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}



export default ForgotPassword