import React,{useState} from 'react'
import './../css/Profile.css'
import ClinicsTable from './ClicincsTable'
import Input from './Input'
import Review from './Review'
import { DatePicker } from 'antd'
import moment from 'moment';
const {RangePicker}=DatePicker;

const Profile=() => {


  const appointmentSchedule=[
    {
      to:'Feb 18 2022 14',
      from:'Feb 18 2022 11'
    },
    {
      to:'Feb 19 2022 14',
      from:'Feb 18 2022 11'
    },
    {
      to:'Feb 22 2022 14',
      from:'Feb 18 2022 11'
    },
    {
      to:'Feb 24 2022 14',
      from:'Feb 18 2022 11'
    },
  ]


  const [slotFree,setSlotfree]=useState('false');
  // const [set]
  const checkSlotAvailibility=(slot,slotArray)=>{
    
  }

  return (
    <>
    <div className="container">
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
      </div>
    </div>
    {/* reviews */}
    <div>
    <Review/>
    </div>


      <div className="container">
        <h2 className='text-center profile_head'>My Clinics</h2>
        <ClinicsTable />



        <h2 className='text-center profile_head mt-5 mb-4' >Book Appointment </h2>
          <RangePicker className='RangePicker'  showTime={{format:"HH:mm a"}} format="MMM DD yyyy HH:mm" style={{"zIndex":'1056!important'}} onChange={setFilter}/><br/>

  <button type="button" className="btn btn-primary mt-3 mb-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Book
  </button>
  <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true"  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Book Appointment</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form >

        </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>



</div>

      
    </>

  )

}

export default Profile