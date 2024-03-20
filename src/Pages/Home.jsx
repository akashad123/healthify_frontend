import React from 'react'
import navimage from '../Images/logo.png'
import homevid from '../Images/home.mp4'
import homevidmob from '../Images/homemob.mp4'
import { Link } from 'react-router-dom'
import Services from '../Components/Services';
import Departments from '../Components/Departments';
import About from '../Components/About';
import Footer from '../Components/Footer';

function Home() {

  return (
    <>
    
    <div className='main'>
        <video autoPlay loop muted playsInline className='bgvideolarge'>
            <source src={homevid} type='video/mp4'/>
        </video>
        <video autoPlay loop muted playsInline className='bgvideomobile'>
            <source src={homevidmob} type='video/mp4'/>
        </video>
        
        <nav>
            <img src={navimage} className='logo' />
            <ul>
                <Link to={'/loginselect'} ><i class="fa-solid fa-user"></i><li>LOGIN/REGISTER</li></Link>
                <Link to={'/login'}><li>BOOK APPOINTMENT</li></Link>
            </ul>
        </nav>
        <p>healthiFy</p>
        <h1>YOUR HEALTH, OUR PRIORITY</h1>
    </div>
    
    <Services/>

    <Departments/>

    <About/>

    <Footer/>

    </>
  )
}

export default Home