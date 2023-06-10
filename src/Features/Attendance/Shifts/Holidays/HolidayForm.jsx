import { Button, Form, Input, Switch, DatePicker, Typography } from "antd";
import { useEffect } from "react";

export default function HolidayForm({ onFinish }) {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            is_recurring: false
        });
    }, []);

    return (
        <Form
            form={form}
            size='middle'
            name="holidayForm"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'الرجاء ادخال اسم الإجازة',
                    },
                ]}
            >
                <Input placeholder='اسم الإجازة' />
            </Form.Item>

            <Form.Item
                name="date"
                rules={[
                    {
                        required: true,
                        message: 'الرجاء ادخال اسم الإجازة',
                    },
                ]}
            >
                <DatePicker placeholder='تاريخ الإجازة' />
            </Form.Item>

            <Form.Item
                name="is_recurring"
            >
                <div className="switchRecurringContainer">
                    <Typography>متكررة :</Typography>
                    <Switch
                        onChange={(value) => {
                            form.setFieldsValue({
                                is_recurring: value
                            });
                        }}
                        size="small" />
                </div>
            </Form.Item>

            <Form.Item>
                <div className="shiftModal">
                    <Button type="primary" htmlType="submit">
                        تأكيد
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}