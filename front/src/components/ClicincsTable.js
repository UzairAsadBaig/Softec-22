import React from 'react'
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';


const ClinicsTable=( props ) => {


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
      dataIndex: 'openingHour',
      key: 'openingHour',
    },
  ];

  const data=props.clinics;
  const openingHoursToString=( obj ) => {
    // console.log(obj);
    let start=obj?.from;
    let end=obj?.to;
   
    return `${start%12}${start<=12? 'am':'pm'} to ${end%12}${end<=12? 'am':'pm'}`;
  }

  const modifiedData=( data ) => {
    return data&&data.map( ( e ) => {
      return {
        key: e.key,
        name: e.name,
        phone: e.contactInfo,
        address: e.address,
        openingHour: openingHoursToString( e.openingHour )
      }


    } );
  }

  return (
    <Table columns={columns} dataSource={modifiedData( data )} />
  )
}




export default ClinicsTable;