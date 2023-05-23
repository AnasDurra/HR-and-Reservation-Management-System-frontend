import { Button, Form, Select } from "antd";
import './ChangeEmployeePermissions.css';
import { useEffect, useState } from "react";

function ChangeEmployeePermissions() {

    const [selectedEmployee, setSelectedEmployee] = useState();

    useEffect(() => {
        const employee = exmployees.find(e => e.id === selectedEmployee);
        if (employee) {
            form.setFieldsValue({
                permissions: employee.permissions,
            })
        }
    }, [selectedEmployee]);

    const exmployees = [
        {
            id: 1,
            name: 'hadi',
            permissions: [1, 2],
        },
        {
            id: 2,
            name: 'anas',
            permissions: [2, 3],
        }
    ];

    const permissions = [
        {
            id: 1,
            name: 'إدارة الاقسام',
        },
        {
            id: 2,
            name: 'إدارة طلبات التوظيف',
        },
        {
            id: 3,
            name: 'إدارة الدورات',
        },
    ];

    const [form] = Form.useForm();
    const { Option } = Select;

    const onFinish = (data) => {
        console.log(data);
    }



    return (
        <div>
            <Form
                className="changeEmployeeForm"
                form={form}
                name="changePermissionsForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="employee_id"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء اختيار الموظف',
                        },
                    ]}
                >
                    <Select
                        onSelect={(id) => setSelectedEmployee(id)}
                        showSearch
                        placeholder="اختيار الموظف"
                        filterOption={(input, option) => {
                            console.log(option);
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }

                        }
                    >
                        {exmployees.map((e) => <Option value={e.id} key={e.id}>{e.name}</Option>)}
                    </Select>
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
                        {permissions.map((p) => <Option value={p.id} key={p.id}>{p.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item>
                    {/* <div className="changePermissionsButtons"> */}
                        <Button type="primary" htmlType="submit">
                            تأكيد
                        </Button>
                        {/* <Button key="back" onClick={handleCancel}>
                            إلغاء
                        </Button> */}

                    {/* </div> */}
                </Form.Item>
            </Form>
        </div>
    );
}

export default ChangeEmployeePermissions;