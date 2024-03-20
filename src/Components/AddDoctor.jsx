import React, { useEffect, useState } from 'react'
import { addDoctorApi, getDepartmentsApi } from '../Services/allApi';
import Swal from 'sweetalert2';

function AddDoctor() {

    const [token, setToken] = useState("")

    const [docDetails, setDocDetails] = useState({
        doctorName: "",
        department: "",
        age: "",
        mobnum: ""
    })
 

    const [departments, setDepartments] = useState([])
    

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        getDepartmentsDetails()
    }, [])

    // Add doctor function
    const handleDocAdd = async (e) => {
        e.preventDefault()

        const { doctorName, department, age, mobnum } = docDetails

        if (doctorName && department && age && mobnum) {
            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await addDoctorApi(docDetails, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    Swal.fire({
                        title: "Successfuly added!",
                        icon: "success",
                        timer: 2000
                    });
                    setDocDetails({
                        doctorName: "",
                        department: "",
                        age: "",
                        mobnum: "",
                        deptId: ""
                    })

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

    const handleCancel = (e) => {
        e.preventDefault()
        setDocDetails({
            doctorName: "",
            department: "",
            age: "",
            mobnum: ""
        })
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

            <div className='add-doc-main'>
                <h3>Add a doctor</h3>
                <form>
                    <div><input type="text" placeholder='Enter name' value={docDetails.doctorName} onChange={(e) => setDocDetails({ ...docDetails, doctorName: e.target.value })} /></div>

                    <div>
                        <select value={docDetails.department} onChange={(e)=>setDocDetails({...docDetails, department:e.target.value})}>
                            <option selected disabled value="">Select department</option>
                            { departments?.length>0 ?
                              departments?.map(item=>(<option value={item.departmentName}>{item.departmentName}</option>))
                                :
                                <p>No departments available</p>
                            }
                        </select>
                    </div>

                    <div><input type="text" placeholder='Enter age' value={docDetails.age} onChange={(e) => setDocDetails({ ...docDetails, age: e.target.value })} /></div>

                    <div><input type="text" placeholder='Enter mobile number' value={docDetails.mobnum} onChange={(e) => setDocDetails({ ...docDetails, mobnum: e.target.value })} /></div>

                    <div className='addDoc-but-div'>
                        <button className='reschedule-button' onClick={handleDocAdd}>Add</button>
                        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
                    </div>

                </form>
            </div>

        </>
    )
}

export default AddDoctor