import { Button, Form, Input } from "antd";
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
        console.log(data);
        // dispatch(getDetectResult(data));
    };

    const showResult = () => {
        if (detectResult === 1) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>.هذا الرقم الوطني غير موجود بالنظام</Typography>
                        <CloseCircleOutlined style={{ color: "red", marginRight: '5px' }} />
                    </div>

                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate('/customers/add')}>
                        إنشاء حساب مستفيد
                    </Button>
                    <Button style={{ display: "block", marginTop: "15px" }}>
                        توثيق حساب التطبيق بحال وجوده
                    </Button>
                </div>
            );
        } else if (detectResult === 2) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>الرقم الوطني موجود بالنظام.</Typography>
                        <CheckCircleOutlined style={{ color: "green", marginRight: '5px' }} />
                    </div>
                    <Typography>تمّ تسجيل المستفيد عن طريق لوحة التحكم.</Typography>
                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate('/customers/add')}>
                        استعراض الحساب
                    </Button>
                    <Button style={{ display: "block", marginTop: "15px" }}>
                        توثيق حساب التطبيق بحال وجوده
                    </Button>
                </div>
            );
        } else if (detectResult === 3) {
            return (
                <div>
                    <Typography.Title level={4}>النتيجة :</Typography.Title>
                    <div style={{ display: "flex" }}>
                        <Typography>الرقم الوطني موجود بالنظام.</Typography>
                        <CheckCircleOutlined style={{ color: "green", marginRight: '5px' }} />
                    </div>
                    <Typography>تمّ تسجيل المستفيد عن طريق تطبيق الهاتف.</Typography>
                    <Typography.Title level={4}>الاقتراحات :</Typography.Title>

                    <Button onClick={() => navigate('/customers/add')}>
                        استعراض الحساب
                    </Button>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            <Typography.Title level={4}>
                إجراء عملية كشف عن حساب مستفيد
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