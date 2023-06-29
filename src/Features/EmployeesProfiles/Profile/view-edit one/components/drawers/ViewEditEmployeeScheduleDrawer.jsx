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
  Descriptions,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { validationRules } from "../../../../Job Application/createProfileValidationRules";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../../../../../redux/departments/slice";
import {
  updateEmployeeDepartment,
  updateEmployeeSchedule,
} from "../../../../../../redux/Features/Employee Profile/Employee/slice";
import { fireEvent } from "@testing-library/react";
import { getShifts } from "../../../../../../redux/shifts/reducer";

function ViewEditEmployeeScheduleDrawer({
  emp_id,
  employeeName,
  schedule,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();
  const shiftsSlice = useSelector((state) => state.shiftsReducer);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      dispatch(getShifts());
    }
  }, [isOpen]);

  useEffect(() => {
    updateSaveBtn();
  }, [selectedSchedule]);

  useEffect(() => {
    setSelectedSchedule(
      shiftsSlice.shifts.find(
        (shift) => shift.schedule_id == schedule?.schedule_id
      )
    );
  }, [shiftsSlice]);

  const editSchedule = () => {
    dispatch(
      updateEmployeeSchedule({
        emp_id,
        schedule_id: selectedSchedule?.schedule_id,
      })
    );
    onClose();
  };

  const updateSaveBtn = () =>
    setIsSaveBtnDisabled(
      selectedSchedule?.schedule_id == schedule?.schedule_id
    );

  const onSelect = (schedule_id) =>
    setSelectedSchedule(
      shiftsSlice.shifts.find((shift) => shift.schedule_id == schedule_id)
    );

  return (
    <Drawer
      title={` جدول دوام الموظَف ( ${employeeName} )`}
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
              onClick={editSchedule}
              disabled={isSaveBtnDisabled}
            >
              حفظ
            </Button>
          </Tooltip>
        </Space>
      }
      height={"60%"}
    >
      <Row>
        <Col span={6}>
          <Select
            options={shiftsSlice?.shifts?.map((shift) => ({
              value: shift.schedule_id,
              label: shift.name,
            }))}
            value={selectedSchedule?.schedule_id}
            loading={shiftsSlice?.loading}
            onChange={onSelect}
            style={{ width: "80%" }}
          />
        </Col>

        <Col span={14}>
          <Descriptions
            title="تفاصيل جدول الدوام"
            layout="horizontal"
            bordered
            style={{ textAlign: "center" }}
          >
            <Descriptions.Item label="المعرّف" span={3}>
              {selectedSchedule?.schedule_id}
            </Descriptions.Item>

            <Descriptions.Item label="الاسم" span={3}>
              {selectedSchedule?.name}
            </Descriptions.Item>

            <Descriptions.Item label="وقت الدخول" span={2}>
              {selectedSchedule?.time_in}
            </Descriptions.Item>

            <Descriptions.Item label="وقت الخروج" span={2}>
              {selectedSchedule?.time_out}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Drawer>
  );
}
export default ViewEditEmployeeScheduleDrawer;
