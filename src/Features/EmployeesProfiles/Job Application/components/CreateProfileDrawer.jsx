import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Drawer,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getDepartments } from "../../../../redux/departments/slice";

function CreateProfileDrawer({ onClose, open, employeeName }) {
  const [form] = useForm();
  const dispatch = useDispatch();

  console.log(open);

  useEffect(() => {
    //TODO fetch departments & job titles & schedules
    dispatch(getDepartments());
    
  }, []);

  const createProfile = () => {};
  return (
    <Drawer
      title={`إنشاء حساب موظّف ( ${employeeName} )`}
      placement="top"
      onClose={onClose}
      open={open}
      footer={
        <Space>
          <Button onClick={onClose}>الغاء</Button>
          <Button type="primary" onClick={createProfile}>
            إنشاء
          </Button>
        </Space>
      }
      height={"60%"}
    >
      <Form
        form={form}
        layout="vertical"
        //  style={{ width: "50%", height: "50%" }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="اسم المستخدم"
              validateStatus="error"
              help="قم بإدخال اسم مستخدم غير موجود مسبقاَ في النظام"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="كلمة السر">
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="القسم">
              <Select />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="المسمَى الوظيفي">
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
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
