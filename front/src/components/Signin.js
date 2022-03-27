import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import UsersContext from '../context/users/UsersContext';
import AppContext from '../context/appState/AppContext';

export default function Signin() {

  const { Cookies, retrieveUserInfo }=useContext( UsersContext );
  const { showAlert }=useContext( AppContext );
  const [ credentials, setCredentials ]=useState( {
    phone: "",
    password: ""
  } );

  const navigate=useNavigate();

  // let userId;

  const handleLogin=async ( e ) => {
    e.preventDefault();
    const res=await Api.post( 'users/login', credentials );
    console.log( res.data );
    console.log( res.data.data );

    if ( res.data.status==="success" ) {

      Cookies.set( 'jwt', res.data.token );
      console.log( Cookies.get( 'jwt' ) )
      showAlert( "Logged in successfully", "success" );

      await retrieveUserInfo( res.data.data.user._id );
      if ( res.data.data.user.role==='doctor' ) {
        navigate( '/dashboard' );

      }
      else {
        navigate( '/' );

      }

    }


  }


  const onChange=( e ) => {
    setCredentials( { ...credentials, [ e.target.name ]: e.target.value } )
  }


  return (
<section className="sign-in">
  <div className="signin-content">
    <div className="signin-image">
      <figure><img src={require('../img/signin-image.jpg')} alt="sing up image" /></figure>
          <Link to="/signup" className="signup-image-link">Create an account</Link>
    </div>
    <div className="signin-form">
          <h2 className="form-title" >Sign in</h2>

          <form onSubmit={handleLogin} className="register-form" id="login-form" >
        <div className="form-group">
          <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
              <input type="tel" name="phone" id="phone" onChange={onChange} placeholder="Mobile number" />
        </div>
        <div className="form-group">
          <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
              <input type="password" name="password" onChange={onChange} id="your_pass" placeholder="Password" />
            </div>

        <div className="form-group form-button">
              <input type="submit" id="signin" className="form-submit" defaultValue="Log in" />
        </div>
      </form>
    </div>
  </div>
</section>

)
}
