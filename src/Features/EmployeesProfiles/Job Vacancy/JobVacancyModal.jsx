import { Button, Form, Input, Modal, Select } from "antd";

export default function JobVacancyModal({ open, onFinish, handleCancel, jobVacancy, form }) {
    const data = [
        {
            id: 1,
            name: 'التدريب',
            description: 'قسم التدريب الخاص بالمركز',
            employees_count: 10
        },
        {
            id: 2,
            name: 'الإعلامي',
            description: 'قسم التدريب الخاص بالمركز',
            employees_count: 10
        }
    ];

    const { Option } = Select;
    return (
        <Modal
            // zIndex={1500}
            centered
            open={open}
            title={jobVacancy ? "تعديل الشاغر الوظيفي" : "إضافة شاغر وظيفي"}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                key={jobVacancy}
                form={form}
                size='middle'
                name="jobVacancyForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم الشاغر',
                        },
                    ]}
                >
                    <Input placeholder='اسم الشاغر' />
                </Form.Item>

                <Form.Item
                    name="department_id"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء اختيار القسم',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="اختيار القسم"
                        filterOption={(input, option) => {
                            console.log(option);
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }

                        }
                    >
                        {data.map((d) => <Option value={d.id} key={d.id}>{d.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ width: '50%' }}
                    name="employees_count"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال عدد الموظفين',
                        },
                        {
                            pattern: /^[1-9]\d*$/,
                            message: 'يجب إدخال الأرقام الموجبة فقط'
                        }
                    ]}
                >
                    <Input
                        placeholder='عدد الموظفين'
                    />
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