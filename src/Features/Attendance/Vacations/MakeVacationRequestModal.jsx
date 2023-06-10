import { Button, DatePicker, Form, Modal, Select, TimePicker } from "antd";
import dayjs from "dayjs";

export default function MakeVacationRequestModal({ open, onFinish, handleCancel, form }) {

    return (
        <Modal
            // zIndex={1200}
            centered
            open={open}
            title="تقديم طلب إجازة"
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                size='middle'
                name="vacationForm"
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name={"attendance_date"}
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال التاريخ',
                        },
                    ]}
                >
                    <DatePicker.RangePicker placeholder='التاريخ' />
                </Form.Item>

                <Form.Item
                    name={"attendance_time"}
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