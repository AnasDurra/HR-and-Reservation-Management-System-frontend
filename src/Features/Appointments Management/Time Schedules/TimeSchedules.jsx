import Column from 'antd/es/table/Column';
import TimeSchedule from './TimeSchedule';
import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Mentions,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  TimePicker,
} from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import AddPeriodsScheduleDrawer from './AddPeriodsScheduleDrawer';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { useDispatch, useSelector } from 'react-redux';
import {
  destroyTimeSchedule,
  getTimeSchedule,
  getTimeSchedules,
} from '../../../redux/Features/Appointments Management/Consultant Time Schedules/slice';
import Spinner from '../../../Components/Spinner/Spinner';

const dataSource = [
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
];

function TimeSchedules() {
  const dispatch = useDispatch();
  const timeSchedules = useSelector((state) => state?.consultantTimeScheduleSlice?.timeSchedules);
  const loading = useSelector((state) => state?.consultantTimeScheduleSlice?.loading);
  const [isAddScheduleDrawerOpen, setIsAddScheduleDrawerOpen] = useState(false);

  const openAddScheduleDrawer = () => setIsAddScheduleDrawerOpen(true);
  const closeAddScheduleDrawer = () => setIsAddScheduleDrawerOpen(false);

  useEffect(() => {
    dispatch(getTimeSchedules());
  }, []);

  const columns = [
    {
      title: <div className='table-header-title'>{'الاسم'}</div>,
      dataIndex: 'name',
      key: 'name',
      render: (item) => <div className='table-cell-container'> {item}</div>,
    },
    {
      title: <div className='table-header-title'>{'البرنامج'}</div>,
      dataIndex: 'periods',
      key: 'schedule',
      render: (item) => (
        <div className='table-cell-container'>
          <TimeSchedule periods={item} />
        </div>
      ),
    },
    {
      title: <div className='table-header-title'>{'خيارات'}</div>,
      //dataIndex: 'options',
      key: 'options',
      render: (item) => (
        <div className='table-cell-container'>
          <Popconfirm
            title={'تأكيد الحذف'}
            onConfirm={() => {
              dispatch(destroyTimeSchedule({ id: item.id }));
            }}
          >
            <a>حذف</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Spinner loading={loading}>
      <>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={openAddScheduleDrawer}>إضافة برنامج دوام</Button>{' '}
          <AddPeriodsScheduleDrawer
            isOpen={isAddScheduleDrawerOpen}
            close={closeAddScheduleDrawer}
            open={openAddScheduleDrawer}
          ></AddPeriodsScheduleDrawer>
        </Space>

        <Table
          dataSource={timeSchedules}
          columns={columns}
          size='small'
        />
      </>
    </Spinner>
  );
}

export default TimeSchedules;
