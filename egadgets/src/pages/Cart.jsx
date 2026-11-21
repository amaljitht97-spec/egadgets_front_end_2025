import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BsTrash3Fill } from "react-icons/bs";
import { cartListApi,removeCartListApi,placeOrderApi } from '../services/allApis';
import { toast } from 'react-toastify';

function Cart() {

  const [cartList, setCartList] = useState([])

  const [selectedCartList,setSelectedCartLIst] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await cartListApi()
    console.log(response)
    if (response.status === 200) {
      setCartList(response.data)
    }
  }

  const removeCartItem = async (id)=>{
    const response= await removeCartListApi(id)
    if (response.status === 204){
      toast.success("item Deleted!!")
      getData()
    }
    else{
      toast.error("something went wrong!!")

    }  }

  const placeOrder = async ()=>{

    if(selectedCartList.length === 0){
      toast.warning("Please select products")
      return
    }
    try{
      const response = await placeOrderApi(selectedCartList)
      if(response.status === 201){
        toast.success("Order placed successfull")
        setSelectedCartLIst([])
        getData()
        console.log("order Details",response.data)
      }
    }
    catch(error){
      console.log(error.response?.data || error)
      toast.error("Something went wrong!")
    }
  }

  const handleCheckbox = (id) =>{
    setSelectedCartLIst((prev)=>{
      if(prev.includes(id)){
        return prev.filter(item => item !== id)
      }
      else{
        return [...prev,id]
       
      }
     console.log(prev)})
  }

  return (
    <>
      <Header />
      <div className="container-fluid bg-light p-4" style={{ minHeight: '70vh' }}>
        <div className="row">
          <div className="col-12 col-lg-9 ">
            <div className="bg-white p-4">
              <h2>Shopping Cart</h2>
              <hr />
              {
                cartList.length > 0 ?

                  <div className="row">
                    {
                      cartList.map(cart => (
                        <>
                        <div className='coi-12' key={cart.id}>
                          <div className='row align-items-start border-bottom py-3'>
                          <div className="col-auto">
                            <input type="checkbox" checked={selectedCartList.includes(cart.id)} 
                            onChange={()=>handleCheckbox(cart.id)}  />
                          </div>
                          {/* image */}
                          <div className="col-3 col-md-2">
                            <img src={cart.product.image} alt="cart-image"
                              className='img-fluid' />
                          </div>
                          <div className="col">
                            <h5>{cart.id}</h5>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                              <h5 className='text-purple-600 mb-0 text-lg font-semibold '>{cart.product.title}</h5>
                              <p className='mb-0 whitespace-nowrap font-bold text-red-500' >Rs:{' '}{cart.product.price}</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam excepturi natus maxime recusandae et incidunt nisi quaerat corporis odit hic, sunt optio. Deleniti distinctio excepturi eaque ex iste nisi aliquid.</p>
                              <button className='btn btn-danger ' onClick={()=>{removeCartItem(cart.id)}}>
                                <BsTrash3Fill />
                              </button>
                            </div>

                          </div>
                          </div>
                        </div>
                        </>
                        ))
                    }

                  </div>
                  :
                  <h2 className='text-center text-danger'>No item Add to Cart</h2>

              }

            </div>
          </div>
          <div className="col-12 col-lg-3  ">
            <div className="bg-white p-4 rounded border border-gray-200 ">
              <h5>Order Summary</h5>
              <div className="mb-3 flex flex-col  justify-between gap-2 ">
                <span>subtotal (1 items):{cartList.length}</span>
                <strong>Rs:{' '}{cartList.reduce((prev,item)=>prev+item.product.price,0)}</strong>
                <div className="mb-3 flex items-center gap-2">
                 
                  <button className='rounded-pill w-full bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-50052 ' onClick={placeOrder}>Place order</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Cart