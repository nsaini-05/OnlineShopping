import React, {Fragment  , useState} from 'react'
import {Link} from 'react-router-dom'
import MetaData from "../layouts/MetaData";
import {useDispatch , useSelector} from 'react-redux'
import {saveShippingInfo} from '../../actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

import {countries} from 'countries-list'
const countryList = Object.values(countries);




export const Shipping = ({history}) => {

    const {shippingInfo} = useSelector(state => state.cart)
    
    const [address ,setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode , setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo , setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country , setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();



    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingInfo({address , city , postalCode , phoneNo, country}));
        history.push('/confirm')     
    }



    return (
        <Fragment>
        <MetaData title = {"Shipping Information"} />
        <CheckoutSteps shipping />

<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange = {(event) =>  {setAddress(event.target.value)}}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange  = {(event) =>  {setCity(event.target.value)}}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange = {(event) =>  {setPhoneNo(event.target.value)}}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="string"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange = {(event) =>  {setPostalCode(event.target.value)}}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange = {(event) =>  {setCountry(event.target.value)}}
                                defaultValue = "United States of America"
                                required
                            >


                            {countryList.map((country)=><option key = {country.name} value = {country.name}>{country.name}</option>)}






                            </select>



                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            onClick = {submitHandler}
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}


export default Shipping