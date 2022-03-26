import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UsersContext from '../context/users/UsersContext';



const Navbar=() => {
  const { user }=useContext( UsersContext )
  console.log( user )

  const goTODashboard=( e ) => {

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
        <a className="navbar-brand" href="/">Health Care</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto ">
        <li className="nav-item mx-4">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item dropdown mx-4">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>

                {user.name}
          </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="/">Logout</a></li>
          </ul>
        </li>
        <li className="nav-item mx-4">

              {user.role==='doctor'? <button type="button" className="btn btn-primary">My Bookings</button>:<button type="button" className="btn btn-primary" onCLick={goTODashboard}>Dashboard</button>}
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar