import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Booking from '../Components/Booking';
import Appointmets from '../Components/Appointmets';
import Footer from '../Components/Footer';
import { getAppointmentApi } from '../Services/allApi';
import UpdateProfile from '../Components/UpdateProfile';

function PatientDashboard({ booking, appointment, dashboard }) {

  const [username, setUsername] = useState("")

  // Get appointments
  const getAppointments = async () => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getAppointmentApi(reqHeader)
    console.log(result);
  }

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <>
      <Header dashboard />

      <div className='dash-main'>

        <UpdateProfile />

        <div className='design'>
          <div></div>
        </div>

        {booking ?
          <Booking />
          :
          appointment ?
            <Appointmets />
            :
            <div className='dash-details'>
              <h2>Hello {username}, Start Your Wellness Journey</h2>
              <ul>
                <li><Link to={'/dashboard/bookAppointment'} className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Book an Appointment</Link></li>
                <li><Link to={'/dashboard/appointments'} className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Appointments</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Medical History</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Test Results</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Prescription Management</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Billing and Payments</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Health and Wellness Tracking</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Feedback and Surveys</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Support and FAQs</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Security and Privacy Settings</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>News & Events</Link></li>
                <li><Link className='dash-link'><i class="fa-solid fa-arrow-right me-3"></i>Settings</Link></li>
              </ul>
            </div>
        }

      </div>

      <Footer />



    </>
  )
}

export default PatientDashboard