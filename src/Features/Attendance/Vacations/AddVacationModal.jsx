import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker } from "antd";

export default function AddVacationModal({ form, onFinish, handleCancel, open }) {

    const { Option } = Select;
    const employees = [
        {
            id: 4,
            name: 'hadi',
        },
        {
            id: 2,
            name: 'anas',
        }
    ];

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
                        showSearch
                        placeholder="اختيار الموظف"
                        filterOption={(input, option) => {
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    >
                        {employees.map((e) => <Option value={e.id} key={e.id}>{e.name}</Option>)}
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