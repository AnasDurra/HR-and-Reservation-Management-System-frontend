import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Empty,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";
import { drivingLicenseRules } from "../../validationRules";
import useForceUpdate from "../../Hooks/useForceUpdate";
import "../style.css";

const DrivingLicense = (props) => {
  const forceUpdate = useForceUpdate();
  return (
    <div className={` ${props.show ? "" : "hidden"}`}>
      {props.form.getFieldValue("driving_license") ? (
        <>
          <Form layout="horizontal" form={props.form}>
            <Row gutter={16}>
              <Col span={2}>
                <Popconfirm
                  title={`حذف الشهادة`}
                  description="هل أنت متأكد من رغبتك بحذف الشهادة ؟"
                  onConfirm={() => {
                    props.handleRemoveField("driving_license");
                    forceUpdate();
                  }}
                  okText="نعم"
                  cancelText="لا"
                  placement="leftTop"
                >
                  <DeleteOutlined className="delete-icon" />
                </Popconfirm>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="نوع الشهادة"
                  name={["driving_license", "category"]}
                  rules={drivingLicenseRules.category}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="رقم الشهادة"
                  name={["driving_license", "number"]}
                  rules={drivingLicenseRules.number}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="تاريخ الشهادة"
                  name={["driving_license", "date"]}
                  rules={[{ required: true }]}
                >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="فصيلة الدم"
                  name={["driving_license", "blood_group"]}
                  rules={drivingLicenseRules.bloodGroup}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="مكان الإصدار"
                  name={["driving_license", "place_of_issue"]}
                  rules={drivingLicenseRules.placeOfIssue}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={"لا يوجد شهادة قيادة مضافة"}
        >
          {props.editMode && (
            <Button
              type="primary"
              onClick={() => {
                props.form.setFieldValue("driving_license", {});
                forceUpdate();
              }}
            >
              إضافة شهادة
            </Button>
          )}
        </Empty>
      )}
    </div>
  );
};

export default DrivingLicense;
