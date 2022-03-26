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
      title: 'Action',
      key: 'action',
      render: ( text, record ) => (
        <Space size="middle">
          <button className="btn btn-primary">Book</button>
        </Space>
      ),
    },
  ];

  const data=[
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      phone:"033013330092",
    },
    {
      key: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phone:"033013330092",
    },
    {
      key: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park',
      phone:"033013330092",
    },
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      phone:"033013330092",
    },
    {
      key: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phone:"033013330092",
    },
    {
      key: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park',
      phone:"033013330092",
    },
  ];
  return (
    <Table columns={columns} dataSource={data} />
  )
}




export default ClinicsTable;