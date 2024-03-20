import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import AdminProfile from '../Components/AdminProfile'
import AdminOverview from '../Components/AdminOverview'
import AdminUpdation from '../Components/AdminUpdation'
import AddDoctor from '../Components/AddDoctor'


function AdminDashboard({ dashboard,  profile, overview, addDoc}) {
  return (
    <>
 
      <Header dashboard/>

      <div className='admindash-main'>

        <div className='admindash-left'>
          <ul>
            <Link to={'/admin/dashboard/profile'} style={{ textDecoration: 'none', fontSize: '20px' }}><li> <i class="fa-solid fa-arrow-right me-3 text-light"></i>Profile</li></Link>

            <Link to={'/admin/dashboard/overview'} style={{ textDecoration: 'none', fontSize: '20px' }}><li> <i class="fa-solid fa-arrow-right me-3 text-light"></i>Overview</li></Link>

            <Link to={'/admin/dashboard/addDoc'} style={{ textDecoration: 'none', fontSize: '20px' }}><li> <i class="fa-solid fa-arrow-right me-3 text-light"></i>Add doctors</li></Link>

            <Link to={'/admin/dashboard/addDept'} style={{ textDecoration: 'none', fontSize: '20px' }}><li> <i class="fa-solid fa-arrow-right me-3 text-light"></i>Add departments</li></Link>

          </ul>
        </div>

        <div className='admindash-right'>

          {profile ?
            <AdminProfile />
            :
            overview ?
              <AdminOverview />
              :
              addDoc? 
              <AddDoctor/>
              :
              <AdminUpdation/>
          }

        </div>

      </div>
    </>
  )
}

export default AdminDashboard