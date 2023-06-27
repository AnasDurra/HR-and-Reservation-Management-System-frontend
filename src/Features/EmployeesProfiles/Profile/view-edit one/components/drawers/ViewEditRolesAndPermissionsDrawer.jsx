import { Button, Col, Form, Row, Select, Space, Drawer } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPermissions, getRoles } from "../../../../redux/roles/slice";
import { validationRules } from "../createProfileValidationRules";

function ViewEditRolesAndPermissionsDrawer({
  onClose,
  isOpen,
  current_job_title,
  permissions,
  emp_id,
  employeeName,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const rolesSlice = useSelector((state) => state.rolesSlice);

  useEffect(() => {
    if (isOpen) {
      dispatch(getRoles());
      dispatch(getPermissions());
    }
  }, [isOpen]);

  const onJobTitleSelect = (id) => {
    const selectedPerms = form.getFieldValue(["permissions"]);
    const selectedJobTitle = rolesSlice.roles.find(
      (role) => role.job_title_id === id
    );
    form.setFieldValue(
      ["permissions"],
      [...selectedJobTitle.permissions.map((perm) => perm.perm_id)]
    );
  };

  const createProfile = () =>
    form
      .validateFields()
      .then((_) => {
        //TODO call create api
      })
      .catch((_) => {});

  return (
    <Drawer
      title={` المسمى والوظيفي والصلاحيلات للموظَف ( ${employeeName} )`}
      placement="top"
      onClose={onClose}
      open={isOpen}
      footer={
        <Space>
          <Button onClick={onClose}>إلغاء</Button>
          <Button type="primary" onClick={createProfile}>
            إنشاء
          </Button>
        </Space>
      }
      height={"60%"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name={"emp_id"} noStyle />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={["job_title_id"]}
              rules={validationRules.job_title_id}
              label="المسمَى الوظيفي"
            >
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
            <Form.Item name={["permissions"]} label="الصلاحيات">
              <Select
                options={rolesSlice?.permissions?.map((perm) => ({
                  value: perm.perm_id,
                  label: perm.name,
                }))}
                mode="multiple"
                loading={rolesSlice?.loading}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default ViewEditRolesAndPermissionsDrawer;
