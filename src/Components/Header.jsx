import React, { useContext } from 'react'
import navimage from '../Images/logo.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';

function Header({dashboard}) {

  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()

  const handlelogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)
  }

  return (
    <>
    <Navbar style={{backgroundColor:'#222', color:'#222'}}>
        <Container>
          <Navbar.Brand href="/login">
            <img
              alt=""
              src={navimage}
              width="40"
              height="40" 
              className="d-inline-block align-center me-2"
            />
            <span className='text-light'>healthiFy</span>
          </Navbar.Brand>
          <Nav className="me-end">
          { dashboard?
            <Link className='header-link d-flex align-items-center'>
          <i class="fa-solid fa-right-from-bracket"></i>
              <Nav.Link onClick={handlelogout} className='text-light'>Logout</Nav.Link>
          </Link>
          :
          <Link to={'/'} className='header-link d-flex align-items-center'>
            <i class="fa-solid fa-house"></i>
              <Nav.Link className='text-light'>Home</Nav.Link>
          </Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header