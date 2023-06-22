import { Button, DatePicker, Form, InputNumber, Modal, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function MakeTimeShiftRequestModal({ open, onFinish, handleCancel, form }) {

    return (
        <Modal
            centered
            open={open}
            title="تقديم طلب إزاحة دوام"
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                size='middle'
                name="timeShiftForm"
                onFinish={onFinish}
                autoComplete="off"
            >

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
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال المدة',
                        },
                    ]}
                >
                    <InputNumber min={1} placeholder='المدة' />
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

                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال سبب طلب الإزاحة',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder='سبب طلب الإزاحة' />
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