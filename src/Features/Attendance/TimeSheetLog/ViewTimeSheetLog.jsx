import { Button, Form, Table, Tag } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTimeSheetLog, addAttendanceRecord, addLeaveRecord } from "../../../redux/timeSheet/reducer";
import './ViewTimeSheetLog.css';
import TimeSheetModal from "./TimeSheetModal";
import dayjs from "dayjs";
import ServerSideSearchField from "../../../Components/ServerSideSearchField/ServerSideSearchField";

function ViewTimeSheetLog() {

    const dispatch = useDispatch();
    const timeSheetLog = useSelector(state => state.timeSheetReducer.timeSheetLog);
    const metaData = useSelector(state => state.timeSheetReducer.metaData);
    const loading = useSelector(state => state.timeSheetReducer.loading);
    const error = useSelector(state => state.timeSheetReducer.error);

    const [searchValue, setSearchValue] = useState("");

    const [form] = Form.useForm();
    const [openTimeSheetModal, setOpenTimeSheetModal] = useState(false);
    const [addAttendance, setAddAttendance] = useState(false);

    useEffect(() => {
        dispatch(getTimeSheetLog());
    }, []);

    const closeShiftModal = () => {
        setOpenTimeSheetModal(false);
        form.resetFields();
    }

    const createAttendanceRecordFunction = (data) => {
        data.state = true;
        data = formatTime(data);
        dispatch(addAttendanceRecord(data));
    };

    const createLeaveRecordFunction = (data) => {
        data.state = true;
        data = formatTime(data);
        dispatch(addLeaveRecord(data));
    };

    const formatTime = (data) => {
        if (data.attendance_date) {
            const date = dayjs(data.attendance_date.$d).format('YYYY-MM-DD');
            const time = dayjs(data.attendance_time.$d).format('HH:mm:ss');

            data.attendance_date = date;
            data.attendance_time = time;
        } else {
            const date = dayjs(data.leave_date.$d).format('YYYY-MM-DD');
            const time = dayjs(data.leave_time.$d).format('HH:mm:ss');

            data.leave_date = date;
            data.leave_time = time;
        }

        return data;
    }

    const onFinish = (data) => {
        if (addAttendance) {
            createAttendanceRecordFunction(data);
        } else {
            createLeaveRecordFunction(data);
        }
        closeShiftModal();
    }

    const handlePageChange = (page) => {
        dispatch(getTimeSheetLog({ page: page, name: searchValue }));
    }

    console.log(timeSheetLog);

    const columns = [
        {
            title: 'التاريخ',
            dataIndex: 'attendance_date',
            key: 'date',
        },
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
            title: 'بداية الدوام',
            key: 'time_in',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
                <Tag color="purple">{record?.employee?.schedule?.time_in}</Tag>
                {record['shift.new_time_in'] ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Tag color="lime" style={{ marginBottom: '3px' }}>إزاحة دوام</Tag>
                        <Tag color="lime">{record['shift.new_time_in']}</Tag>
                    </div> : null}
            </div>
        },
        {
            title: 'وقت الدخول',
            key: 'check_in_time',
            render: (record) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
                        <Tag color="purple">
                            {record.check_in_time}
                        </Tag>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Tag color={record['latetime.duration'] ? 'red' : 'green'} style={{ marginBottom: '3px' }}>
                                {record['latetime.duration'] ? 'متأخر' : 'على الوقت'}
                            </Tag>
                            {record['latetime.duration'] ?
                                <Tag color="red">
                                    {record['latetime.duration']}
                                </Tag> : null}
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'نهاية الدوام',
            key: 'time_out',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
                <Tag color="purple">{record?.employee?.schedule?.time_out}</Tag>
                {record['shift.new_time_in'] ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Tag color="lime" style={{ marginBottom: '3px' }}>إزاحة دوام</Tag>
                        <Tag color="lime">{record['shift.new_time_out']}</Tag>
                    </div> : null}
            </div>
        },
        {
            title: 'وقت الخروج',
            key: 'check_out_time',
            render: (record) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
                        <Tag color="blue">
                            {record.check_out_time ? record.check_out_time : 'غير مسجّل'}
                        </Tag>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {record.check_out_time && record['leaveBefore'] ?
                                <Tag color='red' style={{ marginBottom: '3px' }}>
                                    {'غادر مبكرا'}
                                </Tag> : null}
                            {record['leaveBefore'] ?
                                <Tag color="red">
                                    {record['leaveBefore']}
                                </Tag> : null}
                        </div>
                    </div>
                );
            }
        },
    ];

    const handleSearch = () => {
        dispatch(getTimeSheetLog({ name: searchValue }));
    }

    const handleReset = () => {
        setSearchValue("");
        dispatch(getTimeSheetLog());
    }

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
                            setAddAttendance(true);
                            setOpenTimeSheetModal(true);
                        }}
                    >
                        تسجيل دخول
                    </Button>

                    <Button
                        onClick={() => {
                            form.setFieldsValue({
                                leave_date: dayjs(),
                                leave_time: dayjs().second(0),
                            });
                            setAddAttendance(false);
                            setOpenTimeSheetModal(true);
                        }}
                    >
                        تسجيل مغادرة
                    </Button>
                </div>
                <ServerSideSearchField
                    placeholder='البحث عن سجل حضور موظف'
                    searchBtnText='البحث'
                    resetBtnText='إعادة'
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleReset={handleReset}
                    handleSearch={handleSearch}
                />
                <Table
                    columns={columns}
                    dataSource={timeSheetLog}
                    rowKey='attendance_id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                    scroll={{ x: 'max-content' }}
                />

                <TimeSheetModal
                    form={form}
                    handleCancel={closeShiftModal}
                    open={openTimeSheetModal}
                    onFinish={onFinish}
                    action={addAttendance}
                />
            </div>
        </Spinner>
    );
}

export default ViewTimeSheetLog;