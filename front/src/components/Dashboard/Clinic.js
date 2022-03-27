import React, { useState,useContext } from 'react'
import Input from '../Input'
import { TimePicker } from 'antd'
import UsersContext from '../../context/users/UsersContext';
import AppContext from '../../context/appState/AppContext';
import Api from '../../Api';
import doctor from '../../Data/doctor';
const { RangePicker } = TimePicker;



export default function Clinic() {
  
  const {user}=useContext(UsersContext);
  const {onChangeGeneric}=useContext(AppContext);
  const [clinic,setClinic]= useState({
    name:"",
    address:"",
    contactInfo:"",
    openingHours:{
      to:"",
      from:""
    },
    doctor:user._id
  }); 

  const onChange=onChangeGeneric(clinic,setClinic);

  const setOpeningHours = (value)=>{

    setClinic({...clinic,openingHours : {
      from:new Date(value[0]._d).getHours(),
      to:new Date(value[1]._d).getHours()
    }})
  }

  const {Cookies}= useContext(UsersContext)

  const token=Cookies.get('jwt');

  const handleClinicSubmission=async (e)=>{
    e.preventDefault();
    const endPoint='clinics/';
    if(!clinic.openingHours.to || !clinic.openingHours.from)
    return
    const res=await Api.post( endPoint, clinic,{headers:{Authorization:`Bearer ${token}`}} );
    console.log(res);
    if(res.data.status=='success')
    alert('Clinic has been created')
    else
    alert('Failed')
  }

  return (
    <form className="row" onSubmit={handleClinicSubmission}>

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="name"  type="text" margin="mx-auto" label='c' labelVal="Name"  onChange={onChange}/>

    </div>

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="address"  type="text" margin="mx-auto" label='c' labelVal="Address" onChange={onChange} />
    </div>

    <div className="col-6 inputBox mt-3">
      <Input width="70%" name="contactInfo"  type="text" margin="mx-auto" label='c' labelVal="ContactInfo" onChange={onChange}/>

    </div>
    <div className="col-6 inputBox mt-3 "  style={{'opacity':'1','textAlign':'right','paddingRight':'5rem','paddingTop':'3rem'}}>
    <p  style={{'opacity':'.5','float':'left'}}>Opening Hours</p>
    <RangePicker
     className='RangePicker'
     showTime={{format:"HH:mm a"}}
     format="HH:mm"
     onChange={setOpeningHours}
    
/>
    </div>
   <div className="col-12 text-center">
     <button className="btn btn-primary " style={{'marginTop':'5rem','width':'8rem'}} role="button">Submit</button>
   </div>
  </form>
  )
}
