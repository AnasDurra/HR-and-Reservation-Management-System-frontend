import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addConsultant, getConsultant, updateConsultant } from "../../redux/consultants/reducer";
import { getClinics } from "../../redux/clinics/reducer";
import dayjs from "dayjs";
import { useEffect } from "react";
import Spinner from "../../Components/Spinner/Spinner";

function MaintainConsultant() {

    const clinics = useSelector(state => state.clinicsReducer.clinics);
    const clinicsLoading = useSelector(state => state.clinicsReducer.loading);
    const clinicsError = useSelector(state => state.clinicsReducer.loading);

    const consultant = useSelector(state => state.consultantsReducer.consultant);
    const consultantLoading = useSelector(state => state.consultantsReducer.loading);
    const { consID } = useParams();

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { Option } = Select;

    useEffect(() => {
        dispatch(getClinics());
        if (consID) {
            dispatch(getConsultant({ id: consID }));
        }
    }, []);

    useEffect(() => {
        if (consultant) {
            console.log(consultant);
            form.setFieldsValue({
                first_name: consultant?.first_name,
                last_name: consultant?.last_name,
                phone_number: consultant?.phone_number,
                address: consultant?.address,
                birth_date: dayjs(consultant?.birth_date),
                clinic_id: consultant?.clinic_id,
                email: consultant?.user?.user_email,
            });
        }
    }, [consultant]);

    const onFinish = (data) => {
        console.log(data);
        if (!consultant) {
            addConsultantFunction(data);
        } else {
            updateConsultantFunction(data);
        }
    }

    const addConsultantFunction = (data) => {
        data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        dispatch(addConsultant({ data: data, succeed: addConsultantSuccessed }));
    }

    const updateConsultantFunction = (data) => {
        data.id = consID;
        if (data.email === consultant?.user?.user_email) {
            console.log(data.email);
            delete data.email;
        }
        if (data.phone_number === consultant?.phone_number) {
            delete data.phone_number;
        }
        if (data.birth_date) {
            data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        }
        console.log(data);
        dispatch(updateConsultant({ data: data, succeed: updateConsultantSuccessed }))
    }

    const addConsultantSuccessed = () => {
        navigate('/consultants');
    }

    const updateConsultantSuccessed = () => {
        navigate('/consultants');
    }

    return (
        <Spinner loading={consultantLoading}>
            <div>
                <Typography.Title level={3}>{!consultant ? `إضافة استشاري` : `تعديل بيانات الاستشاري`}</Typography.Title>
                <Form
                    form={form}
                    size='middle'
                    name="consultantForm"
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
                                        message: 'الرجاء ادخال اسم الاستشاري',
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
                                label="رقم الهاتف"
                                required={false}
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال رقم الهاتف',
                                    },
                                ]}
                            >
                                <Input placeholder='رقم الهاتف' />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                label="العنوان"
                                name="address"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال عنوان الاستشاري',
                                    },
                                ]}
                            >
                                <Input placeholder='عنوان الاستشاري' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="العيادة"
                                required={false}
                                name="clinic_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء اختيار العيادة',
                                    },
                                ]}
                            >
                                <Select
                                    loading={clinicsLoading}
                                    showSearch
                                    placeholder="اختيار العيادة"
                                    filterOption={false}
                                >
                                    {clinics.map((c) => <Option value={c.id} key={c.id}>{c.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
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
                                <DatePicker placeholder='تاريخ الميلاد' />
                            </Form.Item>
                        </Col>


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

export default MaintainConsultant;