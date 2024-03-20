import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { adminEditDocApi, getDepartmentsApi } from '../Services/allApi';

function AdminEditDoc({ doctor }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [token, setToken] = useState("")

    const [departments, setDepartments] = useState([])

    const [docDetails, setDocDetails] = useState({
        id: doctor ? doctor._id : '',
        doctorName: doctor ? doctor.doctorName : '',
        department: doctor ? doctor.department : '',
        age: doctor ? doctor.age : '',
        mobnum: doctor ? doctor.mobnum : '',
    })

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        getDepartmentsDetails()
    }, [])

    // Get departments
    const getDepartmentsDetails = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getDepartmentsApi(reqHeader)
        setDepartments(result.data)
    }

    // Edit function
    const handleEdit = async (e) => {
        e.preventDefault()
        const { id, doctorName, department, age, mobnum } = docDetails

        if (doctorName && department && age && mobnum) {

            const token = sessionStorage.getItem("token")

            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result = await adminEditDocApi(id, docDetails, reqHeader)
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
                        <div><input type="text" placeholder='Enter name' value={docDetails.doctorName} onChange={(e) => setDocDetails({ ...docDetails, doctorName: e.target.value })} /></div>

                        <div>
                            <select name="" id="">
                                <option selected disabled>Select department</option>
                                {departments?.length > 0 ?
                                    departments?.map(item => (
                                        <option value={item.departmentName}>{item.departmentName}</option>))
                                    :
                                    <p>No departments available</p>
                                }
                            </select>
                        </div>

                        <div><input type="text" placeholder='Enter age' value={docDetails.age} onChange={(e) => setDocDetails({ ...docDetails, age: e.target.value })} /></div>

                        <div><input type="text" placeholder='Enter mobile number' value={docDetails.mobnum} onChange={(e) => setDocDetails({ ...docDetails, mobnum: e.target.value })} /></div>

                        <div className='addDoc-but-div'>
                            <button onClick={handleEdit} className='reschedule-button'>Edit changes</button>
                            <button className='cancel-button'>Cancel changes</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminEditDoc