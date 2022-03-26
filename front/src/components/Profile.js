import React from 'react'
import './../css/Profile.css'
import ClinicsTable from './ClicincsTable'
import Input from './Input'


const Profile=() => {


  return (
    <><div className="container">
      <h2 className='text-center profile_head' >Your <span>Profile</span></h2>

      <div className="row">

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="name" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Name" defaultValue="Numan Anees" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="phone" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Phone no" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="address" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Address" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="DOB" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Date of Birth" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="gender" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Gender" />

        </div>

        <div className="col-6 inputBox mt-3">
          <Input width="70%" name="role" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Role" />

        </div>


        {/* IF role === doctor */}
        <div className="col-12 inputBox mt-3">
          <Input width="70%" name="specialization" disabled={true} type="text" margin="mx-auto" label='c' labelVal="Specializations" />
        </div>







        {/*  */}





      </div>
    </div>


      <div className="container">
        <h2 className='text-center profile_head'>My Clinics</h2>

        <ClinicsTable />
      </div>

    </>

  )

}

export default Profile