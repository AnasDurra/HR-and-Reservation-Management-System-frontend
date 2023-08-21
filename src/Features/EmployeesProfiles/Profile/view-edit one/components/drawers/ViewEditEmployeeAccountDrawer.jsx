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
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const sliceError = useSelector((state) => state.employeesSlice.error);

  useEffect(() => {
    form.setFieldsValue({
      username,
      //  password,
      emp_id,
      email,
    });
    updateSaveBtn();
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
        console.log('slll', sliceError);
        if (sliceError === null) onClose();
      })
      .catch((_) => {});

  const updateSaveBtn = () =>
    setIsSaveBtnDisabled(
      form.getFieldValue(['username']) === username
      // &&  form.getFieldValue(["password"]) === password
    );

  return (
    <Drawer
      title={` حساب الموظَف ( ${employeeName} )`}
      placement='top'
      onClose={onClose}
      open={isOpen}
      footer={
        <Space>
          <Button onClick={onClose}>إلغاء</Button>
          <Tooltip
            title={'لا يوجد تغييرات لحفظها'}
            trigger={isSaveBtnDisabled ? 'hover' : ''}
            popupVisible={isSaveBtnDisabled}
          >
            <Button
              type='primary'
              onClick={editAccount}
              disabled={isSaveBtnDisabled}
            >
              حفظ
            </Button>
          </Tooltip>
        </Space>
      }
      height={'60%'}
    >
      <Form
        form={form}
        layout='vertical'
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
              <Input
                prefix={<UserOutlined />}
                onChange={updateSaveBtn}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['password']}
              rules={validationRules.password}
              label='كلمة السر'
            >
              <Input.Password
                prefix={<LockOutlined />}
                onChange={updateSaveBtn}
              />
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
