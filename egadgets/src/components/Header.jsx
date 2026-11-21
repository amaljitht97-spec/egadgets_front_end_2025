import React,{useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { RiCustomerService2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
function Header() {
    const iconStyle={
        fontSize:'30px',
        color:'#BA4C11'
    }

    const [dropDown,setdropDown]=useState(false)

    const [userName,setUserName] = useState("")
    useEffect(()=>{
      if (sessionStorage.getItem('token')){
        setUserName(sessionStorage.getItem('uname'))
      }
    },[])

    const handleLogout=()=>{
      sessionStorage.clear()
      setUserName("")
      setdropDown(!dropDown)
    }
  return (
    <>
     <Navbar expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand href="/"><RiCustomerService2Fill style={iconStyle} />{' '}Egadgets</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex gap-3">
            <Link to={'/cart'} className='text-decoration-none text-dark'>Cart</Link>
            <Link to={'/order'} className='text-decoration-none text-dark'>Order</Link>
          </Nav>
          {
            userName?
            <>
            <div style={{position:'relative'}}>
              <span className='d-flex align-items-center gap-2 px-2 py-1 text-white ' ><FaRegUser />{' '}{userName}<FaChevronDown onClick={()=>{setdropDown(!dropDown)}} style={{cursor:'pointer'}} /></span>
            {
              dropDown &&
              <span style={{position:'absolute',bottom:'-40px', left:'5px', zIndex:'1',cursor:'pointer'}} className='px-3 py-1 border shadow bg-light text-primary rounded' onClick={handleLogout}>Logout</span>


            }  

            </div>

      

            </>
            :
          <Link to={'/auth'} className='btn btn-outline-light'>LOGIN</Link>

          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
     
  )
}

export default Header