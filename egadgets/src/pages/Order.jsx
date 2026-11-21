import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { cancelOrderApi, getOrderListApi} from '../services/allApis'
import { useEffect } from 'react'
function Order() {

  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    getOrderList()
  }, [])

  const getOrderList = async () => {
    try{
        const response = await getOrderListApi()
    console.log(response)
    if (response.status === 200) {
      setOrderList(response.data)
    }
    }
    catch(error){
      console.log("Order Fetch error:",error)
    }
   
  }
  const grandTotal = orderList.reduce((total,order)=>total + Number(order.total_price),0)
  const handleOrderCancel=async(oid)=>{
    const response=await cancelOrderApi(oid)
    console.log(response)
    if(response.status===200){
      getOrderList()
    }
  }
  return (
    <>
      <Header />
      <div className='mx-auto max-w-7Xl px-4 py-8'>
        <h2 className='mb-6 text-'></h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="h-full rounded-xl border border-gray-200 bg-white p-6">
              <h3 className='mb-6 text-lg font-semibold'>
                Order Items
              </h3>
              {
                orderList.length > 0 ?
                orderList.map((order)=>(
                    <>
                    <div className="mb-5 flex items-center gap-4" key={order.id}>

                      
                      {/* product details */}
                      <div className='min-w-0 flex-1'>
                        <h4 className='mnb-1 font-semibold'>
                          order #{order.id}
                        </h4>
                        {
                          order.status == "Pending"?
                          
                          <>
                          <p className='mb-1 text-sm text-warning '>
                          Status: {order.status}
                        </p>
                        <button className='btn btn-outline-danger my-2' onClick={()=>{handleOrderCancel(order.id)}}>Cancel Order</button>
                          </>
                          :
                          <p className='mb-1 text-sm text-blue-500 '>
                          Status: {order.status}
                        </p>
                        }
                        
                        {
                          order.items.map((item)=>(
                            <div key={item.id} className='mb-5 flex'>
                              <div className='flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-lg bg-gray-100'>
                                <img src={item.product.image} alt={item.product.title} className='h-full w-full object-contain'/>
                              </div>
                              <div className='min-w-0 flex-1'>
                                <h4 className='mb-1 font-semibold'>{item.product.title}</h4>
                                <p className='mb-1 text-sm text-gray-500'>Quantity: {item.quantity}</p>
                                
                              </div>
                              <span className='shrink-0 font-semibold'>{(Number(item.price)*Number(item.quantity)).toFixed(2)}</span>
                            </div>
                          ))
                        }
                        <div className='mt-4 flex justify-between border-t pt-4'>
                          <span className='font-semibold'>
                            Order Total
                          </span>
                          <strong> {Number(order.total_price).toFixed(2)}</strong>
                          <hr className='mt-5 border-gray-200'/>
                        </div>
                      </div>
                      
                    </div>
                    <hr className='mb-5 border-gray-200' />
                  </>
                  
                ))
                :
                  <div className='d-flex justify-content-center'>
                    <img src="https://i.pinimg.com/736x/1a/89/32/1a89329644fe2cc4c74e755196c3c8b8.jpg" alt="no-order" />
                  </div>
                  
            }

              {/* product 2 row */}
              
            </div>
          </div>
          {/* Right column */}
          <div className="lg:col-span-4">
            <div className='rounded-xl border border-gray-200 bg-white p-6'>
              <h3 className='mb-6 text-lg font-semibold'>
                Order Summary
              </h3>
              {/* subtotoal */}
              <div className='mb-4 flex justify-between gap-3'>
                <span className='text-gray-600'>
                  subtotal
                </span>
                <span>{orderList.length}</span>
              </div>
              {/* shipping */}
              <div className='mb-4 flex justify-between gap-3'>
                <span className='text-gray-600'>Shipping</span>
                <span className='text-green-600 '>Free</span>
              </div>
              <hr className='mb-5 border-gray-200' />
              {/* Total */}
              <div className='mb-6 flex justify-between gap-3'>
                <strong>Grand Total</strong>
                <strong>${grandTotal.toFixed(2)}</strong>
              </div>
              {/* place order button */}
              <button className='w-full rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-gray-900 hover:bg-yellow-500'>Place Order</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Order