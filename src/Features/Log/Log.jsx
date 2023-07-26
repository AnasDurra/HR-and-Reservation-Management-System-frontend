import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Modal, Table, Tag } from 'antd';
import { ProfileOutlined, WarningOutlined } from '@ant-design/icons';
import LogFilter from './components/LogFilter';
import './log.css';
import { getLogs, logSlice } from '../../redux/Features/Log/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

const getCssClass = (index) => {
  const classes = ['row-odd', 'row-even'];
  return classes[index % classes.length];
};

const Log = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logSlice = useSelector((state) => state.logSlice);
  const [showMoreUsersModal, setShowMoreUsersModal] = useState(false);

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const handleShowMore = () => {
    setShowMoreUsersModal(true);
  };

  const handlePageChange = (page) => {
    dispatch(getLogs({ page: page }));
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
      title: <div className='table-header-title'>{' القائم بالحدث'}</div>,
      dataIndex: 'user',
      key: 'user_id',
      className: 'column-one',

      render: (user) => {
        return (
          <div className='table-cell-container'>
            <Tag
              icon={<ProfileOutlined />}
              className='user-tag'
              onClick={() => navigate(`/employees/profile?id=${user.user_id}`)}>
              <span>{`${user.name} (${user.user_id})`}</span>
            </Tag>
          </div>
        );
      },
    },
    {
      title: <div className='table-header-title'>{' المتأثرين بالحدث'}</div>,
      dataIndex: 'affected_users',
      key: 'affected_users',
      className: 'column-two',
      render: (affected_users) => {
        const visibleUsers = affected_users.slice(0, 2);
        const hiddenUsers = affected_users.slice(2);

        return (
          <div className='table-cell-container'>
            {visibleUsers.map((user) => (
              <Tag
                icon={<ProfileOutlined />}
                className='user-tag'
                onClick={() =>
                  navigate(`/employees/profile?id=${user.user_id}`)
                }>
                <span>{`${user.name} (${user.user_id})`}</span>
              </Tag>
            ))}

            {hiddenUsers.length > 0 && (
              <>
                <Button
                  type='link'
                  onClick={() => handleShowMore()}>
                  عرض المزيد ({hiddenUsers.length})
                </Button>

                <Modal
                  title='جميع المتأثرين'
                  open={showMoreUsersModal}
                  onCancel={() => setShowMoreUsersModal(false)}
                  footer={null}>
                  <List
                    itemLayout='horizontal'
                    dataSource={affected_users}
                    bordered
                    renderItem={(user, index) => (
                      <List.Item
                        className='list-item-hoverable'
                        onClick={() =>
                          navigate(`/employees/profile?id=${user.user_id}`)
                        }>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                            />
                          }
                          title={`${user.name} (${user.user_id})`}
                        />
                      </List.Item>
                    )}
                  />
                </Modal>
              </>
            )}
          </div>
        );
      },
    },

    {
      title: <div className='table-header-title'>{' وصف الحدث'}</div>,
      dataIndex: ['action', 'descripion'],
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
          showSizeChanger: false,
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
