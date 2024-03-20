import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addDepartmentApi } from '../Services/allApi';
import AddDoctor from './AddDoctor';
import Swal from 'sweetalert2';
import { isAuthTokenContext } from '../Context/ContextShare';

function AdminUpdation({ doctor, addDepartment }) {

  const [token, setToken] = useState("")

  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  const [department, setDepartment] = useState({
    departmentName : ""
  })
  console.log(department);

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  // Add department
  const handleDepAdd = async (e) => {
    e.preventDefault()

    const {departmentName} = department
    if (departmentName) {
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await addDepartmentApi(department, reqHeader)
        console.log(result);

        if (result.status === 200) {
          Swal.fire({
            title: "Successfuly added!",
            icon: "success",
            timer: 2000
          });
          setDepartment({
            departmentName : ""
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

  const handleCancel =(e)=>{
    e.preventDefault()
    setDepartment({
      departmentName:""
    })
  }

  return (
    <div className='admin-updation-main mt-5'>

      <div className='addDept-main'>
      <h3>Add a department</h3>
      <form>
        <input type="text" placeholder='Enter name' value={department.departmentName} onChange={(e) => setDepartment({...department,departmentName:e.target.value})} />
        <div className='addDoc-but-div'>
          <button className='reschedule-button' onClick={handleDepAdd}>Add</button>
          <button className='cancel-button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>    

    </div>
  )
}

export default AdminUpdation