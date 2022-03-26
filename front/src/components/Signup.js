import React,{useState} from 'react';
import '../css/signup.css';
import {FormDropdown} from './FormDropdown' 
// import '../img/signup-image.jpg'



export default function Signup() {
const [user,setUser]=useState('patient');
 
const changeUser=(e)=>{
  if(e.target.name!=user){
    e.target.name==='patient' ? setUser('patient') :setUser('doctor');
  }  
}

return (
<section className="signup">
  <div className="signup-content">
    <div className={`signup-form `} >
      <h2 className="form-title">Sign up</h2>
      <div className="row btn_row">
        <div className="col-3">
          <button type="button" name='patient' className="btn btn-primary btn_user btn_user_active" onClick={(e)=>changeUser(e)}>Patient</button>  
        </div>
        <div className="col-3">
          <button type="button" name='doctor' className="btn btn-primary btn_user " onClick={(e)=>changeUser(e)}>Doctor</button>  
        </div>
      </div>
      <form method="POST" className={`register-form ${user!='patient' ? "displayNone":''}`} id="register-form">
        <div className={`form-group `} >
          <input type="text" name="name" id="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <input type="phone" name="phone" id="phone" placeholder="Your mobile number" />
        </div>
        
        <div className={`form-group `} >
          <input type="text" name="address" id="address" placeholder="Your Address" />
        </div>


        <div className={`form-group `} >
          <label htmlFor="" className='dobPlace'>DOB</label>
          <input type="date" className='dob' name="DOB" id="dob" placeholder="Your DOB" />
        </div>

        

      
      <FormDropdown list={['male','female']} name='Gender' width='30%'/>





        <div className="form-group">
          <input type="password" name="pass" id="pass" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" name="re_pass" id="re_pass" placeholder="Confirm your password" />
        </div>
        <div className="form-group form-button">
          <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
        </div>
      </form>
      <form method="POST" className={`register-form ${user!='doctor' ? "displayNone":''}`} id="register-form">
        <div className={`form-group `} >
          <input type="text" name="name" id="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <input type="phone" name="phone" id="phone" placeholder="Your mobile number" />
        </div>
        
        <div className={`form-group `} >
          <input type="text" name="address" id="address" placeholder="Your Address" />
        </div>

        <div className={`form-group `} >
          <input type="text" name="speciality"  placeholder="Your Speciality" />
        </div>


        <div className={`form-group `} >
          <label htmlFor="" className='dobPlace'>DOB</label>
          <input type="date" className='dob' name="DOB" id="dob" placeholder="Your DOB" />
        </div>

        

      
      <FormDropdown list={['male','female']} name='Gender' width='30%'/>





        <div className="form-group">
          <input type="password" name="pass" id="pass" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" name="re_pass" id="re_pass" placeholder="Confirm your password" />
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
