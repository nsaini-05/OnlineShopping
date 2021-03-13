import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import {resetPassword, loadUser , clearErrors} from '../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'




export const NewPassword = ({history , match }) => {


    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const{isAuthenticated } = useSelector((state) => state.auth)

    if(isAuthenticated){
        history.push('/');
    }

    const alert = useAlert();
    const dispatch = useDispatch();


    const {success ,error,loading} = useSelector( state=>state.forgotUserPassword)


    useEffect(() =>{


       
        
         if(error)
         {              
           alert.error(error);
           dispatch(clearErrors());
         }

         if(success)
         {              
           alert.success('Password Update Successfully');
           history.push('/')
         }
     
     } ,[dispatch, alert,success , error, history])


     
     const  submitHandler = (event)=>{
        event.preventDefault();
        const formData = new FormData();       
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);              
        dispatch(resetPassword(match.params.token , formData))
    }






    return (
        <Fragment>
            <MetaData title = { "New Password Set"} />
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit = {submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value= {password}
                            onChange = {(event)=>{setPassword(event.target.value)}}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange = {(event) => {setConfirmPassword(event.target.value)}}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled = {loading ? true : false}
                        >
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}



export default NewPassword