import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"


/* USER-SIDE */

// Register api
export const registerApi = async (patients) => {
    return await commonApi('POST', `${baseUrl}/patient/register`, patients, "")
}

// Login api
export const loginApi = async (patients) => {
    return await commonApi('POST', `${baseUrl}/patient/login`, patients, "")
}

// Book appointment api
export const bookAppointmentApi = async (appointments, reqHeader) => {
    return await commonApi('POST', `${baseUrl}/patient/appointment/book`, appointments, reqHeader)
}

// Get appointment api
export const getAppointmentApi = async (reqHeader) => {
    return await commonApi('GET', `${baseUrl}/patient/get-appointments`, "", reqHeader)
}

// Get doctors of selected departments api
export const getDoctorsByDepartmentApi = async (deptDetails, reqHeader) => {
    return await commonApi('GET', `${baseUrl}/department/get-doctor`, deptDetails, reqHeader)
}

// Reschedule appointment api
export const rescheduleAppointmentApi = async (appointmentId, reqBody, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('PUT', `${baseUrl}/appointment/reschedule/${appointmentId}`, reqBody, reqHeader)
}

// Cancel appointment api
export const cancelAppointmentApi = async (appointmentId, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('DELETE', `${baseUrl}/appointment/cancel/${appointmentId}`, {}, reqHeader)
}

// Update profile api
export const updateProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${baseUrl}/patient/editDetails`, reqBody, reqHeader)
}

/* ADMIN-SIDE */

// Register api
export const adminRegisterApi = async (admin) => {
    return await commonApi('POST', `${baseUrl}/admin/register`, admin, "")
}

// Login api
export const adminLoginApi = async (admin) => {
    return await commonApi('POST', `${baseUrl}/admin/login`, admin, "")
}

// Add department api
export const addDepartmentApi = async (department, reqHeader) => {
    return await commonApi('POST', `${baseUrl}/admin/department/add`, department, reqHeader)
}

// Add doctor api
export const addDoctorApi = async (doctor, reqHeader) => {
    return await commonApi('POST', `${baseUrl}/admin/doctor/add`, doctor, reqHeader)
}

// Get departments api
export const getDepartmentsApi = async (reqHeader) => {
    return await commonApi('GET', `${baseUrl}/admin/get-departments`, "", reqHeader)
}

// Get doctors api
export const getDoctorstApi = async (reqHeader) => {
    return await commonApi('GET', `${baseUrl}/admin/get-doctors`, "", reqHeader)
}

// Get patients api
export const getPatientsApi = async (reqHeader) => {
    return await commonApi('GET', `${baseUrl}/admin/get-patients`, "", reqHeader)
}

// Get appointments api
export const getAppointmentsApi = async (reqHeader) => {
    return await commonApi('GET', `${baseUrl}/admin/get-appointments`, "", reqHeader)
}

// Admin edit - dept details api
export const adminEditDeptApi = async (deptId, reqBody, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('PUT', `${baseUrl}/adminedit/department/${deptId}`, reqBody, reqHeader)
}

// Admin edit - doc details api
export const adminEditDocApi = async (docId, reqBody, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('PUT', `${baseUrl}/adminedit/doctor/${docId}`, reqBody, reqHeader)
}

// Admin delete appointment api
export const deleteDeptApi = async (deptId, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('DELETE', `${baseUrl}/department/cancel/${deptId}`, {}, reqHeader)
}

// Admin delete doctors api
export const deleteDocApi = async (docId, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('DELETE', `${baseUrl}/doctor/cancel/${docId}`, {}, reqHeader)
}

// Admin delete patients api
export const deletePatientApi = async (patId, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('DELETE', `${baseUrl}/patient/cancel/${patId}`, {}, reqHeader)
}

// Admin edit - accept appointment action api
export const acceptActionApi = async (appId, reqBody, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('PUT', `${baseUrl}/adminedit/accept-appointment/${appId}`, reqBody, reqHeader)
}

// Admin edit - reject appointment action api
export const rejectActionApi = async (appId, reqBody, reqHeader) => {
    // Id is passed as path parametre (put : in backend code)
    return await commonApi('PUT', `${baseUrl}/adminedit/reject-appointment/${appId}`, reqBody, reqHeader)
}