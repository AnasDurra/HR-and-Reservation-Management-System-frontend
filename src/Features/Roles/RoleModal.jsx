import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

export default function RoleModal({ open, onFinish, handleCancel, role, form, permissions, getPermissions }) {

    useEffect(() => {
        // getPermissions();
    }, []);

    const { Option } = Select;

    const localPermissions = [
        {
            name: "إدارة الاقسام",
            perm_id: 1
        }
    ];


    return (
        <Modal
            // zIndex={1500}
            centered
            open={open}
            title={role ? "تعديل المسمى الوظيفي" : "إضافة مسمى وظيفي"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                key={role}
                form={form}
                size='middle'
                name="roleForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم المسمى الوظيفي',
                        },
                    ]}
                >
                    <Input placeholder='اسم المسمى الوظيفي' />
                </Form.Item>

                <Form.Item
                    name="permissions"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء اختيار الصلاحيات',
                        },
                    ]}
                >
                    <Select
                        mode='multiple'
                        showSearch
                        placeholder="اختيار الصلاحيات"
                        filterOption={(input, option) => {
                            console.log(option);
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }

                        }
                    >
                        {localPermissions.map((p) => <Option value={p.perm_id} key={p.perm_id}>{p.name}</Option>)}
                    </Select>
                </Form.Item>


                <Form.Item
                    name="description"
                >
                    <Input.TextArea placeholder='الوصف' />
                </Form.Item>

                <Form.Item>
                    <div className="roleModal">
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