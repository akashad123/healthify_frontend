import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { adminEditDeptApi } from '../Services/allApi';

function AdminEditDetails({ department }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deptDetails, setDeptDetails] = useState({
    id: department ? department._id : '',
    departmentName: department ? department.departmentName : ''
  })

  // Clear changes
  const handleClear = (e) => {
    e.preventDefault()
    setDeptDetails({
      id: department ? department._id : '',
      departmentName: department ? department.departmentName : ''
    })
  }

  // Edit function
  const handleEdit = async (e) => {
    e.preventDefault()
    const { id, departmentName } = deptDetails

    if (departmentName) {

      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await adminEditDeptApi(id, deptDetails, reqHeader)
        console.log(result);

        if (result.status === 200) {
          Swal.fire({
            title: "Changes have been successfully made!",
            icon: "success",
            timer: 2000
          });

          /* setRescheduleAppointmentResponse(result.data) */

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
      <button onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info"></i></button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='edit-dept'>
            <div>
              <input value={deptDetails.departmentName}
                onChange={(e) => setDeptDetails({ ...deptDetails, departmentName: e.target.value })} type="text" placeholder='Enter department name' />
            </div>
            <div className='addDoc-but-div'>
              <button onClick={handleEdit} className='reschedule-button'>Edit changes</button>
              <button onClick={handleClear} className='cancel-button'>Cancel changes</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AdminEditDetails