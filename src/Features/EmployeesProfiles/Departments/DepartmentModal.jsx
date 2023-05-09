import { Button, Form, Input, Modal } from "antd";

export default function DepartmentModal({ open, onFinish, handleCancel, department, form }) {

    return (
        <Modal
            zIndex={1500}
            centered
            open={open}
            title={department ? "تعديل القسم" : "إضافة قسم"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                key={department}
                form={form}
                size='middle'
                name="departmentForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم القسم',
                        },
                    ]}
                >
                    <Input placeholder='اسم القسم' />
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <Input.TextArea placeholder='الوصف' />
                </Form.Item>


                <Form.Item>
                    <div className="departmentModal">
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