import React, { useEffect, useState } from 'react'
import navimage from '../Images/logo.png'

function AdminProfile() {

  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(JSON.parse(sessionStorage.getItem("existingAdmin")).username.toUpperCase())
  }, [])

  return (
    <div className='admindash-profile'>
      <div >
        <div className='footer-heading'><img className='footer-logo' src={navimage} /><h2>healthiFy</h2></div>
        <p>In the short span of its existence, we have created its niche on the map of quality healthcare delivery in South India by touching nearly 2 million lives. Having earned the trust and loyalty of patients through the compassion of its caregivers and high-precision medical technology, the institution has emerged as the leading quaternary care facility in the region</p>
      </div>
      <div><h1 className='text-center'>HELLO {username}</h1></div>
      <div><p>Welcome, Admin! We're excited to have you on board with us. As the admin, you hold the keys to our hospital's operations. With your overarching authority, you can effortlessly add doctors, create departments, schedule appointments, and delve into the complete details of our hospital. Your pivotal role ensures smooth functionality and efficient management. Thank you for joining us in our mission to provide top-notch healthcare services.</p></div>

    </div>
  )
}

export default AdminProfile