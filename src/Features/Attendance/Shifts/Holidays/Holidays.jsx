import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch, Table, Tag, Typography } from "antd";
import './Holidays.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHolidays } from "../../../../redux/holidays/reducer";
import HolidayForm from "./HolidayForm";

export default function Holidays({ open, setOpen }) {

    const holidays = useSelector(state => state.holidaysReducer.holidays);

    const dispatch = useDispatch();

    const [addHoliday, setAddHoliday] = useState(false);


    useEffect(() => {
        dispatch(getHolidays());
    }, [dispatch]);

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'التاريخ',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'متكررة',
            dataIndex: 'is_recurring',
            key: 'is_recurring',
            render: (is_recurring) => is_recurring ? <Tag color="green">نعم</Tag> : <Tag color="red">لا</Tag>
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            // setSelectedShift(record);
                            // setOpenDeleteModal(true);
                        }} />
                        {/* <EditOutlined onClick={() => {
                            setSelectedShift(record);
                            console.log(record);
                            let time = [];
                            time = time.concat(dayjs(record.time_in, 'HH:mm:ss'), dayjs(record.time_out, 'HH:mm:ss'));
                            form.setFieldsValue({
                                name: record.name,
                                time: time
                            })
                            setOpenShiftModal(true);
                        }} /> */}
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const onFinish = (data) => {
        console.log(data);
    }

    return (
        <div className="holidaysModal">
            <Button
                onClick={() => setOpen(true)}
            >
                الإجازات الرسمية
            </Button>
            <Modal
                zIndex={1200}
                centered
                open={open}
                title={
                    <Button
                        onClick={() => {
                            setAddHoliday(!addHoliday);
                        }}
                    >
                        {addHoliday ? 'العودة' : 'إضافة إجازة'}
                    </Button>}
                onCancel={() => { setOpen(false); setAddHoliday(false); }}
                footer={null}
            >
                {!addHoliday ?
                    <Table
                        rowKey="holiday_id"
                        columns={columns}
                        dataSource={holidays}
                        scroll={{ x: 'max-content' }}
                    /> : <HolidayForm onFinish={onFinish} />}
            </Modal>
        </div>
    );
}