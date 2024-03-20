import React, { useContext, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { adminLoginApi, adminRegisterApi } from '../Services/allApi'
import { isAuthTokenContext } from '../Context/ContextShare'


function AuthenticationAdmin({ register }) {

    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

    const [showPassword, setShowPassword] = useState(false); // State to manage showing password


    const [adminDetails, setAdminDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    console.log(adminDetails);

    // Register function
    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = adminDetails
        if (username && email && password) {
            const result = await adminRegisterApi(adminDetails)
            console.log(result);
            if (result.status === 200) {
                Swal.fire({
                    title: "Registered successfully !",
                    icon: "success",
                    timer: 2000
                });
                setAdminDetails({
                    username: "", email: "", password: ""
                })
                setTimeout(() => {
                    navigate('/admin/login')
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
        else {
            Swal.fire({
                title: "Please fill the form completely",
                icon: "warning",
                timer: 1500
            });
        }
    }

    // Login function
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = adminDetails
        if (email && password) {
            const result = await adminLoginApi(adminDetails)
            console.log(result);
            if (result.status === 200) {
                setIsAuthToken(true)
                // Store data in session storage
                sessionStorage.setItem("existingAdmin", JSON.stringify(result.data.existingAdmin))
                sessionStorage.setItem("token", result.data.token)

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 1500
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });

                setAdminDetails({
                    username: "", email: "", password: ""
                })

                setTimeout(() => {
                    navigate('/admin/dashboard/profile')
                }, 1500);

            }
            else {
                Swal.fire({
                    title: `${result.response.data}`,
                    icon: "warning",
                    timer: 1500
                });
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
            <Header />

            <div className='login-main'>

                <div className='form'>
                    <form className='shadow'>

                        <h3>
                            {
                                register ? "Sign up to your account" : "Sign in to your account"
                            }
                        </h3>
                        <h4>
                            {register ? "Be an admin" : "Welcome back admin!"}
                        </h4>

                        {
                            register &&
                            <input className='shadow loginput' type="text" placeholder='Enter name' value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} />
                        }

                        <input className='shadow loginput' type="email" placeholder='Enter email' value={adminDetails.email} onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })} />

                        <input className='shadow loginput' type={showPassword ? 'text' : 'password'} placeholder='Enter password' value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} />

                        <div className='showpassword'>
                           <label htmlFor="showPasswordCheckbox">
                            { showPassword ?
                                <i onClick={() => setShowPassword(!showPassword)} class="fa-solid fa-eye"></i>
                                        :
                            <i  onClick={() => setShowPassword(!showPassword)} class="fa-solid fa-eye-slash"></i>}
                           </label>
                        </div>

                        {register ?
                            <div className='button-text'>
                                <button onClick={handleRegister}>Register</button>
                                <p>Already a user? Click here to <Link to={'/admin/login'} className='link-text'>login</Link></p>
                            </div>
                            :
                            <div className='button-text'>
                                <button onClick={handleLogin}>Login</button>
                                <p>New user? Click here to <Link to={'/admin/register'} className='link-text'>register</Link></p>
                            </div>}

                    </form>
                </div>

            </div>
        </>
    )
}

export default AuthenticationAdmin