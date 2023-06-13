import { Dropdown, Form } from 'antd';
import './Layout.css';
import { LogoutOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from 'react';
import MakeVacationRequestModal from '../../Features/Attendance/Vacations/MakeVacationRequestModal';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addVacationRequest } from '../../redux/vacations/reducer';


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
        data.user_id = 1503;
        console.log(data);
        dispatch(addVacationRequest(data));
        setOpenVacationRequestModal(false);
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
                <a>
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
            </div>
        </div>
    );
}

export default AppBar;