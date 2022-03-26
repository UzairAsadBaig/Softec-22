import React from 'react'
import './../css/Profile.css'
import Input from './Input'


const Profile=() => {


  return (
    <div className="container">
      <h2>User Profile</h2>

      <div className="row">

        <div className="col-6 inputBox mt-3">
          <Input width="60%" name="name" disabled={true} type="text" margin="" label='r' labelVal="Name" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="60%" name="phone" disabled={true} type="text" margin="" label='r' labelVal="Phone no" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="60%" name="address" disabled={true} type="text" margin="" label='r' labelVal="Address" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="60%" name="gender" disabled={true} type="text" margin="" label='r' labelVal="Gender" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="60%" name="gender" disabled={true} type="text" margin="" label='r' labelVal="Gender" />

        </div>

      </div>
    </div> )

}

export default Profile