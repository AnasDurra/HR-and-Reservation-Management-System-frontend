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
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPermissions, getRoles } from "../../../../redux/roles/slice";
import { validationRules } from "../createProfileValidationRules";

function CreateProfileDrawer({ onClose, open, employeeName, job_app_id }) {
  const [form] = useForm();
  const dispatch = useDispatch();

  const rolesSlice = useSelector((state) => state.rolesSlice);

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

  useEffect(() => {
    //TODO fetch departments & job titles & schedules
    if (open) {
      dispatch(getRoles());
      dispatch(getPermissions());
    }
  }, [open]);

  const createProfile = () => {
    form
      .validateFields()
      .then((_) => {
        //TODO call create api
      })
      .catch((_) => {});
  };
  return (
    <Drawer
      title={` حساب الموظَف ( ${employeeName} )`}
      placement="top"
      onClose={onClose}
      open={open}
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
        <Form.Item
          name={"job_app_id"}
          initialValue={job_app_id}
          style={{ display: "none" }}
          rules={validationRules.job_app_id}
        />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={["username"]}
              label="اسم المستخدم"
              //  validateStatus="error"
              //</Col> help="قم بإدخال اسم مستخدم غير موجود مسبقاَ في النظام"
              rules={validationRules.username}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["password"]}
              rules={validationRules.password}
              label="كلمة السر"
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>
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
        <Row gutter={16}>
          <Col span={8}>
            {/* TODO sagas from hadi */}
            <Form.Item rules={validationRules.schedule_id} label="جدول الدوام">
              <Select />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="تاريخ بدأ العمل">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
export default CreateProfileDrawer;
