import { Button, Form, Table, Tag } from "antd";
import './ViewShifts.css';
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import Spinner from "../../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getShifts, createShift, deleteShift, updateShift, getWorkingDays, updateWorkingDays } from "../../../redux/shifts/reducer";
import ShiftModal from "./ShiftModal";
import dayjs from "dayjs";
import WorkingDays from "./WorkingDays";
import Holidays from "./Holidays/Holidays";

function ViewShifts() {

    const shifts = useSelector(state => state.shiftsReducer.shifts);
    const workingDays = useSelector(state => state.shiftsReducer.workingDays);
    const loading = useSelector(state => state.shiftsReducer.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShifts());
        dispatch(getWorkingDays());
    }, [dispatch]);

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);

    const [openShiftModal, setOpenShiftModal] = useState(false);
    const [openHolidays, setOpenHolidays] = useState(false);

    const deleteShiftFunction = () => {
        console.log('deleted: ', selectedShift);
        dispatch(deleteShift({
            id: selectedShift.schedule_id,
        }));
        closeDeleteModal();
    }

    const createShiftFunction = (data) => {
        console.log('created: ', data);
        data.time_in = dayjs(data.time[0].$d).format('HH:mm:ss');
        data.time_out = dayjs(data.time[1].$d).format('HH:mm:ss');
        delete data.time;

        dispatch(createShift(data));
    }

    const updateShiftFunction = (data) => {
        console.log('updated: ', data);
        data.time_in = dayjs(data.time[0].$d).format('HH:mm:ss');
        data.time_out = dayjs(data.time[1].$d).format('HH:mm:ss');
        delete data.time;

        console.log(data);
        if (data.name === selectedShift.name) {
            delete data.name;
        }
        if (data.time_in === selectedShift.time_in) {
            console.log('hey');
            delete data.time_in;
        }
        if (data.time_out === selectedShift.time_out) {
            delete data.time_out;
        }
        if (Object.keys(data).length !== 0) {
            data.id = selectedShift.schedule_id;
            dispatch(updateShift(data));
        }
    }

    const closeDeleteModal = () => {
        setSelectedShift(null);
        setOpenDeleteModal(false);
    }

    const closeShiftModal = () => {
        setSelectedShift(null);
        setOpenShiftModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        if (selectedShift) {
            updateShiftFunction(data);
        } else {
            createShiftFunction(data);
        }
        closeShiftModal();
    }

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'وقت الدخول',
            dataIndex: 'time_in',
            key: 'time_in',
            render: (time) => <Tag color="green">{time}</Tag>
        },
        {
            title: 'وقت الخروج',
            dataIndex: 'time_out',
            key: 'time_out',
            render: (time) => <Tag color="red">{time}</Tag>
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedShift(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            setSelectedShift(record);
                            console.log(record);
                            let time = [];
                            time = time.concat(dayjs(record.time_in, 'HH:mm:ss'), dayjs(record.time_out, 'HH:mm:ss'));
                            form.setFieldsValue({
                                name: record.name,
                                time: time
                            })
                            setOpenShiftModal(true);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const confirmUpdateWorkingDays = (data) => {
        dispatch(updateWorkingDays(data));
    }

    return (
        <Spinner loading={loading}>
            <div>
                <WorkingDays
                    workingDays={workingDays}
                    confirmUpdateWorkingDays={confirmUpdateWorkingDays}
                />

                <Holidays
                    open={openHolidays}
                    setOpen={setOpenHolidays}
                />

                <Table
                    columns={columns}
                    dataSource={shifts}
                    rowKey='schedule_id'
                />
                <Button
                    className="shiftButton"
                    onClick={() => setOpenShiftModal(true)}
                >
                    إضافة فترة عمل
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteShiftFunction}
                    handleCancel={closeDeleteModal}
                />

                <ShiftModal
                    open={openShiftModal}
                    handleCancel={closeShiftModal}
                    shift={selectedShift}
                    form={form}
                    onFinish={onFinish}
                />
            </div>
        </Spinner>
    );
}

export default ViewShifts;