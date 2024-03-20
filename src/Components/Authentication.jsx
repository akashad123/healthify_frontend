import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { isAuthTokenContext } from '../Context/ContextShare';

function Authentication({ register }) {

    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);

    const [patData, setPatData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State to manage showing password

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password } = patData;

        if (username && email && password) {
            const result = await registerApi(patData);
            console.log(result);
            if (result.status === 200) {
                Swal.fire({
                    title: 'Registered successfully !',
                    icon: 'success',
                    timer: 2000
                });
                setPatData({
                    username: '',
                    email: '',
                    password: ''
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                Swal.fire({
                    title: `${result.response.data}`,
                    icon: 'warning',
                    timer: 1500
                });
            }
        } else {
            Swal.fire({
                title: 'Please fill the form completely',
                icon: 'warning',
                timer: 1500
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = patData;
        if (email && password) {
            const result = await loginApi(patData);
            console.log(result);

            if (result.status === 200) {
                setIsAuthToken(true);
                sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser));
                sessionStorage.setItem('token', result.data.token);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                });

                setPatData({
                    username: '',
                    email: '',
                    password: ''
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                Swal.fire({
                    title: `${result.response.data}`,
                    icon: 'warning',
                    timer: 1500
                });
            }
        } else {
            Swal.fire({
                title: 'Please fill the form completely',
                icon: 'warning',
                timer: 1500
            });
        }
    };

    return (
        <>
            <Header />

            <div className="login-main">
                <div className="form">
                    <form className="shadow">
                        <h3>{register ? 'Sign up to your account' : 'Sign in to your account'}</h3>
                        <h4>{register ? 'Kindly enter your details to register' : 'Welcome back !'}</h4>
                        {register && (
                            <input
                                className="shadow loginput"
                                type="text"
                                placeholder="Enter patient name"
                                value={patData.username}
                                onChange={(e) => setPatData({ ...patData, username: e.target.value })}
                            />
                        )}
                        <input
                            className="shadow loginput"
                            type="email"
                            placeholder="Enter email"
                            value={patData.email}
                            onChange={(e) => setPatData({ ...patData, email: e.target.value })}
                        />
                        <input
                            className="shadow loginput"
                            type={showPassword ? 'text' : 'password'} // Dynamically set type based on showPassword state
                            placeholder="Enter password"
                            value={patData.password}
                            onChange={(e) => setPatData({ ...patData, password: e.target.value })}
                        />
                        <div className='showpassword'>
                            <label htmlFor="showPasswordCheckbox">
                                {showPassword ?
                                    <i onClick={() => setShowPassword(!showPassword)} class="fa-solid fa-eye"></i>
                                    :
                                    <i onClick={() => setShowPassword(!showPassword)} class="fa-solid fa-eye-slash"></i>}
                            </label>
                        </div>

                        {register ? (
                            <div className="button-text">
                                <button onClick={handleRegister}>Register</button>
                                <p>
                                    Already a user? Click here to <Link className="link-text" to={'/login'}>login</Link>
                                </p>
                            </div>
                        ) : (
                            <div className="button-text">
                                <button onClick={handleLogin}>Login</button>
                                <p>
                                    New user? Click here to <Link className="link-text" to={'/register'}>register</Link>
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Authentication;
