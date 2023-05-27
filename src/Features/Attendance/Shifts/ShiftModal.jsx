import { Button, Form, Input, Modal, TimePicker } from "antd";

export default function ShiftModal({ open, onFinish, handleCancel, shift, form }) {

    return (
        <Modal
            zIndex={1200}
            centered
            open={open}
            title={shift ? "تعديل فترة العمل" : "إضافة فترة عمل"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                key={shift}
                form={form}
                size='middle'
                name="shiftForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم الفترة',
                        },
                    ]}
                >
                    <Input placeholder='اسم الفترة' />
                </Form.Item>

                <Form.Item
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال الوقت',
                        },
                    ]}
                >
                    <TimePicker.RangePicker placeholder={['وقت الدخول', 'وقت الخروج']} />
                </Form.Item>


                <Form.Item>
                    <div className="shiftModal">
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