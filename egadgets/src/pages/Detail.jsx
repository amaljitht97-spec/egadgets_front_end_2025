import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaCartPlus } from "react-icons/fa";
import { productByIdApi,addProductReviewById,addtoCartApi} from '../services/allApis';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function Detail() {

  const [product, setProduct] = useState([])
  const [review,setReview] = useState({review:""})

  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const response = await productByIdApi(id)
    console.log(response)
    if (response.status === 200) {
      setProduct(response.data)
    }
  }
  const addReview = async () =>{
    const response = await addProductReviewById(id,review)
    console.log(response)
    if (response.status === 200){
      toast.success("Review Added!!")
      getProduct()
      
    }
    else{
      toast.error("Review Adding Failed!!")
    }
  }

  const addToCart = async ()=>{
    const response=await addtoCartApi(id)
    console.log(response)
    if(response.status === 200){
      toast.success("Product Added to cart")
    }
    else{
      toast.error("somethimg went wrong!!")
    }
  }
  return (
    <>
      <Header />
      {/* Details Page */}
      <div style={{ minHeight: '70vh' }}>
        {/* product Details */}
        <div className="container-fluid row">
          <div className="col-sm-12 col-md-6 p-5 my-3">
            <img src={product?.image} alt="phone-details"
              style={{
                width: '90%',
                height: '550px',
                objectFit: 'contain'
              }} />
          </div>
          <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center p-5 my-3">
            <h1>{product?.title}</h1>
            <div className="d-flex justify-content-between my-2">
              <h4>RS.{product?.price}</h4>
              <h4><em>{product?.category}</em></h4>
            </div>
            <p style={{ textAlign: 'justify' }}>
              {product?.description}
            </p>
            <div className="my-5">
              <button className='btn btn-outline-success' onClick={addToCart}>
                <FaCartPlus />{' '}Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* review */}
        <div className='container-fluid row p-5 bg-light border border-t-1'>
          <div className="col-sm-12 col-md-4">
            {/* rivew add */}
            <h6>Add your review</h6>
            <textarea name="" id="" onChange={(e)=>{setReview({review:e.target.value})}} className='form-control'></textarea>
            <button className='btn btn-primary my-2' onClick={addReview}>Submit</button>
          </div>
          <div className='col-sm-12 col-md-8 '>
            {/* review List */}
            {
              product?.reviews?.length > 0 ?
                <>
                  {
                    product?.reviews?.map(item => (

                      <div className='border border-1 border-dark rounded p-2 mb-3'>
                        <h6 style={{ textAlign: 'justify' }}>
                         {item.review}
                        </h6>
                        <div className='d-flex justify-content-between'>

                          <p>{new Date(item.created_at).toLocaleDateString()}</p>
                        <p className='text-end'><em>- {item?.user?.first_name} {item?.user?.last_name}</em></p>
                         
                        </div>
                      </div>

                    )

                    )
                  }
                </>
                :
                <div className='text-center'>
                  <h6>No reviews</h6>
                </div>
          }

            
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Detail