import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bookAppointmentApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { getDepartmentsApi } from '../Services/allApi';
import { getDoctorsByDepartmentApi } from '../Services/allApi';

function Booking() {

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

    const [departments, setDepartments] = useState([])

    const [token, setToken] = useState("")

    /* // To hold doctors for selected departments
    const [doctors, setDoctors] = useState([]);
    console.log(doctors); */

    const [deptOnly, setDeptOnly] = useState({
        pDept: "Dental"
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        getDepartmentsDetails()
    }, [])

    /* // Fetch doctors based on selected department
    useEffect(() => {
        if (patientDetails.pDept) {
            fetchDoctors();
        }
    }, [patientDetails.pDept]); */

    /* // Fetch doctors of each department function
    const fetchDoctors = async () => {
        setDeptOnly({ pDept: patientDetails.pDept })
        console.log(deptOnly);
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const result = await getDoctorsByDepartmentApi(deptOnly, reqHeader);
            console.log(result);
            setDoctors(result.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            // Handle error
        }
    }; */

    console.log(patientDetails.pDept);

    // Clear details function
    const handleClear = (e) => {
        e.preventDefault()
        setpatientDetails({
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
    }

    // Book appointment function
    const handleBook = async (e) => {

        e.preventDefault()

        const { pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc } = patientDetails

        // Set the initial status of the appointment to "pending"
        const newAppointment = { pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc, status: "pending" };

        if (pName && pAge && pGender && pDate && pSlot && pMobNum && pEmail && pDept && pDoc) {

            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result = await bookAppointmentApi(newAppointment, reqHeader)
                console.log(result);

                if (result.status === 200) {
                    Swal.fire({
                        title: "Your appointment has been booked!",
                        icon: "success",
                        timer: 2000
                    });

                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 2000);

                }
                else {
                    Swal.fire({
                        title: `${result.response.data}`,
                        icon: "warning",
                        timer: 1500
                    });
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

    return (
        <>
            <div className='booking'>
                <div className='booking-top'>
                    <Link to={'/dashboard'}><i class="fa-solid fa-arrow-left"></i></Link>
                    <h2>General appointment</h2>
                </div>

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

                        <input value={patientDetails.pDate} onChange={(e) => setpatientDetails({ ...patientDetails, pDate: e.target.value })} type="date" min={today} max={maxDate} />

                        <select value={patientDetails.pSlot} onChange={(e) => setpatientDetails({ ...patientDetails, pSlot: e.target.value })}>
                            <option disabled value="">Select time slot</option>
                            <optgroup label="Morning">
                                <option value="8:00 - 8:30">8:00 - 8:30</option>
                                <option value="8:30 - 9:00">8:30 - 9:00</option>
                                <option value="9:00 - 9:30">9:00 - 9:30</option>
                                <option value="9:30 - 10:00">9:30 - 10:00</option>
                                <option value="10:00 - 10:30">10:00 - 10:30</option>
                                <option value="10:30 - 11:00">10:30 - 11:00</option>
                                <option value="11:00 - 11:30">11:00 - 11:30</option>
                                <option value="11:30 - 12:00">11:30 - 12:00</option>
                            </optgroup>
                            <optgroup label="Evening">
                                <option value="2:00 - 2:30">2:00 - 2:30</option>
                                <option value="2:30 - 3:00">2:30 - 3:00</option>
                                <option value="3:00 - 3:30">3:00 - 3:30</option>
                                <option value="3:30 - 4:00">3:30 - 4:00</option>
                                <option value="4:00 - 4:30">4:00 - 4:30</option>
                                <option value="4:30 - 5:00">4:30 - 5:00</option>
                                <option value="5:00 - 5:30">5:00 - 5:30</option>
                                <option value="5:30 - 6:00">5:30 - 6:00</option>
                            </optgroup>
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
                                <option disabled>No departments available</option>
                            }
                        </select>

                        {/*  <select
                            value={patientDetails.pDoc}
                            onChange={(e) => setpatientDetails({ ...patientDetails, pDoc: e.target.value })}
                        >
                            <option selected disabled value="">
                                Select doctor
                            </option>
                            {doctors?.length > 0 ? (
                                doctors.map((doctor) => (
                                    <option value={doctor.name}>
                                        {doctor.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No doctors available for selected department</option>
                            )}
                        </select> */}

                    </div>
                    <div className='d-flex justify-content-center mt-5'>
                        <button onClick={handleBook} className='bookbutton'>Book now</button>
                        <button onClick={handleClear} className='clearbutton'>Clear details</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Booking