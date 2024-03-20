import React, { useState } from 'react'
import userlogo from '../Images/userlogo.png'
import { useEffect } from 'react'
import { updateProfileApi } from '../Services/allApi';
import { baseUrl } from '../Services/baseUrl';
import Swal from 'sweetalert2';

function UpdateProfile() {

    const [username, setUsername] = useState("")

    const [patientProfile, setPatientProfile] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        mobilenumber: "",
        profile: ""
    })
    console.log(patientProfile.profile);

    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username.toUpperCase())
    }, [])

    useEffect(() => {
        if (patientProfile.profile) {
            setPreview(URL.createObjectURL(patientProfile.profile))
        }
        else {
            setPreview("")
        }
    }, [patientProfile.profile])

    useEffect(() => {
        setIsUpdate(false)

        const patient = JSON.parse(sessionStorage.getItem("existingUser"))

        setPatientProfile({ ...patientProfile, username: patient.username, email: patient.email, password: patient.password, age: patient.age, mobilenumber: patient.mobilenumber, profile: "" })

        setExistingImage(patient.profile)

    }, [isUpdate])

    console.log(existingImage);

    // Update function
    const handleupdate = async () => {
        const { username, email, password, age, mobilenumber, profile } = patientProfile

        if (age && mobilenumber) {

            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("age", age)
            reqBody.append("mobilenumber", mobilenumber)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)

            const token = sessionStorage.getItem("token")

            if (preview) {

                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateProfileApi(reqBody, reqHeader)
                console.log(result);

                if (result.status === 200) {
                    sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))

                    setIsUpdate(true)

                    Swal.fire({
                        title: "Your profile has been updated successfully!",
                        icon: "success",
                        timer: 2000
                    });
                }
                else {
                    console.log(result.response.data);
                }

            }
            else {

                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateProfileApi(reqBody, reqHeader)
                console.log(result);

                if (result.status === 200) {
                    Swal.fire({
                        title: "Your profile has been updated successfully!",
                        icon: "success",
                        timer: 2000
                    });
                    sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))
                    setIsUpdate(true)
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
            <div className='dash-profile'>

                <label htmlFor="profile">
                    <input type="file" id='profile' style={{ display: 'none' }} onChange={(e) => setPatientProfile({ ...patientProfile, profile: e.target.files[0] })} />
                    {existingImage == "" ?
                        <img className='shadow rounded-circle' src={preview ? preview : userlogo} width={'100%'} />
                        :
                        <img className='shadow rounded-circle' src={preview ? preview : `${baseUrl}/Uploads/${existingImage}`} width={'100%'} height={'300px'} />
                    }
                </label>

                <div className='patient-profile'>
                    <input type="text" value={username || patientProfile.username} onChange={(e) => setPatientProfile({ ...patientProfile, })} placeholder='Name' />

                    <input type="text" placeholder='Age' value={patientProfile.age} onChange={(e) => setPatientProfile({ ...patientProfile, age: e.target.value })} />

                    <input type="text" placeholder='Mob number' value={patientProfile.mobilenumber} onChange={(e) => setPatientProfile({ ...patientProfile, mobilenumber: e.target.value })} />
                </div>

                <button onClick={handleupdate}>Update profile</button>

            </div>
        </>

    )
}

export default UpdateProfile