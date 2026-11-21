import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Home() {

  const catogeries = [
    { name: "SmartPhone", image: 'https://i.pinimg.com/1200x/c1/76/4e/c1764eee04fabaa10c4ca2ccaec3b9f6.jpg' },
    { name: "Tablets", image: "https://i.pinimg.com/736x/69/c3/de/69c3de905c87376794a9a0a6c827a7e9.jpg" },
  { name: "SmartWatch", image: "https://i.pinimg.com/736x/bd/17/4e/bd174e30a5e7ca2d5d1c78f5c31334ec.jpg" }
  ]

  return (
    <>
      <Header />
      <div style={{ minHeight: '70vh' }} className='p-3'>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img src="https://i.pinimg.com/736x/23/b6/fb/23b6fbf5e5fa4192f4e206225edbcdd0.jpg" alt="banner1"
              className='d-block mx-auto' style={{ width: '70%', height: '70vh', objectFit: 'cover', objectPosition: 'center' }} />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src="https://i.pinimg.com/736x/bc/0d/cb/bc0dcbcb2c489e0105c1f8de3f34b717.jpg" alt="banner2"
              className='d-block mx-auto' style={{ width: '70%', height: '70vh', objectFit: 'cover', objectPosition: 'center' }} />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src="https://i.pinimg.com/1200x/04/ab/1f/04ab1f0d3dfadc4a6a6792098cad6267.jpg" alt="banner3"
              className='d-block mx-auto ' style={{ width: '70%', height: '70vh', objectFit: 'cover', objectPosition: 'center' }} />
          </Carousel.Item>
        </Carousel>
        <h2 className="text-center mt-5 mb-2">Categories</h2>
        <div className="d-flex justify-content-around gap-3 flex-wrap mb-5">
          {
            catogeries.map(item => (
              <Card style={{ width: '18rem' }}>
                <Link to={`/products/${item.name}`}>
                <Card.Img variant="top" src={item?.image} />
                </Link>
                <Card.Body>
                  <Card.Title className='text-center'>{item?.name}</Card.Title>
                  
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            ))
          }
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home

