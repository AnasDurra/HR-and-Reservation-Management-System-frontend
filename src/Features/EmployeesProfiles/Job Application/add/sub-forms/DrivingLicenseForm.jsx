import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Row,
  Col,
  Card,
  Divider,
  FloatButton,
  Tooltip,
} from "antd";
import {
  FrownOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons/lib/icons";
import { drivingLicenseRules } from "../../validationRules";
import moment from "moment";

const DrivingLicenseForm = (props) => {
  const [errorFields, setErrorFields] = useState([]);

  const validateForm = () => {
    if (props.validateState !== undefined) {
      props.form
        .validateFields()
        .then((_) => {
          props.setValidateState(true);
        })
        .catch((values) => {
          props.setValidateState(false);
          const errorFieldNames = values.errorFields.map((error) => error.name);
          setErrorFields(errorFieldNames);
        });
    }
  };

  const debouncedValidateForm = debounce(validateForm, 1000);

  useEffect(() => {
    if (props.validateState === false && props.isDriverLicense) {
      props.form
        .validateFields()
        .then((_) => {
          props.setValidateState(true);
        })
        .catch((values) => {
          props.setValidateState(false);
          const errorFieldNames = values.errorFields.map(
            (errorField) => errorField.name
          );
          setErrorFields(errorFieldNames);
        });
    }
  }, [props.validateState]);

  return (
    <div className={`form-container ${props.show ? "" : "hidden"}`}>
      {props.isDriverLicense && (
        <>
          <Form
            layout="horizontal"
            form={props.form}
            onChange={debouncedValidateForm}
          >
            <Divider> شهادة القيادة</Divider>
            <Row gutter={16}>
              <Col span={2}>
                <MinusCircleOutlined
                  onClick={() => {
                    props.setIsDriverLicense(false);
                    validateForm();
                  }}
                />
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
                  <DatePicker.RangePicker onChange={debouncedValidateForm} />
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

          <Button
            type="primary"
            onClick={() => {
              props.onNext();
            }}
          >
            التالي
          </Button>
        </>
      )}

      {!props.isDriverLicense && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Card hoverable={true}>
            <h2>هل تملك شهادة قيادة ؟</h2>
            <Row gutter={8}>
              <Col span={8}>
                <Button
                  onClick={() => {
                    props.setIsDriverLicense(false);
                    props.onNext();
                  }}
                  style={{
                    background: `${
                      props.isDriverLicense === false ? "#52c41a" : undefined
                    }`,
                  }}
                >
                  لا
                </Button>
              </Col>
              <Col offset={8} span={8}>
                <Button
                  type="primary"
                  onClick={() => {
                    props.setIsDriverLicense(true);
                  }}
                >
                  نعم
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      )}

      {props.validateState === false && props.isDriverLicense && (
        <FloatButton
          badge={{ dot: errorFields.length }}
          onClick={() => {
            props.form.getFieldInstance(errorFields[0]).focus();
          }}
          icon={<FrownOutlined style={{ color: "red" }} />}
        />
      )}
      {props.isDriverLicense === undefined &&
        props.validateState !== undefined && (
          <FloatButton
            badge={{ dot: true }}
            icon={<FrownOutlined style={{ color: "red" }} />}
            tooltip={<div>يرجى الاجابة على السؤال !</div>}
          />
        )}
    </div>
  );
};

export default DrivingLicenseForm;
