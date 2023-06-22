import { Dropdown, Form } from 'antd';
import './Layout.css';
import { LogoutOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from 'react';
import MakeVacationRequestModal from '../../Features/Attendance/Vacations/MakeVacationRequestModal';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addVacationRequest } from '../../redux/vacations/reducer';
import { addTimeShiftRequest } from '../../redux/timeShifts/reducer';
import MakeTimeShiftRequestModal from '../../Features/Attendance/TimeShift/MakeTimeShiftRequestModal';


function AppBar() {

    const [openVacationRequestModal, setOpenVacationRequestModal] = useState(false);
    const [vacationForm] = Form.useForm();
    const dispatch = useDispatch();

    const handleCancelVacationRequest = () => {
        setOpenVacationRequestModal(false);
        vacationForm.resetFields();
    }
    const onFinishVacationRequest = (data) => {
        data.start_date = dayjs(data.start_date.$d).format('YYYY-MM-DD');

        // it must be taken from the token
        data.user_id = 410;
        console.log(data);
        dispatch(addVacationRequest(data));
        setOpenVacationRequestModal(false);
        vacationForm.resetFields();
    }

    const [openTimeShiftRequestModal, setOpenTimeShiftRequestModal] = useState(false);
    const [timeShiftForm] = Form.useForm();

    const handleCancelTimeShiftRequest = () => {
        setOpenTimeShiftRequestModal(false);
        timeShiftForm.resetFields();
    }
    const onFinishTimeShiftRequest = (data) => {
        data.start_date = dayjs(data.start_date.$d).format('YYYY-MM-DD');
        data.new_time_in = dayjs(data.time[0].$d).format('HH:mm:ss');
        data.new_time_out = dayjs(data.time[1].$d).format('HH:mm:ss');
        delete data.time;

        // it must be taken from the token
        data.user_id = 410;

        dispatch(addTimeShiftRequest(data));

        setOpenTimeShiftRequestModal(false);
        timeShiftForm.resetFields();
    }


    const items = [
        {
            key: '1',
            label: (
                <a onClick={() => setOpenVacationRequestModal(true)}>
                    طلب إجازة
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => setOpenTimeShiftRequestModal(true)}>
                    طلب إزاحة دوام
                </a>
            ),
        },
    ];

    return (
        <div className="AppBar">
            <div className='AppBarItem'>
                <LogoutOutlined onClick={() => console.log('hey')} />
                <Dropdown
                    menu={{
                        items
                    }}
                >
                    <MoreOutlined />
                </Dropdown>
                <MakeVacationRequestModal
                    form={vacationForm}
                    handleCancel={handleCancelVacationRequest}
                    open={openVacationRequestModal}
                    onFinish={onFinishVacationRequest}
                />
                <MakeTimeShiftRequestModal
                    form={timeShiftForm}
                    handleCancel={handleCancelTimeShiftRequest}
                    open={openTimeShiftRequestModal}
                    onFinish={onFinishTimeShiftRequest}
                />
            </div>
        </div>
    );
}

export default AppBar;