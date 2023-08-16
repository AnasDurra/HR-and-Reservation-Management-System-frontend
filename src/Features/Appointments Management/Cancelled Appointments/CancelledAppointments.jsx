import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCancelledConsultingAppointments } from '../../../redux/Features/Appointments Management/Consulting Appointements/slice';

/* const dataSource = [
  {
    key: '1',
    name: 'Mike',
    schedule: (
      <TimeSchedule
        periods={[
          {
            start_time: '02:00',
            end_time: '04:00',
          },
          {
            start_time: '05:00',
            end_time: '06:00',
          },
        ]}
      />
    ),
    options: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    schedule: <TimeSchedule />,
    options: '10 Downing Street',
  },
]; */

function CancelledAppointments() {
  const dispatch = useDispatch();
  const cancelledAppointments = useSelector((state) => state?.consultingAppointmentsSlice?.cancelledAppointments);
  const meta = useSelector((state) => state?.consultingAppointmentsSlice?.meta);

  useEffect(() => {
    dispatch(getCancelledConsultingAppointments());
  }, []);

  const handlePageChange = (page) => {
    dispatch(getCancelledConsultingAppointments({ page: page }));
  };
  const columns = [
    {
      title: <div className='table-header-title'>{'تاريخ الموعد'}</div>,
      //  dataIndex: 'name',
      width: '20%',
      key: 'date',
      render: (item) => {
        const startDate = new Date(`${item.date}T${item.start_time}`);
        const endDate = new Date(`${item.date}T${item.end_time}`);

        const formattedDate = startDate.toLocaleDateString('ar-EG-u-nu-arab', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const formattedStartTime = startDate.toLocaleTimeString('ar-EG-u-nu-arab', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        const formattedEndTime = endDate.toLocaleTimeString('ar-EG-u-nu-arab', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        return (
          <div className='table-cell-container'>
            {formattedDate}
            <br />
            {`${formattedStartTime} - ${formattedEndTime}`}
          </div>
        );
      },
    },
    //TODO fill details based on status id
    {
      title: <div className='table-header-title'>{'التفاصيل'}</div>,
      width: '45%',

      // dataIndex: 'periods',
      key: 'details',
      render: (item) => {
        console.log('item', item);
        return <div className='table-cell-container'>hi</div>;
      },
    },
    {
      title: <div className='table-header-title'>{'سبب الالغاء'}</div>,
      width: '35%',

      //dataIndex: 'options',
      key: 'reason',
      render: (item) => (
        <div className='table-cell-container'>{item.cancellation_reason ? item.cancellation_reason : 'غير متوفر'}</div>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}></Space>

      <Table
        dataSource={cancelledAppointments}
        columns={columns}
        size='small'
        pagination={{
          current: meta?.current_page,
          pageSize: meta?.per_page,
          total: meta?.total,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
      />
    </>
  );
}

export default CancelledAppointments;
