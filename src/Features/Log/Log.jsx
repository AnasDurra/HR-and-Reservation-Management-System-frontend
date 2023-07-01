import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { ProfileOutlined, WarningOutlined } from '@ant-design/icons';
import LogFilter from './components/LogFilter';
import './log.css';
import { getLogs, logSlice } from '../../redux/Features/Log/slice';
import { useDispatch, useSelector } from 'react-redux';

const colorMapping = {
  1: '#FF0000',
  2: '#008000',
  3: '#808080',
};
const statusMapping = {
  1: 'حرج',
  2: 'متوسَط',
  3: 'منخفض',
};

const columns = [
  {
    title: <div className='table-header-title'>{'الدرجة'}</div>,
    dataIndex: ['action', 'severity'],
    key: 'action_severity',
    className: 'column-warning',
    render: (severity) => {
      return (
        <div className='table-cell-container'>
          <Tag
            icon={<WarningOutlined />}
            color={colorMapping[severity]}>
            {statusMapping[severity]}
          </Tag>
        </div>
      );
    },
  },
  {
    title: <div className='table-header-title'>{' الحدث'}</div>,
    dataIndex: ['action', 'name'],
    key: 'action_name',
    className: 'column-two',
  },
  {
    title: <div className='table-header-title'>{' معرَف الفائم بالحدث'}</div>,
    dataIndex: 'user',
    key: 'user_id',
    className: 'column-one',

    render: (user) => {
      return (
        <div className='table-cell-container'>
          <Tag
            icon={<ProfileOutlined />}
            className='user-tag'
            onClick={() => {}}>
            <span>{`${user.name} (${user.user_id})`}</span>
          </Tag>
        </div>
      );
    },
  },
  {
    title: (
      <div className='table-header-title'>{' معرفات المتأثرين بالحدث'}</div>
    ),
    dataIndex: 'affected_users',
    key: 'affected_users',
    className: 'column-two',
    render: (affected_users) => (
      <div className='table-cell-container'>
        {affected_users.map((user) => (
          <Tag
            icon={<ProfileOutlined />}
            className='user-tag'
            onClick={() => {}}>
            <span>{`${user.name} (${user.user_id})`}</span>
          </Tag>
        ))}
      </div>
    ),
  },

  {
    title: <div className='table-header-title'>{' وصف الحدث'}</div>,
    dataIndex: ['action', 'description'],
    key: 'action_description',
    className: 'column-one',
  },
  {
    title: <div className='table-header-title'>{' التاريخ'}</div>,
    dataIndex: 'log_date',
    key: 'date',
    className: 'column-two',
  },
];

const getCssClass = (index) => {
  const classes = ['row-odd', 'row-even'];
  return classes[index % classes.length];
};

const Log = () => {
  const dispatch = useDispatch();
  const logSlice = useSelector((state) => state.logSlice);

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const handlePageChange = (page) => {
    dispatch(getLogs({ page: page }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Table
        className='my-table'
        dataSource={logSlice?.logs}
        size='middle'
        columns={columns}
        pagination={{
          current: logSlice?.logsMeta?.current_page,
          pageSize: logSlice?.logsMeta?.per_page,
          total: logSlice?.logsMeta?.total,
          onChange: handlePageChange,
          showSizeChanger:false
        }}
        rowClassName={(record, index) => getCssClass(index)}
      />
      <div style={{ width: '30%', marginRight: '0.5rem' }}>
        <LogFilter />
      </div>
    </div>
  );
};

export default Log;
