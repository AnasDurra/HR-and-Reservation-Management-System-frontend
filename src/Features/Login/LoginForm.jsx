import { Button, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginForm({ onFinish, loading }) {
    return (
        <div className='form'>
            <Typography.Title level={2}  >أهلا بك!</Typography.Title>
            <Typography style={{ marginBottom: '10px' }}>تسجيل الدخول إلى حسابك</Typography>
            <Form
                className='formItems'
                size='large'
                name="login"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    className='formItem'
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال اسم المستخدم',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder='اسم المستخدم' />
                </Form.Item>

                <Form.Item
                    className='formItem'
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'الرجاء ادخال كلمة المرور',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='كلمة المرور' />
                </Form.Item>


                <Form.Item
                >
                    <Button 
                        loading={loading} 
                        className='submitButton' 
                        type="primary" 
                        htmlType="submit"
                    >
                        تأكيد
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;