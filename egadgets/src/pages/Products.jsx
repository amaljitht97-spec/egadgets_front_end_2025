import React, { useEffect,useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { productListApi } from '../services/allApis';
import { MdHeight } from 'react-icons/md';


function Products() {

  const [products,setProducts]=useState([])
  
  const {cat} = useParams()

  useEffect(()=>{
    if (sessionStorage.getItem('token')){
      getProducts()
    }
  },[])

  const getProducts = async () =>{
    const response = await productListApi(cat)
    console.log(response)
    if (response.status===200){
      setProducts(response.data)
        }
  }
  return (
    <>
      <Header />
      {/* Product List Pages */}
      <div className='p-3' style={{ minHeight: '70vh' }}>
        <h2>Products</h2>
        <div className="d-flex justify-content-around flex-wrap gap-3">
          {
            products.length > 0 ?
            <>
            {
              products.map(item=>(
                 <Card style={{ width: '18rem' }}>
            <Link to={`/detail/${item.id}`}>
            <Card.Img variant="top" src={item.image} style={{height:'300px'}} alt='product'/>
            </Link>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.price}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

              ))
            }
            </>
            :
            <h2 className='text-center text-danger'>No Product available</h2>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products