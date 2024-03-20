import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Authentication from './Components/Authentication';
import Loginselect from './Components/Loginselect';
import PatientDashboard from './Pages/PatientDashboard';
import { useContext } from 'react';
import { isAuthTokenContext } from './Context/ContextShare';
import AuthenticationAdmin from './Components/AuthenticationAdmin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {

  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  return (
    <>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/loginselect' element={<Loginselect />} />

        <Route path='/register' element={<Authentication register />} />

        <Route path='/login' element={<Authentication />} />

        <Route path='/admin/register' element={<AuthenticationAdmin register />} />

        <Route path='/admin/login' element={<AuthenticationAdmin />} />

        <Route path='/dashboard' element={isAuthToken ? <PatientDashboard dashboard /> : <Home />} />
        <Route path='/dashboard/bookAppointment' element={isAuthToken ? <PatientDashboard dashboard booking /> : <Home />} />
        <Route path='/dashboard/appointments' element={isAuthToken ? <PatientDashboard dashboard appointment /> : <Home />} />

        <Route path='/admin/dashboard' element={isAuthToken? <AdminDashboard dashboard /> : <Home/>} />
        <Route path='/admin/dashboard/profile' element={isAuthToken ? <AdminDashboard dashboard profile /> : <Home />} />
        <Route path='/admin/dashboard/overview' element={isAuthToken ? <AdminDashboard dashboard overview /> : <Home />} />
        <Route path='/admin/dashboard/addDoc' element={isAuthToken ? <AdminDashboard dashboard addDoc /> : <Home />} />
        <Route path='/admin/dashboard/addDept' element={isAuthToken ? <AdminDashboard dashboard /> : <Home />} />

      </Routes>

    </>
  );
}

export default App;
