import React, { useState } from 'react'
import Input from '../Input'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;



export default function Clinic() {

  const [clinic,setClinic]= useState(); 

  return (
    <div className="row">

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="name"  type="text" margin="mx-auto" label='c' labelVal="Name"  />

    </div>

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="address"  type="text" margin="mx-auto" label='c' labelVal="Address" />
    </div>

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="contactInfo"  type="text" margin="mx-auto" label='c' labelVal="ContactInfo" />

    </div>
    <div className="col-6 inputBox mt-5 ps-5"  style={{'opacity':'1'}}>
    <RangePicker
     className='RangePicker'
     showTime={{format:"HH:mm a"}}
     format="MMM DD yyyy HH:mm"
    //  onChange={}
    
/>

    </div>

  </div>
  )
}
