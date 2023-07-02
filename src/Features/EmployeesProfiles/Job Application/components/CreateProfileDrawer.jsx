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
  DatePicker,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, getRoles } from '../../../../redux/roles/slice';
import { validationRules } from '../createProfileValidationRules';
import { getShifts } from '../../../../redux/shifts/reducer';
import { createEmployee } from '../../../../redux/Features/Employee Profile/Employee/slice';
import moment from 'moment';

function CreateProfileDrawer({ onClose, open, employeeName, job_app_id }) {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState();

  const rolesSlice = useSelector((state) => state.rolesSlice);
  const shiftsSlice = useSelector((state) => state.shiftsReducer);

  const onJobTitleSelect = (id) => {
    const jobTitle = rolesSlice.roles.find((role) => role.job_title_id === id);
    setSelectedRole(jobTitle);
    form.setFieldValue(
      ['permissions'],
      jobTitle?.permissions.map((perm) => perm.perm_id)
    );
  };

  useEffect(() => {
    if (open) {
      dispatch(getRoles());
      dispatch(getPermissions());
      dispatch(getShifts());
    }
  }, [open]);

  const createProfile = () => {
    form
      .validateFields()
      .then((_) => {
        dispatch(
          createEmployee({
            ...form.getFieldsValue(),
            start_date: moment(form.getFieldValue(['start_date'])).format('YYYY-MM-DD'),
          })
        );
      })
      .catch((e) => {console.log(e)});
  };
  return (
    <Drawer
      title={`إنشاء حساب موظّف ( ${employeeName} )`}
      placement='top'
      onClose={onClose}
      open={open}
      footer={
        <Space>
          <Button onClick={onClose}>إلغاء</Button>

          <Button
            type='primary'
            onClick={createProfile}>
            إنشاء
          </Button>
        </Space>
      }
      height={'60%'}>
      <Form
        form={form}
        layout='vertical'>
        <Form.Item
          name={'job_app_id'}
          initialValue={job_app_id}
          style={{ display: 'none' }}
          rules={validationRules.job_app_id}
        />

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={['username']}
              label='اسم المستخدم'
              //  validateStatus="error"
              //</Col> help="قم بإدخال اسم مستخدم غير موجود مسبقاَ في النظام"
              rules={validationRules.username}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name={['password']}
              rules={validationRules.password}
              label='كلمة السر'>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Form.Item
              name={'email'}
              label='البريد الإلكتروني'
              //  validateStatus="error"
              //</Col> help="قم بإدخال اسم مستخدم غير موجود مسبقاَ في النظام"
              rules={validationRules.email}>
              <Input prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={['job_title_id']}
              rules={validationRules.job_title_id}
              label='المسمَى الوظيفي'>
              <Select
                options={rolesSlice.roles.map((role) => ({
                  value: role.job_title_id,
                  label: role.name,
                }))}
                loading={rolesSlice?.loading}
                onSelect={onJobTitleSelect}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name={['permissions']}
              label='الصلاحيات'>
              <Select
                mode='multiple'
                loading={rolesSlice?.loading}
                options={rolesSlice?.permissions?.map((perm) => ({
                  value: perm.perm_id,
                  label: selectedRole?.permissions.some(
                    (rperm) => rperm.perm_id == perm.perm_id
                  ) ? (
                    <span style={{ color: 'green' }}>
                      {`افتراضي : ${perm.name}`}
                    </span>
                  ) : (
                    `+ ${perm.name}`
                  ),
                }))}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={'schedule_id'}
              rules={validationRules.schedule_id}
              label='جدول الدوام'>
              <Select
                options={shiftsSlice.shifts.map((shift) => ({
                  value: shift.schedule_id,
                  label: shift.name,
                }))}
                loading={shiftsSlice?.loading}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name={'start_working_date'}
              rules={validationRules.start_working_date}
              label='تاريخ بدأ العمل'>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default CreateProfileDrawer;
