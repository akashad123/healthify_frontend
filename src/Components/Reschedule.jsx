import React, { useContext } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { rescheduleAppointmentApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { rescheduleAppointmentResponseContext } from '../Context/ContextShare';

function Reschedule({ appointment, appointmentfromadmin }) {

  const { rescheduleAppointmentResponse, setRescheduleAppointmentResponse } = useContext(rescheduleAppointmentResponseContext)

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  // Get the date one month from today
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  const maxDate = oneMonthFromNow.toISOString().split('T')[0];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [patientDetails, setpatientDetails] = useState({
    id: appointment._id,
    pName: appointment.pName,
    pAge: appointment.pAge,
    pGender: appointment.pGender,
    pDate: appointment.pDate,
    pSlot: appointment.pSlot,
    pMobNum: appointment.pMobNum,
    pEmail: appointment.pEmail,
    pDept: appointment.pDept,
    pDoc: appointment.pDoc
  })

  const handleClear = (e) => {
    e.preventDefault()
    setpatientDetails({
      pName: appointment.pName,
      pAge: appointment.pAge,
      pGender: appointment.pGender,
      pDate: appointment.pDate,
      pSlot: appointment.pSlot,
      pMobNum: appointment.pMobNum,
      pEmail: appointment.pEmail,
      pDept: appointment.pDept,
      pDoc: appointment.pDoc
    })
  }

  const handleSchedule = async (e) => {
    e.preventDefault()
    const { id, pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc } = patientDetails

    if (pName && pAge && pGender && pDate && pSlot && pMobNum && pEmail && pDept && pDoc) {

      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await rescheduleAppointmentApi(id, patientDetails, reqHeader)
        console.log(result);

        if (result.status === 200) {
          Swal.fire({
            title: "Your appointment has been rescheduled successfully!",
            icon: "success",
            timer: 2000
          });

          setRescheduleAppointmentResponse(result.data)

          setTimeout(() => {
            handleClose()
          }, 2000); 

        }
        else {
          console.log(result.response.data);
        }
      }
    }
    else {
      Swal.fire({
        title: "Please fill the form completely",
        icon: "warning",
        timer: 1500
      });
    }
  }

  return (
    <>
      { appointmentfromadmin ? <button onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info"></i></button> : <button onClick={handleShow} className='reschedule-button'><i class="fa-solid fa-pen-to-square me-2"></i>Reschedule appointment</button>}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule your appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='booking'>
            <form className='mt-5'>

              <div className='mb-4'>
                <input type="text" placeholder='Full name'
                  value={patientDetails.pName} onChange={(e) => setpatientDetails({ ...patientDetails, pName: e.target.value })} />

                <input type="text" placeholder='Your age'
                  value={patientDetails.pAge} onChange={(e) => setpatientDetails({ ...patientDetails, pAge: e.target.value })} />
              </div>

              <div className='mb-4'>
                <select value={patientDetails.pGender} onChange={(e) => setpatientDetails({ ...patientDetails, pGender: e.target.value })}>
                  <option selected disabled value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>

                <input value={patientDetails.pDate} onChange={(e) => setpatientDetails({ ...patientDetails, pDate: e.target.value })} type="date" min={today} max={maxDate}/>

                <select value={patientDetails.pSlot} onChange={(e) => setpatientDetails({ ...patientDetails, pSlot: e.target.value })}>
                  <option selected disabled value="">Select time slot</option>
                  <option value="Morning | 8:00 - 12:30">Morning | 8:00 - 12:30</option>
                  <option value="Evening | 2:00 - 6:00">Evening | 2:00 - 6:00</option>
                </select>
              </div>

              <div className='mb-4'>
                <input type="text" placeholder='Your mobile number'
                  value={patientDetails.pMobNum} onChange={(e) => setpatientDetails({ ...patientDetails, pMobNum: e.target.value })} />

                <input type="email" placeholder='Your email id'
                  value={patientDetails.pEmail} onChange={(e) => setpatientDetails({ ...patientDetails, pEmail: e.target.value })} />
              </div>

              <div>
                <select value={patientDetails.pDept} onChange={(e) => setpatientDetails({ ...patientDetails, pDept: e.target.value })}>
                  <option selected disabled value="">Select department</option>
                  <option value="Specialized Medical Departments">Specialized Medical Departments</option>
                  <option value="Cancer center">Cancer center</option>
                  <option value="Women's health department">Women's health department</option>
                  <option value="Rehabiltaion department">Rehabiltaion department</option>
                  <option value="Dental Department">Dental Department</option>
                  <option value="Surgical Department">Surgical Department</option>
                  <option value="Paediatric Departmentr">Paediatric Department</option>
                  <option value="Mental Health Department">Mental Health Department</option>
                  <option value="Neurology Department">Neurology Department</option>
                </select>

                <select value={patientDetails.pDoc} onChange={(e) => setpatientDetails({ ...patientDetails, pDoc: e.target.value })}>
                  <option selected disabled value="">Select doctor</option>
                  <option value="Dr. Emily Johnson">Dr. Emily Johnson</option>
                  <option value="Dr. Michael Patel">Dr. Michael Patel</option>
                  <option value="Dr. Sarah Chang">Dr. Sarah Chang</option>
                  <option value="Dr. Christopher Nguyen">Dr. Christopher Nguyen</option>
                  <option value="Dr. Rachel Smith">Dr. Rachel Smith</option>
                  <option value="Dr. Daniel Lee">Dr. Daniel Lee</option>
                  <option value="Dr. Jessica Garcia">Dr. Jessica Garcia</option>
                  <option value="Dr. David Williams">Dr. David Williams</option>
                  <option value="Dr. Lauren Robinson">Dr. Lauren Robinson</option>
                </select>

              </div>
              <div className='d-flex justify-content-center mt-5'>
                <button onClick={handleSchedule} className='bookbutton'>Reschedule</button>
                <button onClick={handleClear} className='clearbutton'>Cancel</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Reschedule