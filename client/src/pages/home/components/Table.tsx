
// @ts-nocheck
import 'antd/dist/antd.css';
import React, { useState, useEffect, createRef } from "react";
import { Table, notification ,Tag} from 'antd';
import Filter from "./Filter"

import apiService from "../../../utils";

const TableView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, seIsFetching] = useState<boolean>(true);
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
    responsive: true,
  });

  const formRef = createRef<any>()

  useEffect(() => {
    apiService(params)
      .then(response => {
        const {data} = response;
        const {total, current, pageSize} = data;
        setData(data.records)
        const pagObj = Object.assign({}, {...pagination}, {total, current, pageSize})
        setPagination(pagObj)
        setLoading(false)
        seIsFetching(false)

      })
      .catch(error => {
        notification.error({
          message: 'Unknown error',
          description:
            'Please refresh the page',
        })
        console.log(error)
      });
  }, [isFetching]);


  const handleSubmit = (pagination: any|null, sorter: any|null, filter: any|null) => {
    setLoading(true)
    if(pagination && pagination.type){
      delete pagination.type
    }
    let fields = formRef.current.getFieldsValue()
    fields = Object.assign({}, {...fields}, {...filter})
    fields = Object.assign({}, {...fields}, {...pagination})
    if(fields.maxRange && fields.minRange){
        const max = parseFloat(fields.maxRange)
        const min = parseFloat(fields.minRange)
        if(min > max){
          notification.error({
            message: 'Input error',
            description:
              'Min score value is higher than min score value',
          })
        }
    }
    fields = Object.assign({}, {...fields}, {...sorter});
    setParams(fields)
    setTimeout(() => {
      seIsFetching(true)
    }, 1000)
    
  }

  const handleReset = () => {
    const fields = formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    formRef.current.setFieldsValue(fields)
    handleSubmit(null,null,null)
  }

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const sortField = sorter.field
    const sortOrder = sorter.order
    handleSubmit(pagination, {sortField, sortOrder}, filters)    
  };
  
  const columns = [
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      sorter: (a: any, b: any) => a.bankName.length - b.bankName.length,
      width: '20%',
    },
    {
        title: 'Bank BIC',
        dataIndex: 'bankBIC',
        sorter: true,
        width: '20%',
      },
    {
        title: 'Report Score',
        dataIndex: 'reportScore',
        sorter: (a: any, b: any) => a.reportScore > b.reportScore,
        width: '20%',
      },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Extended', value: 'extended' },
        { text: 'Intermediate', value: 'intermediate' },
        { text: 'Primary', value: 'primary' },
      ],
      width: '20%',
      render: (type: string) => <Tag color={"geekblue"}>{type}</Tag>,
      sorter: (a: any, b: any) => a.type > b.type,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      sorter: (a: any, b: any) => a.createdAt > b.createdAt,
    },
    {
        title: 'Published',
        dataIndex: 'publishedAt',
        sorter: (a: any, b: any) => a.publishedAt > b.publishedAt,
    },
  ];
  return (
    <div>
        <Filter formRef={formRef} handleSubmit={handleSubmit} handleReset={handleReset} />
        <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
          />
    </div>
  );
};

export default TableView;
