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
    Row,
    Select,
    Space,
    Table,
    Tag,
    TimePicker,
} from 'antd';
import { useState } from 'react';
import {
    PlusOutlined,
    MinusCircleFilled,
    InfoCircleFilled,
} from '@ant-design/icons';
import AddPeriodsScheduleDrawer from './AddPeriodsScheduleDrawer';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';

const columns = [
    {
        title: <div className='table-header-title'>{'الاسم'}</div>,
        dataIndex: 'name',
        key: 'name',
        render: (item) => <div className='table-cell-container'> {item}</div>,
    },
    {
        title: <div className='table-header-title'>{'البرنامج'}</div>,
        dataIndex: 'schedule',
        key: 'schedule',
        render: (item) => <div className='table-cell-container'> {item}</div>,
    },
    {
        title: <div className='table-header-title'>{'خيارات'}</div>,
        dataIndex: 'options',
        key: 'options',
        render: (item) => (
            <div className='table-cell-container'>
                <a>حذف</a>
            </div>
        ),
    },
];

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        schedule: <TimeSchedule />,
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
    const [isAddScheduleDrawerOpen, setIsAddScheduleDrawerOpen] =
        useState(false);

    const openAddScheduleDrawer = () => setIsAddScheduleDrawerOpen(true);
    const closeAddScheduleDrawer = () => setIsAddScheduleDrawerOpen(false);

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={openAddScheduleDrawer}>
                    إضافة برنامج دوام
                </Button>

                <AddPeriodsScheduleDrawer
                    isOpen={isAddScheduleDrawerOpen}
                    close={closeAddScheduleDrawer}
                    open={openAddScheduleDrawer}
                ></AddPeriodsScheduleDrawer>
            </Space>

            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
}

export default TimeSchedules;
