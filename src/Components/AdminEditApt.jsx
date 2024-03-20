/* import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AdminEditApt({ appointment }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     // Get today's date in YYYY-MM-DD format
     const today = new Date().toISOString().split('T')[0]

     // Get the date one month from today
     const oneMonthFromNow = new Date();
     oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
     const maxDate = oneMonthFromNow.toISOString().split('T')[0];

    const [patientDetails, setpatientDetails] = useState({
        pName: "",
        pAge: "",
        pGender: "",
        pDate: "",
        pSlot: "",
        pMobNum: "",
        pEmail: "",
        pDept: "",
        pDoc: ""
    })

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

                            <input value={patientDetails.pDate} onChange={(e) => setpatientDetails({ ...patientDetails, pDate: e.target.value })} type="date" min={today} max={maxDate} />

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
                                {departments?.length > 0 ?
                                    departments?.map(item => (<option value={item.departmentName}>{item.departmentName}</option>))
                                    :
                                    <p>No departments available</p>
                                }
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
                            <button onClick={handleBook} className='bookbutton'>Book now</button>
                            <button onClick={handleClear} className='clearbutton'>Clear details</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminEditApt */