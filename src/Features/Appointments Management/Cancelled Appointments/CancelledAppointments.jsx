import { Col, DatePicker, Form, Row, Select, Space, Table, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCancelledConsultingAppointments } from '../../../redux/Features/Appointments Management/Consulting Appointements/slice';
import { getConsultants } from '../../../redux/consultants/reducer';

const PickerWithType = ({ type, onChange }) => {
  if (type === 'range') return <DatePicker.RangePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
};

function CancelledAppointments() {
  const dispatch = useDispatch();
  const cancelledAppointments = useSelector((state) => state?.consultingAppointmentsSlice?.cancelledAppointments);
  const consultants = useSelector((state) => state?.consultantsReducer?.consultants);
  const meta = useSelector((state) => state?.consultingAppointmentsSlice?.meta);
  const [dateFilterType, setDateFilterType] = useState('date');
  const [selectedConsultantId, setSelectedConsultantId] = useState();
  console.log('cons', selectedConsultantId);
  useEffect(() => {
    dispatch(getCancelledConsultingAppointments());
    dispatch(getConsultants());
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
      <Row gutter={16}>
        <Col>
          <span>المستشار:</span>
        </Col>
        <Col span={4}>
          <Select
          placeholder={'اختيار'}
            value={selectedConsultantId}
            onChange={setSelectedConsultantId}
            options={consultants?.map((cons) => ({
              value: cons.id,
              label: cons.first_name + ' ' + cons.last_name,
            }))}
            style={{ width: '100%' }}
          />
        </Col>

        <Col offset={1}>
          <Select
            value={dateFilterType}
            onChange={setDateFilterType}
          >
            <Option value='range'> من - إلى</Option>
            <Option value='date'>يوم محدد</Option>
          </Select>
        </Col>

        <Col span={8}>
          <PickerWithType
            type={dateFilterType}
            onChange={(value) => {
              if (dateFilterType == 'range')
                dispatch(
                  getCancelledConsultingAppointments({
                    start_date: value[0].toISOString().slice(0, 10),
                    end_date: value[1].toISOString().slice(0, 10),
                    consultant_id: selectedConsultantId ? selectedConsultantId : undefined,
                  })
                );
              else if (dateFilterType == 'date') {
                dispatch(
                  getCancelledConsultingAppointments({
                    start_date: value.toISOString().slice(0, 10),
                    end_date: value.toISOString().slice(0, 10),
                  })
                );
              }
            }}
          />
        </Col>
      </Row>

      <br />

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
