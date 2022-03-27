import React, { useState, useContext, useRef } from 'react';
import '../css/signup.css';
import {FormDropdown} from './FormDropdown' 
// import '../img/signup-image.jpg'
import UsersContext from '../context/users/UsersContext';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import AppContext from '../context/appState/AppContext';


export default function Signup() {
  const [ USER, setUser ]=useState( 'patient' );
  const firstForm=useRef( null );
  const secForm=useRef( null );


  const { Cookies, retrieveUserInfo }=useContext( UsersContext );
  const { showAlert }=useContext( AppContext );
  const [ credentials, setCredentials ]=useState( {
    phone: "",
    name: '',
    password: "",
    DOB: "",
    gender: "",
    speciality: ""

  } );


  const navigate=useNavigate();

  // let userId;

  const handleSignup=async ( e ) => {
    // console.log( e.target.getAttribute( 'role' ) )
    e.preventDefault();
    const res=await Api.post( 'users/signup', {
      ...credentials, role: e.target.getAttribute( 'role' )
    } );
    console.log( res.data );
    console.log( res.data.data );

    if ( res.data.status==="success" ) {

      Cookies.set( 'jwt', res.data.token );
      console.log( Cookies.get( 'jwt' ) )

      showAlert( "Signed in successfully", "success" );

      await retrieveUserInfo( res.data.data.user._id );
      if ( res.data.data.user.role==='doctor' ) {
        navigate( '/dashboard' );

      }
      else {
        navigate( '/' );

      }

    }
    else {
      showAlert( 'Inputs are invalid!', 'danger' );
    }


  }



  const onChange=( e ) => {
    setCredentials( { ...credentials, [ e.target.name ]: e.target.value } );
  }





const changeUser=(e)=>{
  if ( e.target.name!==USER ) {
    e.target.name==='patient'? setUser( 'patient' ):setUser( 'doctor' );
    firstForm.current.reset();

    secForm.current.reset();

  }  
}

return (
  <section className="signup my-4">
  <div className="signup-content">
    <div className={`signup-form `} >
      <h2 className="form-title">Sign up</h2>
      <div className="row btn_row">
        <div className="col-3">
            <button type="button" name='patient' className={`btn btn-primary btn_user ${USER==='patient'? 'btn_user_active':''}`} onClick={( e ) => changeUser( e )}>Patient</button>  
        </div>
        <div className="col-3">
            <button type="button" name='doctor' className={`btn btn-primary btn_user ${USER==='doctor'? 'btn_user_active':''}`} onClick={( e ) => changeUser( e )}>Doctor</button>  
        </div>
      </div>
        <form ref={firstForm} role="patient" onSubmit={handleSignup} className={`register-form ${USER!=='patient'? "displayNone":''}`} id="register-form">
        <div className={`form-group `} >
            <input type="text" name="name" onChange={onChange} id="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
            <input type="phone" name="phone" onChange={onChange} id="phone" placeholder="Your mobile number" />
        </div>



        <div className={`form-group `} >
          <label htmlFor="" className='dobPlace'>DOB</label>
            <input type="date" className='dob' onChange={onChange} name="DOB" id="dob" placeholder="Your DOB" />
        </div>

        

      
          <FormDropdown list={[ 'male', 'female' ]} name='gender' width='30%' onChange={onChange} formVal={credentials} setFormVal={setCredentials} defaultValue={credentials.gender} />





        <div className="form-group">
            <input type="password" name="password" onChange={onChange} id="pass" placeholder="Password" />
        </div>
        <div className="form-group">
            <input type="password" name="passwordConfirm" id="re_pass" onChange={onChange} placeholder="Confirm your password" />
        </div>
        <div className="form-group form-button">
          <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
        </div>
      </form>



        <form ref={secForm} role="doctor" onSubmit={handleSignup} className={`register-form ${USER!=='doctor'? "displayNone":''}`} id="register-form">
        <div className={`form-group `} >
            <input type="text" name="name" id="name" onChange={onChange} placeholder="Your Name" />
        </div>
        <div className="form-group">
            <input type="phone" name="phone" id="phone" onChange={onChange} placeholder="Your mobile number" />
        </div>


        <div className={`form-group `} >
            <input type="text" name="speciality" onChange={onChange} placeholder="Your Speciality" />
        </div>


        <div className={`form-group `} >
          <label htmlFor="" className='dobPlace'>DOB</label>
            <input type="date" className='dob' name="DOB" id="dob" onChange={onChange} placeholder="Your DOB" />
        </div>

        

      
          <FormDropdown list={[ 'male', 'female' ]} name='gender' width='30%' onChange={onChange} formVal={credentials} setFormVal={setCredentials} defaultValue={credentials.gender} />





        <div className="form-group">
            <input type="password" name="password" id="password" onChange={onChange} placeholder="Password" />
        </div>
        <div className="form-group">
            <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={onChange} placeholder="Confirm your password" />
        </div>
        <div className="form-group form-button">
          <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
        </div>
      </form>
    </div>
    <div className="signup-image">
      <figure><img src={require('../img/signup-image.jpg')} alt="sing up image" /></figure>
    </div>
  </div>
</section>

  )
}
