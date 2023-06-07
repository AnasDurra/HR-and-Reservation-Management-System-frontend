import { Col, Divider, Form, Row, Select } from "antd";
import { useState } from "react";

function CreateProfileDrawer({ onClose}) {
  const [form] = useForm();

  const createProfile = () => {};
  return (
    <Drawer
      title={"إنشاء حساب موظَف"}
      placement="top"
      width={"100%"}
      height={"80%"}
      size={size}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>الغاء</Button>
          <Button type="primary" onClick={createProfile}>
            إنشاء
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="horizontal">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="اسم المستخدم">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="كلمة السر">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="القسم">
              <Select />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="المسمَى الوظيفي">
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="جدول الدوام">
              <Select />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default CreateProfileDrawer;
