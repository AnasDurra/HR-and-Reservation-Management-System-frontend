import { DeleteOutlined, SwapOutlined, SwitcherOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tag } from "antd";
import './Holidays.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHolidays, addHoliday, deleteHoliday, updateHoliday } from "../../../../redux/holidays/reducer";
import HolidayForm from "./HolidayForm";
import dayjs from "dayjs";

export default function Holidays({ open, setOpen }) {

    const holidays = useSelector(state => state.holidaysReducer.holidays);
    const dispatch = useDispatch();

    const [isAddHoliday, setIsAddHoliday] = useState(false);
    const [selectedHoliday, setSelectedHoliday] = useState(null);


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
            key: 'is_recurring',
            render: (record) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Tag
                            color={record.is_recurring ? "green" : "red"}
                        >
                            {record.is_recurring ? 'نعم' : 'لا'}
                        </Tag>
                        <SwapOutlined
                            onClick={() =>
                                dispatch(updateHoliday({
                                    id: record.holiday_id,
                                    is_recurring: !record.is_recurring,
                                }))
                            }
                        />
                    </div>
                );
            }
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedHoliday(record);
                            dispatch(deleteHoliday({
                                id: record.holiday_id,
                            }));
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const onFinish = (data) => {
        data.date = formatTime(data.date);
        dispatch(addHoliday(data));
        setIsAddHoliday(false);
    }

    const formatTime = (date) => {
        return dayjs(date.$d).format('YYYY-MM-DD');
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
                            setIsAddHoliday(!isAddHoliday);
                        }}
                    >
                        {isAddHoliday ? 'العودة' : 'إضافة إجازة'}
                    </Button>}
                onCancel={() => { setOpen(false); setIsAddHoliday(false); }}
                footer={null}
            >
                {!isAddHoliday ?
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