import { Button, Col, Divider, Form, Input, Row, Select, Space, Drawer, DatePicker, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { validationRules } from '../../../../Job Application/createProfileValidationRules';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeCredentials } from '../../../../../../redux/Features/Employee Profile/Employee/slice';

function ViewEditEmployeeAccountDrawer({
  username,
  // password,
  emp_id,
  employeeName,
  email,
  isOpen,
  onClose,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();

  const sliceError = useSelector((state) => state.employeesSlice.error);

  useEffect(() => {
    form.setFieldsValue({
      username,
      //  password,
      emp_id,
      email,
    });
  }, [isOpen]);

  const editAccount = () =>
    form
      .validateFields()
      .then((_) => {
        dispatch(
          updateEmployeeCredentials({
            id: emp_id,
            username: form.getFieldValue(['username']),
            password: form.getFieldValue(['password']),
            email: form.getFieldValue(['email']),
          })
        );

        if (sliceError === null) onClose();
      })
      .catch((_) => {});

  return (
    <Drawer
      title={` حساب الموظَف ( ${employeeName} )`}
      placement='top'
      onClose={onClose}
      open={isOpen}
      footer={
        <Space>
          <Button onClick={onClose}>إلغاء</Button>

          <Button
            type='primary'
            onClick={() => form.submit()}
          >
            حفظ
          </Button>
        </Space>
      }
      height={'60%'}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={() => {
          editAccount();
        }}
      >
        <Form.Item
          name={['emp_id']}
          noStyle
        />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={['username']}
              label='اسم المستخدم'
              //  validateStatus="error"
              //</Col> help="قم بإدخال اسم مستخدم غير موجود مسبقاَ في النظام"
              rules={validationRules.username}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['password']}
              rules={validationRules.password}
              label='كلمة السر'
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              name={'email'}
              label='البريد الإلكتروني'
              rules={validationRules.email}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default ViewEditEmployeeAccountDrawer;
