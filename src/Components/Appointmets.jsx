import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelAppointmentApi, getAppointmentApi } from '../Services/allApi'
import Reschedule from './Reschedule'
import { rescheduleAppointmentResponseContext } from '../Context/ContextShare'
import Swal from 'sweetalert2'

function Appointmets() {

  const { rescheduleAppointmentResponse, setRescheduleAppointmentResponse } = useContext(rescheduleAppointmentResponseContext)

  // To hold data of appointments - array of objects
  const [appointments, setAppointments] = useState([])

  // Get appointments
  const getAppointments = async () => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getAppointmentApi(reqHeader)
    setAppointments(result.data)
  }
  console.log(appointments);

  // Confirmation dialog popup
  const confirmDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        handleCancelAppointment(id)

        Swal.fire({
          title: "Cancelled!",
          text: "Your appointment has been cancelled.",
          icon: "success"
        });
      }
    });
  }

  // Cancel appointments
  const handleCancelAppointment = async (id) => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await cancelAppointmentApi(id, reqHeader)
    console.log(result);

    if (result.status === 200) {
      getAppointments()
    }
    else {
      console.log(result.response.data);
    }
  }

  useEffect(() => {
    getAppointments()
  }, [rescheduleAppointmentResponse])
 
  return (
    <>
      <div className='appointments'>
        <div className='appointments-head'>
          <Link to={'/dashboard'}><i class="fa-solid fa-arrow-left"></i></Link>
          <h2>Your bookings</h2>
        </div>
        {appointments?.length > 0 ? (
          appointments.map((item) => (
            item.status === 'approved' ? (
              <div className='appoitment-details shadow rounded'>
                <div>
                  <p>Name : {item.pName}</p>
                  <p>Department : {item.pDept}</p>
                  <p>Doctor - {item.pDoc}</p>
                  <p>Slot - {item.pSlot}</p>
                </div>
                <div className='appointments-footer'>
                  <div><Reschedule appointment={item} /></div>
                  <div><button onClick={() => confirmDelete(item._id)} className='cancel-button'><i class="fa-solid fa-xmark me-2"></i>Cancel appointment</button></div>
                </div>
              </div>
            ) : item.status === 'pending' ? (
              <p>{item.pName}'s appointment is pending approval</p>
            ) : (
              <p>{item.pName}'s appointment has been rejected</p>
            )
          ))
        ) : (
          <p>You have no appointments</p>
        )}
      </div>


    </>
  )
}

export default Appointmets