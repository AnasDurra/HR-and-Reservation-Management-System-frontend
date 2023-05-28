import { Button, Form, Input, Modal } from "antd";

export default function BioMetricDeviceModal({ open, onFinish, handleCancel, device, form }) {

    return (
        <Modal
            zIndex={1200}
            centered
            open={open}
            title={device ? "تعديل جهاز" : "إضافة جهاز"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                key={device}
                form={form}
                size='middle'
                name="biometricDeviceForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم الجهاز',
                        },
                    ]}
                >
                    <Input placeholder='اسم الجهاز' />
                </Form.Item>

                <Form.Item
                    name="ip"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال عنوان الـ ip الخاص بالجهاز',
                        },
                    ]}
                >
                    <Input placeholder='عنوان الـ ip' />
                </Form.Item>


                <Form.Item>
                    <div className="bioModal">
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