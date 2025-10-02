import { Button, Form, Input, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginForm({ onFinish, loading }) {
  return (
    <div className="form">
      <Space
        direction="vertical"
        size="small"
        style={{ width: "100%", textAlign: "center", marginBottom: "32px" }}
      >
        <Typography.Title
          level={2}
          style={{ marginBottom: "8px", fontWeight: 600 }}
        >
          أهلا بك!
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: "15px" }}>
          تسجيل الدخول إلى حسابك
        </Typography.Text>
      </Space>
      <Form
        className="formItems"
        size="large"
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          className="formItem"
          // label={<span style={{ fontWeight: 500 }}>اسم المستخدم</span>}
          name="username"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال اسم المستخدم",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#8c8c8c" }} />}
            placeholder="أدخل اسم المستخدم"
            className="elegant-input"
          />
        </Form.Item>

        <Form.Item
          className="formItem"
          // label={<span style={{ fontWeight: 500 }}>كلمة المرور</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال كلمة المرور",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
            placeholder="أدخل كلمة المرور"
            className="elegant-input"
          />
        </Form.Item>

        <Form.Item style={{ marginTop: "24px" }}>
          <Button
            loading={loading}
            className="submitButton"
            type="primary"
            htmlType="submit"
            size="large"
          >
            تسجيل الدخول
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
