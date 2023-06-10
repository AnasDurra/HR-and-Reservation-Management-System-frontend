import { Button, Form, Table, Tag, Typography } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './Vacations.css';
import dayjs from "dayjs";
import AddVacationModal from "./AddVacationModal";
import { getAllVacations } from "../../../redux/vacations/reducer";

function EmployeesVacations() {

    const dispatch = useDispatch();
    const allVacations = useSelector(state => state.vacationsReducer.allVacations);
    const metaData = useSelector(state => state.vacationsReducer.metaData);
    const loading = useSelector(state => state.vacationsReducer.loading);
    const error = useSelector(state => state.vacationsReducer.error);

    const [form] = Form.useForm();
    const [openAddVacationModalModal, setOpenAddVacationModalModal] = useState(false);

    useEffect(() => {
        dispatch(getAllVacations());
    }, []);

    console.log(allVacations);

    const closeAddVacationModal = () => {
        setOpenAddVacationModalModal(false);
        form.resetFields();
    }

    const addVacationFunction = (data) => {
        // data.state = true;
        // data = formatTime(data);
        // dispatch(addAttendanceRecord(data));
    };

    // const formatTime = (data) => {
    //     if (data.attendance_date) {
    //         const date = dayjs(data.attendance_date.$d).format('YYYY-MM-DD');
    //         const time = dayjs(data.attendance_time.$d).format('HH:mm:ss');

    //         data.attendance_date = date;
    //         data.attendance_time = time;
    //     } else {
    //         const date = dayjs(data.leave_date.$d).format('YYYY-MM-DD');
    //         const time = dayjs(data.leave_time.$d).format('HH:mm:ss');

    //         data.leave_date = date;
    //         data.leave_time = time;
    //     }

    //     return data;
    // }

    const onFinish = (data) => {
        console.log(data);
        // if (addAttendance) {
        //     addVacationFunction(data);
        // } else {
        //     createLeaveRecordFunction(data);
        // }
        // closeAddVacationModal();
    }

    const handlePageChange = (page) => {
        // dispatch(getTimeSheetLog(page));
    }

    const columns = [
        {
            title: 'المعرف الشخصي',
            dataIndex: 'emp_id',
            key: 'emp_id',
        },
        {
            title: 'اسم الموظف',
            dataIndex: ['employee', 'full_name'],
            key: 'emp_name',
        },
        {
            title: 'التاريخ',
            dataIndex: 'start_date',
            key: 'date',
        },
        {
            title: 'مدة الإجازة',
            dataIndex: 'total_days',
            key: 'total_days',
        },
        {
            title: 'الأيام المتبقية',
            key: 'remaining_days',
            dataIndex: 'remaining_days',
            render: (days) => {
                return (
                    <Tag color={days === 0 ? "red" : "purple"}>
                        {days === 0 ? 'منتهية' : days}
                    </Tag>
                );
            }
        },
    ];

    return (
        <Spinner loading={loading}>
            <div>
                <div className="timeSheetLogActionButtons">
                    <Button
                        onClick={() => {
                            form.setFieldsValue({
                                attendance_date: dayjs(),
                                attendance_time: dayjs().second(0),
                            });
                            setOpenAddVacationModalModal(true);
                        }}
                    >
                        تسجيل إجازة
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={allVacations}
                    rowKey='employee_vacation_id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                    scroll={{ x: 'max-content' }}
                />


                <AddVacationModal
                    form={form}
                    handleCancel={closeAddVacationModal}
                    open={openAddVacationModalModal}
                    onFinish={onFinish}
                />

            </div>
        </Spinner>
    );
}

export default EmployeesVacations;