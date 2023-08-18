import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../../redux/departments/slice";

export default function JobVacancyModal({ open, onFinish, handleCancel, jobVacancy, form }) {


    const dispatch = useDispatch();
    const departments = useSelector(state => state.departmentsSlice.departments);
    const loading = useSelector(state => state.departmentsSlice.loading);

    useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    const { Option } = Select;
    return (
        <Modal
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
                    name="dep_id"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء اختيار القسم',
                        },
                    ]}
                >
                    <Select
                        loading={loading}
                        showSearch
                        placeholder="اختيار القسم"
                        filterOption={(input, option) => {
                            console.log(option);
                            return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }

                        }
                    >
                        {departments.map((d) => <Option value={d.dep_id} key={d.dep_id}>{d.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ width: '50%' }}
                    name="count"
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