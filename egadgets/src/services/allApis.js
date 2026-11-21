import { data } from "react-router-dom"
import base_url from "./base_url"
import commonApi from "./commonApi"

// user signup

export const userSignUpApi = async(data) =>{
    return await commonApi(`${base_url}/signup/`,"POST",data,"")
}

// user signin 

export const userSignInApi = async(data) =>{
    return await commonApi(`${base_url}/token`,"POST",data,"")
}

export const productListApi = async(category)=>{

    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/products/?category=${category}`,"GET",{},header)
}

export const productByIdApi = async (id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/products/${id}/`,"GET",null,header)
}

export const addProductReviewById = async (id,data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/products/${id}/addreview/`,"POST",data,header)
}

// add product to cart

export const addtoCartApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/products/${id}/addtocart/`,"POST",{},header)
}

// get cart List

export const cartListApi = async ()=>{
    const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/cartlist/`,"GET",{},header)
}

export const removeCartListApi = async (id)=>{
    const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/cartlist/${id}/`,"DELETE",{},header)
}

export const placeOrderApi = async (cart_ids)=>{
    const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/cartlist/placeorder/`,"POST",{cart_ids:cart_ids},header)
}

export const getOrderListApi = async () => {
    const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/orders/`,"GET",{},header)
}

export const cancelOrderApi = async(oid)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/orders/${oid}/cancelorder/`,"PATCH",{"status":"Cancelled"},header)
}