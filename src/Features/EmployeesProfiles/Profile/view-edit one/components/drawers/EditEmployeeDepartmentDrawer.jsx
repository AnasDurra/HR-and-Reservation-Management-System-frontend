import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Drawer,
  Tooltip,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { validationRules } from "../../../../Job Application/createProfileValidationRules";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../../../../../redux/departments/slice";
import { updateEmployeeDepartment } from "../../../../../../redux/Features/Employee Profile/Employee/slice";
import { fireEvent } from "@testing-library/react";

function EditEmployeeDepartmentDrawer({
  emp_id,
  employeeName,
  dep_id,
  isOpen,
  onClose,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const departmentsSlice = useSelector((state) => state.departmentsSlice);

  useEffect(() => {
    dispatch(getDepartments());
    form.setFieldsValue({
      dep_id,
      emp_id,
    });
    updateSaveBtn();
  }, [isOpen]);

  const editDepartment = () =>
    form
      .validateFields()
      .then((_) => {
        //TODO call create api
        console.log("his insdasda");
        dispatch(
          updateEmployeeDepartment({
            id: emp_id,
            dep_id: form.getFieldValue(["dep_id"]),
          })
        );
        if (departmentsSlice.error === null) onClose();
      })
      .catch((_) => {});

  const updateSaveBtn = () =>
    setIsSaveBtnDisabled(form.getFieldValue(["dep_id"]) == dep_id);

  return (
    <Drawer
      title={` قسم الموظَف ( ${employeeName} )`}
      placement="top"
      onClose={onClose}
      open={isOpen}
      footer={
        <Space>
          <Button onClick={onClose}>إغلاق</Button>
          <Tooltip
            title={"لا يوجد تغييرات لحفظها"}
            trigger={isSaveBtnDisabled ? "hover" : ""}
            popupVisible={isSaveBtnDisabled}
          >
            <Button
              type="primary"
              onClick={editDepartment}
              disabled={isSaveBtnDisabled}
            >
              حفظ
            </Button>
          </Tooltip>
        </Space>
      }
      height={"60%"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name={["emp_id"]} noStyle />
        <Form.Item name={["dep_id"]} label="القسم">
          <Select
            options={departmentsSlice?.departments?.map((dep) => ({
              value: dep.dep_id,
              label: dep.name,
            }))}
            loading={departmentsSlice?.loading}
            onChange={updateSaveBtn}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
export default EditEmployeeDepartmentDrawer;
