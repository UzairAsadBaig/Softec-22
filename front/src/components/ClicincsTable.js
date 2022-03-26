import React from 'react'
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';


const ClinicsTable=() => {


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
      dataIndex:'openingHours',
      key: 'openingHours',
    },
  ];

  const data=[
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      phone:"033013330092",
      openingHours:{
        to:'Feb 18 2022 14',
        from:'Feb 18 2022 11'
      }
    },
    {
      key: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phone:"033013330092",
      openingHours:{
        to:'Feb 18 2022 14',
        from:'Feb 18 2022 11'
      }
    },
    {
      key: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park',
      phone:"033013330092",
      openingHours:{
        to:'Feb 18 2022 14',
        from:'Feb 18 2022 11'
      }
    },
  ];

  const openingHoursToString=(obj)=>{
    let start = (obj.from.split(' ')[obj.from.split(' ').length-1]) ;
   let end = (obj.to.split(' ')[obj.to.split(' ').length-1]);
   return `From ${start%12}${start<=12?'am':'pm'} to ${end}${end<=12?'am':'pm'}`;
  }

  const modifiedData=(data)=>{
   return data.map((e)=>{
    return {
      key:e.key,
      name:e.name,
      phone:e.phone,
      address:e.address,
      openingHours:openingHoursToString(e.openingHours)
    }


   });
  }
  
  return (
    <Table columns={columns} dataSource={modifiedData(data)} />
  )
}




export default ClinicsTable;