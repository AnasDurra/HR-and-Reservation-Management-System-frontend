import { Button, DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import dayjs from "dayjs";

export default function TimeSheetModal({ open, onFinish, handleCancel, action, form }) {

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
                    <DatePicker defaultValue={dayjs()} placeholder='التاريخ' />
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
                        showSearch
                        placeholder="اختيار الموظف"
                        filterOption={(input, option) => {
                            console.log(option);
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    >
                        {employees.map((e) => <Option value={e.id} key={e.id}>{e.name}</Option>)}
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
                    <TimePicker defaultValue={dayjs().second(0)} placeholder='الوقت' />
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