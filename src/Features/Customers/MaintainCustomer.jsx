import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCustomer, updateCustomer, getCustomer, getEducationalLevels } from "../../redux/customers/reducer";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";

function MaintainCustomer() {

    const customer = useSelector(state => state.customersReducer.customer);
    const educational_levels = useSelector(state => state.customersReducer.educational_levels);
    const customerLoading = useSelector(state => state.customersReducer.loading);
    const { custID } = useParams();

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { Option } = Select;

    useEffect(() => {
        form.setFieldsValue({
            num_of_children: 0,
        });
        dispatch(getEducationalLevels());
        if (custID) {
            dispatch(getCustomer({ id: custID }));
        }
    }, []);

    useEffect(() => {
        if (customer) {
            console.log(customer);
            form.setFieldsValue({
                first_name: customer?.first_name,
                last_name: customer?.last_name,
                phone_number: customer?.phone_number,
                phone: customer?.phone,
                birth_date: dayjs(customer?.birth_date),
                email: customer?.email,
                job: customer?.job,
                education_level_id: customer?.education_level?.education_level_id,
                martial_status: customer?.martial_status,
                num_of_children: customer?.num_of_children,
                national_number: customer?.national_number,
            });
        }
    }, [customer]);

    const onFinish = (data) => {
        console.log(data);
        if (!customer) {
            addCustomerFunction(data);
        } else {
            updateCustomerFunction(data);
        }
    }

    const addCustomerFunction = (data) => {
        data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        dispatch(addCustomer({ data: data, succeed: addCustomerSuccessed }));
    }

    const updateCustomerFunction = (data) => {
        data.id = custID;
        if (data.email === customer?.email) {
            console.log(data.email);
            delete data.email;
        }
        if (data.phone_number === customer?.phone_number) {
            delete data.phone_number;
        }
        if (data.phone === customer?.phone) {
            delete data.phone;
        }
        if (data.birth_date) {
            data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        }
        if (!data.national_number || data.national_number === customer?.national_number) {
            delete data.national_number;
        }
        console.log(data);
        dispatch(updateCustomer({ data: data, succeed: updateCustomerSuccessed }))
    }

    const addCustomerSuccessed = () => {
        navigate('/customers');
    }

    const updateCustomerSuccessed = () => {
        navigate('/customers');
    }

    const familyState = [
        {
            id: 1,
            name: 'متزوج',
        },
        {
            id: 2,
            name: 'أعزب',
        },
        {
            id: 3,
            name: 'خاطب',
        },
        {
            id: 4,
            name: 'مطلّق',
        },
        {
            id: 5,
            name: 'أرمل',
        },
    ];

    return (
        <Spinner loading={customerLoading}>
            <div>
                <Typography.Title level={3}>{!customer ? `إضافة مستفيد` : `تعديل بيانات المستفيد`}</Typography.Title>
                <Form
                    form={form}
                    size='middle'
                    name="customerForm"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                label="الاسم"
                                required={false}
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال اسم المستفيد',
                                    },
                                ]}
                            >
                                <Input placeholder='الاسم' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="الكنية"
                                required={false}
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال الكنية',
                                    },
                                ]}
                            >
                                <Input placeholder='الكنية' />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                label="البريد الالكتروني"
                                required={false}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال البريد الالكتروني',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'الرجاء ادخال بريد الكتروني صالح'
                                    }
                                ]}
                            >
                                <Input placeholder='البريد الإلكتروني' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="رقم الهاتف الجوال"
                                required={false}
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال رقم الهاتف الجوال',
                                    },
                                ]}
                            >
                                <Input placeholder='رقم الهاتف الجوال' />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                label="رقم الهاتف الأرضي"
                                required={false}
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال رقم الهاتف الأرضي',
                                    },
                                ]}
                            >
                                <Input placeholder="رقم الهاتف الأرضي" />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="المستوى التعليمي"
                                name="education_level_id"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال المستوى التعليمي',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="اختيار المستوى التعليمي"
                                    filterOption={false}
                                >
                                    {educational_levels.map((l) => <Option value={l.education_level_id} key={l.education_level_id}>{l.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col span={11}>
                            <Form.Item
                                label="الحالة العائلية"
                                required={false}
                                name="martial_status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء اختيار العيادة',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="اختيار الحالة"
                                    filterOption={false}
                                >
                                    {familyState.map((c) => <Option value={c.id} key={c.id}>{c.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="المهنة"
                                name="job"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال المهنة',
                                    },
                                ]}
                            >
                                <Input placeholder='المهنة' />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                name="birth_date"
                                label="تاريخ الميلاد"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال تاريخ الميلاد',
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder='تاريخ الميلاد' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                name="num_of_children"
                                label="عدد الأولاد"
                                required={false}
                            >
                                <InputNumber style={{ width: '100%' }} placeholder='عدد الأولاد' />
                            </Form.Item>
                        </Col>

                        {customer ?
                            <Col span={24}>
                                <Form.Item
                                    name="national_number"
                                    label="الرقم الوطني"
                                    required={false}
                                >
                                    <InputNumber style={{ width: '100%' }} placeholder='الرقم الوطني' />
                                </Form.Item>
                            </Col> : null}


                        <Form.Item>
                            <div className="bioModal">
                                <Button type="primary" htmlType="submit">
                                    تأكيد
                                </Button>
                                <Button key="back" onClick={() => navigate(-1)}>
                                    إلغاء
                                </Button>

                            </div>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Spinner>
    );
}

export default MaintainCustomer;