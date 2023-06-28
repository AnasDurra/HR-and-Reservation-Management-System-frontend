import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getIndexedEmployees } from "../../../redux/Features/Employee Profile/Employee/slice";
import { useEffect } from "react";

export default function AddVacationModal({ form, onFinish, handleCancel, open }) {

    const { Option } = Select;

    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeesSlice.indexedEmployees);
    const loading = useSelector(state => state.employeesSlice.loading);

    const handleSearch = (data) => {
        console.log(data);
        dispatch(getIndexedEmployees({ name: data }));
    }

    useEffect(() => {
        dispatch(getIndexedEmployees());
    }, [dispatch]);

    return (
        <Modal
            centered
            open={open}
            title={"تسجيل إجازة"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                size='middle'
                name="addVacationForm"
                onFinish={onFinish}
                autoComplete="off"
            >

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
                    name="start_date"
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
                    name="total_days"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال المدة',
                        },
                    ]}
                >
                    <InputNumber min={1} placeholder='المدة' />
                </Form.Item>


                <Form.Item>
                    <div className="employeesVacationsModal">
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