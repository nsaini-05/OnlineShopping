import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import {updatePassword, loadUser , clearErrors} from '../../actions/userActions'


import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";



export const UpdatePassword = ({history}) => {

    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState(""); 

    const alert = useAlert();
    const dispatch = useDispatch();
   // const {user} = useSelector(state => state.auth)
   const { isUpdated, error, loading } = useSelector(
    (state) => state.user
  );



  useEffect(()=>{
   /*
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url) 
    }
    */


    if(error)
    {
        alert.error(error);
        dispatch(clearErrors());
    }


    if(isUpdated)
    {
        alert.success('Password Updated Successfully');
        dispatch(loadUser());
        history.push('/me');

        dispatch({type :  UPDATE_PASSWORD_RESET})
    }
},[dispatch , alert ,error , isUpdated , history])



const submitHandler = (event)=>{


    event.preventDefault();
    const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', newPassword);
        dispatch(updatePassword(formData));




}



    return (
        <Fragment>
            <MetaData title = "Update Password" />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit = {submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange = {event =>{setOldPassword(event.target.value)}}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange = {event =>{setNewPassword(event.target.value)}}

                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disable = {loading ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}



export default UpdatePassword;