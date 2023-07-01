import { Button, DatePicker, Form, Modal, Select, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIndexedEmployees } from "../../../redux/Features/Employee Profile/Employee/slice";
import { useEffect } from "react";

export default function TimeSheetModal({ open, onFinish, handleCancel, action, form }) {

    const { Option } = Select;
    
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeesSlice.indexedEmployees);
    const loading = useSelector(state => state.employeesSlice.loading);

    const handleSearch = (data) => {
        dispatch(getIndexedEmployees({ name: data }));
    }

    useEffect(() => {
        dispatch(getIndexedEmployees());
    }, [dispatch]);

    return (
        <Modal
            // zIndex={1200}
            centered
            open={open}
            title={action ? "تسجيل دخول" : "تسجيل مغادرة"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                size='middle'
                name="timeSheetForm"
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name={action ? "attendance_date" : "leave_date"}
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال التاريخ',
                        },
                    ]}
                >
                    <DatePicker placeholder='التاريخ' />
                </Form.Item>

                <Form.Item
                    name="emp_id"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء اختيار الموظف',
                        },
                    ]}
                >
                    <Select
                        loading={loading}
                        onSearch={handleSearch}
                        showSearch
                        placeholder="اختيار الموظف"
                        filterOption={false}
                    >
                        {employees.map((e) => <Option value={e.emp_id} key={e.emp_id}>{e.full_name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={action ? "attendance_time" : "leave_time"}
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال الوقت',
                        },
                    ]}
                >
                    <TimePicker placeholder='الوقت' />
                </Form.Item>


                <Form.Item>
                    <div className="timeSheetModal">
                        <Button type="primary" htmlType="submit">
                            تأكيد
                        </Button>
                        <Button key="back" onClick={handleCancel}>
                            إلغاء
                        </Button>

                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}