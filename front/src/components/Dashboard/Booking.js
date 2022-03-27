import React, { useContext } from 'react'
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import UsersContext from '../../context/users/UsersContext';


const Booking=( props ) => {


  const { user }=useContext( UsersContext )

  const columns=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Opening Hours',
      dataIndex: 'openingHours',
      key: 'openingHours',
    },
  ];

  const data=user.appointmentSchedule;

  const openingHoursToString=( obj ) => {
    let start=obj.from;
    let end=obj.to;
    return `From ${start%12}${start<=12? 'am':'pm'} to ${end}${end<=12? 'am':'pm'}`;
  }

  const modifiedData=( data ) => {
    return data&&data.map( ( e ) => {
      return {

        name: e.patient.name,
        gender: e.patient.gender,
        phone: e.patient.phone,
        // openingHours: openingHoursToString( e.bookedTimeSlots )
        openingHours: `${e.bookedTimeSlots.from} - ${e.bookedTimeSlots.to}`
      }


    } );
  }

  return (
    <Table columns={columns} dataSource={modifiedData( data )} />
  )
}




export default Booking;