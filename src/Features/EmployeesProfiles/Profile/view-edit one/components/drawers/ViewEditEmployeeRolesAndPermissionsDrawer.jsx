import { Button, Col, Form, Row, Select, Space, Drawer } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPermissions, getRoles } from '../../../../../../redux/roles/slice';
import { validationRules } from '../editRolesAndPermissionsValidationRules';
import {
  getEmployee,
  updateEmployeeRolesAndPermissions,
} from '../../../../../../redux/Features/Employee Profile/Employee/slice';

function ViewEditEmployeeRolesAndPermissionsDrawer({
  onClose,
  isOpen,
  current_job_title_id,
  permissions,
  emp_id,
  employeeName,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const rolesSlice = useSelector((state) => state.rolesSlice);
  const [options, setOptions] = useState();
  const [selectedRole, setSelectedRole] = useState();

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getPermissions());
    setSelectedRole(rolesSlice.roles.find((role) => role.job_title_id === current_job_title_id));
  }, []);
  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      dispatch(getRoles());
      dispatch(getPermissions());
      setSelectedRole(rolesSlice.roles.find((role) => role.job_title_id === current_job_title_id));
      const excludedPermissions = permissions?.filter((p) => p.type == 'excluded').map((p) => p.perm_id);
      const grantedPermissions = permissions?.filter((p) => p.type == 'granted').map((p) => p.perm_id);
      const defaultPermissions = permissions?.filter((p) => p.type == 'default').map((p) => p.perm_id);

      const currentPermissions = [
        ...grantedPermissions,
        ...defaultPermissions.filter((permissionId) => !excludedPermissions.includes(permissionId)),
      ];

      form.setFieldValue(['job_title_id'], current_job_title_id);
      form.setFieldValue(['permissions'], currentPermissions);
      /*    form.setFieldValue(['permissions'], [...selectedRole.permissions.map((perm) => perm.perm_id)]);
      form.setFieldValue(['job_title_id'], current_job_title_id); */
    }
  }, [isOpen]);

  const onJobTitleSelect = (id) => {
    const selectedPerms = form.getFieldValue(['permissions']);
    const selectedJobTitle = rolesSlice.roles.find((role) => role.job_title_id === id);
    setSelectedRole(selectedJobTitle);
    form.resetFields();
    form.setFieldValue(['job_title_id'], id);
    form.setFieldValue(
      ['permissions'],
      selectedJobTitle?.permissions?.map((p) => p.perm_id)
    );
  };

  /*   const createProfile = () =>
    form
      .validateFields()
      .then((_) => {
        //TODO call create api
      })
      .catch((_) => {}); */

  return (
    <Drawer
      title={` المسمى والوظيفي والصلاحيلات للموظَف ( ${employeeName} )`}
      placement='top'
      onClose={onClose}
      open={isOpen}
      footer={
        <Space>
          <Button onClick={onClose}>إلغاء</Button>
          <Button
            type='primary'
            onClick={() => {
              form.submit();
            }}
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
          //TODO dispatch the update action
          const excludedPermissions = permissions?.filter((p) => p.type == 'excluded').map((p) => p.perm_id);

          dispatch(
            updateEmployeeRolesAndPermissions({
              data: {
                additional_permissions_ids: form
                  .getFieldValue(['permissions'])
                  .filter(
                    (permission) =>
                      !selectedRole?.permissions.map((perm) => perm.perm_id).includes(permission) ||
                      excludedPermissions?.includes(permission)
                  ),

                deleted_permissions_ids: selectedRole?.permissions
                  .filter((permission) => !form.getFieldValue(['permissions']).includes(permission.perm_id))
                  .map((perm) => perm.perm_id),
                job_title_id: selectedRole?.job_title_id,
                id: emp_id,
              },

              action: onClose,
              reload: () => dispatch(getEmployee(emp_id)),
            })
          );
        }}
      >
        <Form.Item
          name={'emp_id'}
          noStyle
        />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={['job_title_id']}
              rules={validationRules.job_title_id}
              label='المسمَى الوظيفي'
            >
              <Select
                defaultValue={current_job_title_id}
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
              label='الصلاحيات'
            >
              <Select
                options={rolesSlice?.permissions?.map((perm) => ({
                  value: perm.perm_id,
                  label: selectedRole?.permissions.some((rperm) => rperm.perm_id == perm.perm_id) ? (
                    <span style={{ color: 'green' }}>{`افتراضي : ${perm.name}`}</span>
                  ) : (
                    `+ ${perm.name}`
                  ),
                }))}
                mode='multiple'
                loading={rolesSlice?.loading}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                defaultValue={permissions?.map((perm) => perm.perm_id)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default ViewEditEmployeeRolesAndPermissionsDrawer;
