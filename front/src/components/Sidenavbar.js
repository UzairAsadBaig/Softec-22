import React, { useContext } from "react";
import { Link, Outlet } from 'react-router-dom'
import './../css/sideNavbar.css'
import { useLocation } from 'react-router-dom'
// import UsersContext from '../context/users/UsersContext';


export default function Sidenavbar() {
  const location=useLocation();
  // const { user }=useContext( UsersContext )

  const user ={
     name:'Uzair'
  }
  return (

    <>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-3">
            <a href="#" className="img_img logo  rounded-circle mb-5" />

            <ul className="list-unstyled components mb-5">
              <li className={`${location.pathname.endsWith( "profile" )||location.pathname.endsWith( '/' )||location.pathname.endsWith( 'd' )? "active":''}`}>
                <Link to='/dashboard/profile'>Profile</Link>
              </li>
              <li className={`${location.pathname.endsWith( "clinic" )? "active":''}`}>
                <Link to='/dashboard/clinic'>Clinic</Link>
              </li>
              <li className={`${location.pathname.endsWith( "booking" )? "active":''}`}>
                <Link to='/dashboard/booking'>Booking</Link>
              </li>


              {/* <li className={`${location.pathname.endsWith("flexes")? "active": ''}`}>
          <Link to="/dashboard/flexes">Flexes</Link>
        </li>
        <li className={`${location.pathname.endsWith("digitalpages")? "active": ''}`}>
          <Link to="/dashboard/digitalpages">Digital Pages</Link>
        </li> */}
              {/* <li className={`${location.pathname.endsWith("complaints")? "active": ''}`}>
          <Link to='/dashboard/complaints'>Complaints</Link>
        </li> */}
              {/* <li className={`${location.pathname.endsWith("approvalrequests")? "active": ''}`}>
          <Link to="approvalrequests">Approval Requests</Link>
        </li> */}
            </ul>
          </div>
        </nav>


        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-light dashboard_nav">
            <div className="container-fluid">
              <span className="text-black">CureMD</span>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">{user.name}</a>
                  </li>

                </ul>
              </div>
            </div>
          </nav>
          <div className='content_container' style={{'overflowX':'hidden'}}>
           {<Outlet />}
          </div>
        </div>
      </div>

    </>

  )
}
