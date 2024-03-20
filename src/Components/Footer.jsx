import React from 'react'
import navimage from '../Images/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='footer'>

        <div className='about-footer'>
        <div className='footer-heading'><img className='footer-logo' src={navimage}  /><h2>healthiFy</h2></div>
            <p>In the short span of its existence, we have created its niche on the map of quality healthcare delivery in South India by touching nearly 2 million lives. Having earned the trust and loyalty of patients through the compassion of its caregivers and high-precision medical technology, the institution has emerged as the leading quaternary care facility in the region</p>
        </div> 

        <div className='links-footer'>
            <h2>Useful links</h2>
            <Link className='Link'>Register</Link>
            <Link className='Link'>Login</Link>
            <Link className='Link'>Contact Us</Link>
            <Link className='Link'>FAQ's</Link>
            <Link className='Link'>Book now</Link>
        </div>

        <div className='contact-footer'> 
            <h2>Let's stay in touch</h2>
            <input type="email" placeholder='Enter your email' required/>
            <button type='submit'>Subscribe</button>
            <div className='social-icons'>
            <a><i class="fa-brands fa-facebook"></i></a>
            <a><i class="fa-brands fa-instagram"></i></a>
            <a><i class="fa-brands fa-whatsapp"></i></a>
            <a><i class="fa-brands fa-youtube"></i></a>
            </div>
        </div>
        

    </div>

    <div className='copyright'>
        <p>© healthiFy | 2024. All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer