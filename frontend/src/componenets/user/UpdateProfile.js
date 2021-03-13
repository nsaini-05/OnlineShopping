import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";

import {updateProfile, loadUser , clearErrors} from '../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";




export const UpdateProfile = ({history}) =>{

    const [email , setEmail] = useState("");
    const [name , setName] = useState(""); 
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(
      '/images/default_avatar.png'
    );
    const alert = useAlert();

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    const { isUpdated, error, loading } = useSelector(
        (state) => state.user
      );

      useEffect(()=>{
          if(user){
              setName(user.name);
              setEmail(user.email);
              setAvatarPreview(user.avatar.url) 
          }


          if(error)
          {
              alert.error(error);
              dispatch(clearErrors());
          }


          if(isUpdated)
          {
              alert.success('User Updated Successfully');
              dispatch(loadUser());
              history.push('/me');

              dispatch({type :  UPDATE_PROFILE_RESET})
          }
      },[dispatch , alert ,error , isUpdated , history])


      const submitHandler = (e) => {
        e.preventDefault();    
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);    
        dispatch(updateProfile(formData))
    }



 
    
  const onChange = e => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result) 
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    } 


return(
    <Fragment>
    <MetaData title = "Update Profile" />
<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit = {submitHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value= {name}
                                onChange = {(event)=>setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label  htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange = {(event)=>setEmail(event.target.value)}

                            />
                        </div>

                        <div className='form-group'>
                            <label  htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src= {avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept = "images/*"
                                        onChange = {onChange}
                                    />
                                    <label className='custom-file-label' for='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disable = {loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>

</Fragment>)
}




export default UpdateProfile