import React from 'react'
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';


const Booking=( props ) => {


  const columns=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
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

  const data=props.appointmentSchedule;

  const openingHoursToString=( obj ) => {
    let start=obj.from;
    let end=obj.to;
    return `From ${start%12}${start<=12? 'am':'pm'} to ${end}${end<=12? 'am':'pm'}`;
  }

  const modifiedData=( data ) => {
    return data&&data.map( ( e ) => {
      return {
        key: e.key,
        name: e.name,
        phone: e.phone,
        address: e.address,
        openingHours: openingHoursToString( e.openingHours )
      }


    } );
  }

  return (
    <Table columns={columns} dataSource={modifiedData( data )} />
  )
}




export default Booking;