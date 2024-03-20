import React from 'react'
import patientimg from '../Images/patientimg.jpg'
import docimg from '../Images/specialised.jpg'
import { Link } from 'react-router-dom'
import Header from './Header'

function Loginselect() {
  return (
    <>
            <Header/>

           <div className='authentication-main'>
                <div className="col-left">
                    <Link to={'/login'}><img src={patientimg} height={'300px'} width={'100%'} /></Link>
                    <p>Patient login</p>
                </div>
    
                <div className="col-right">
                    <Link to={'/admin/login'}><img src={docimg} height={'300px'} width={'100%'} /></Link>
                    <p>Admin login</p>
                </div>
           </div>
    </>
  )
} 

export default Loginselect