import { Button, Form, Input, Spin } from "antd";
import Typography from "antd/es/typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Customers.css';
import { getDetectResult } from "../../redux/customers/reducer";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function DetectCustomer() {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const detectResult = useSelector(state => state.customersReducer.detectResult);
    const loading = useSelector(state => state.customersReducer.loading);
    const error = useSelector(state => state.customersReducer.error);


    const onFinish = (data) => {
        dispatch(getDetectResult(data));
    };

    const showResult = () => {
        if (detectResult?.status === 1) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>الرقم الوطني غير موجود بالنظام.</Typography>
                        <CloseCircleOutlined style={{ color: "red", marginRight: '5px' }} />
                    </div>

                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate('/customers/add')}>
                        إنشاء حساب مستفيد
                    </Button>
                    <Button
                        onClick={() => navigate('/customers')}
                        style={{ display: "block", marginTop: "15px" }}
                    >
                        توثيق حساب التطبيق بحال وجوده
                    </Button>
                </div>
            );
        } else if (detectResult?.status === 2) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>الرقم الوطني موجود بالنظام.</Typography>
                        <CheckCircleOutlined style={{ color: "green", marginRight: '5px' }} />
                    </div>
                    <Typography>تمّ تسجيل المستفيد عن طريق لوحة التحكم.</Typography>
                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate(`/customers/view/${detectResult?.customer_id}`)}>
                        استعراض الحساب
                    </Button>
                    <Button
                        onClick={() => navigate('/customers')}
                        style={{ display: "block", marginTop: "15px" }}
                    >
                        توثيق حساب التطبيق بحال وجوده
                    </Button>
                </div>
            );
        } else if (detectResult?.status === 3) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>الرقم الوطني موجود بالنظام.</Typography>
                        <CheckCircleOutlined style={{ color: "green", marginRight: '5px' }} />
                    </div>
                    <Typography>تمّ تسجيل المستفيد عن طريق تطبيق الهاتف و تمّ توثيق حسابه.</Typography>
                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate(`/customers/view/${detectResult?.customer_id}`)}>
                        استعراض الحساب
                    </Button>
                </div>
            );
        } else if (loading) {
            return (
                <Spin className="loadingSpinner" size="large" />
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            <Typography.Title level={4}>
                إجراء عملية الكشف عن حساب المستفيد
            </Typography.Title>

            <Form
                form={form}
                size='middle'
                name="detectCustomerForm"
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="detectForm">
                    <Form.Item
                        style={{ width: "100%" }}
                        required={false}
                        name="national_number"
                        rules={[
                            {
                                required: true,
                                message: 'الرجاء ادخال الرقم الوطني الخاص بالمستفيد',
                            },
                        ]}
                    >
                        <Input placeholder="الرقم الوطني الخاص بالمستفيد" />
                    </Form.Item>

                    <Form.Item className="detectSubmit">
                        <Button type="primary" htmlType="submit">
                            الكشف
                        </Button>
                    </Form.Item>
                </div>
            </Form>

            {showResult()}
        </div>
    );
};

export default DetectCustomer;