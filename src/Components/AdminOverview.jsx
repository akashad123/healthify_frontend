import React, { useEffect, useState } from 'react'
import { acceptActionApi, cancelAppointmentApi, deleteDeptApi, deleteDocApi, deletePatientApi, getAppointmentApi, getAppointmentsApi, getDepartmentsApi, getDoctorstApi, getPatientsApi, rejectActionApi } from '../Services/allApi'
import AdminEditDetails from './AdminEditDetails'
import AdminEditDoc from './AdminEditDoc'
import Reschedule from './Reschedule'
import Swal from 'sweetalert2'


function AdminOverview() {

  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])

  const [isAction, setIsAction] = useState(false)

  useEffect(() => {
    getDepartmentsDetails()
    getDoctorsDetails()
    getPatientsDetails()
  }, [])

  useEffect(() => {
    setIsAction(false)
    PendingAppointments()
  }, [isAction])

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

  // Get doctors
  const getDoctorsDetails = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getDoctorstApi(reqHeader)
    setDoctors(result.data)
  }

  // Get patients
  const getPatientsDetails = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getPatientsApi(reqHeader)
    setPatients(result.data)
  }

  // Get all pending appointments
  const PendingAppointments = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getAppointmentsApi(reqHeader)
    setAppointments(result.data)
  }

  // Appointments confirmation dialog popup 
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
          title: "Deleted",
          icon: "success",
          timer: 1500
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

  // Department confirmation dialog popup
  const confirmDeleteDept = (id) => {

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

        removeDept(id)

        Swal.fire({
          title: "Deleted",
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  // Delete department
  const removeDept = async (id) => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteDeptApi(id, reqHeader)
    console.log(result);

    if (result.status === 200) {
      getDepartmentsDetails()
    }
    else {
      console.log(result.response.data);
    }
  }

  // Doctor confirmation dialog popup
  const confirmDeleteDoc = (id) => {

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

        removeDoc(id)

        Swal.fire({
          title: "Deleted",
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  // Delete doctor
  const removeDoc = async (id) => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteDocApi(id, reqHeader)
    console.log(result);

    if (result.status === 200) {
      getDoctorsDetails()
    }
    else {
      console.log(result.response.data);
    }
  }

  // Patient confirmation dialog popup
  const confirmDeletePatient = (id) => {

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

        removePatient(id)

        Swal.fire({
          title: "Deleted",
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  // Delete patient
  const removePatient = async (id) => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deletePatientApi(id, reqHeader)
    console.log(result);

    if (result.status === 200) {
      getPatientsDetails()
    }
    else {
      console.log(result.response.data);
    }
  }

  // Approve appointment confirmation dialog popup
  const confirmApproveAppt = (id) => {

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

        handleApptApprove(id)

        Swal.fire({
          title: "Appointment approved successfully",
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  // Reject appointment confirmation dialog popup
  const confirmRejectAppt = (id) => {

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

        handleApptReject(id)

        Swal.fire({
          title: "Appointment rejected successfully",
          icon: "error",
          timer: 1500
        });
      }
    });
  }

  // Accept appointment
  const handleApptApprove = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const appointment = appointments.find(app => app._id === id);
        console.log(appointment);
        if (appointment && (appointment.status === 'pending' || appointment.status === 'rejected')) {
          const acceptedAppointment = { status: 'approved' };
          const result = await acceptActionApi(id, acceptedAppointment, reqHeader);
          if (result.status === 200) {
            setIsAction(true)
          } else {
            console.log(result.response.data);
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "This appointment cannot be approved.",
            icon: "error",
            timer: 2000
          });
        }
      }
    } catch (err) {
      console.log('Appointment handling failed ', err);
    }
  }

  // Reject appointment
  const handleApptReject = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const appointment = appointments.find(app => app._id === id);
        if (appointment && (appointment.status === 'pending' || appointment.status === 'approved')) {
          const rejectedAppointment = { status: 'rejected' };
          const result = await rejectActionApi(id, rejectedAppointment, reqHeader);
          if (result.status === 200) {
            setIsAction(true)
          } else {
            console.log(result.response.data);
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "This appointment cannot be rejected.",
            icon: "error",
            timer: 2000
          });
        }
      }
    } catch (err) {
      console.log('Appointment handling failed ', err);
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return (
    <div className='admindash-overview'>

      <h1 className='text-center'>OVERVIEW</h1>

      <div className='departments'>
        <h3>Departments</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Department name</th>
              <th>Number of doctors</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {departments?.length > 0 ?
              departments.map((item, index) => (<tr>
                <td>{index + 1}</td>
                <td>{item.departmentName}</td>
                <td>2</td>
                <td className='text-center'><AdminEditDetails department={item} /></td>
                <td className='text-center'><button onClick={() => confirmDeleteDept(item._id)}><i class="fa-solid fa-xmark text-danger"></i></button></td>
              </tr>))
              :
              <p>No data available</p>
            }
          </tbody>
        </table>
      </div>

      <div className='doctors'>
        <h3>Doctors</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Doc Id</th>
              <th>Doctor name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.length > 0 ?
              doctors.map((item, index) => (<tr>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.doctorName}</td>
                <td>{item.department}</td>
                <td>{item.age}</td>
                <td className='text-center'><AdminEditDoc doctor={item} /></td>
                <td className='text-center'><button onClick={() => confirmDeleteDoc(item._id)}><i class="fa-solid fa-xmark text-danger"></i></button></td>
              </tr>))
              :
              <p>No data available</p>
            }
          </tbody>
        </table>
      </div>

      <div className='appointments-table'>
        <h3>Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Appointment id</th>
              <th>Patient name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ?
              appointments?.map((item, index) => (<tr>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.pName}</td>
                <td>{item.status}</td>

                <td className='text-center actions'> <button onClick={() => confirmApproveAppt(item._id)}><i class="fa-regular fa-circle-check text-success"></i></button> <Reschedule appointment={item} appointmentfromadmin /> <button onClick={() => confirmRejectAppt(item._id)}><i class="fa-solid fa-ban text-danger"></i></button> <button onClick={() => confirmDelete(item._id)}><i class="fa-solid fa-xmark text-danger"></i></button> </td>
              </tr>))
              :
              <p>No data available</p>
            }
          </tbody>
        </table>
      </div>

      <div className='patients'>
        <h3>Patients</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Patient Id</th>
              <th>Patient name</th>
              <th>Age</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {patients?.length > 0 ?
              patients.map((item, index) => (<tr>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.age}</td>
                <td className='text-center'><button onClick={() => confirmDeletePatient(item._id)}><i class="fa-solid fa-xmark text-danger"></i></button></td>
              </tr>))
              : <p>No data available</p>
            }
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default AdminOverview