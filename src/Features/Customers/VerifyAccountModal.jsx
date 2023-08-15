import { Button, Form, Input, Modal } from "antd";

export default function VerifyAccountModal({ open, onFinish, handleCancel, form }) {

    return (
        <Modal
            zIndex={1200}
            centered
            open={open}
            title="توثيق حساب المستفيد"
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                size='middle'
                name="verifyForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="national_number"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال الرقم الوطني',
                        },
                    ]}
                >
                    <Input placeholder='الرقم الوطني' />
                </Form.Item>

                <Form.Item>
                    <div className="verifyAccountModal">
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