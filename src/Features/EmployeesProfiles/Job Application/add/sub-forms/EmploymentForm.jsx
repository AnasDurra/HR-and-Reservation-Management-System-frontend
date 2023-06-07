import React, { useState, useEffect } from "react";
import { debounce, values } from "lodash";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Card,
  Divider,
  FloatButton,
} from "antd";
import {
  FrownOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons/lib/icons";
import TextArea from "antd/es/input/TextArea";
import { previousEmploymentRecordRules } from "../../../validationRules";

const EmploymentForm = (props) => {
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
    if (props.validateState === false && props.isPrevEmployee) {
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
      {props.isPrevEmployee && (
        <>
          <Form
            form={props.form}
            layout="horizontal"
            onChange={debouncedValidateForm}
          >
            <Form.List name="previous_employment_record" initialValue={""}>
              {(fields, { add, remove }) => {
                if (fields.length == 0) {
                  add();
                }
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key}>
                        <Divider className="divider">
                          {" "}
                          {`العمل رقم ${name + 1}`}
                        </Divider>
                        <Row gutter={16}>
                          <Col span={2}>
                            <MinusCircleOutlined
                              onClick={() => {
                                if (fields.length === 1) {
                                  props.setIsPrevEmployee(false);
                                  debouncedValidateForm();
                                }
                                remove(name);
                              }}
                            />
                          </Col>
                          <Col span={16} offset={0}>
                            <Form.Item
                              {...restField}
                              label="اسم الشركة / صاحب العمل"
                              name={[name, "employer_name"]}
                              rules={previousEmploymentRecordRules.employerName}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="الهاتف"
                              name={[name, "telephone"]}
                              rules={previousEmploymentRecordRules.telephone}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="فترة العمل"
                              name={[name, "date"]}
                              rules={[{ required: true }]}
                            >
                              <DatePicker.RangePicker
                                onChange={debouncedValidateForm}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="مسمَى الوظيفة"
                              name={[name, "job_title"]}
                              rules={previousEmploymentRecordRules.jobTitle}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="تفاصيل عن واجباتك"
                              name={[name, "job_description"]}
                              rules={
                                previousEmploymentRecordRules.jobDescription
                              }
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="الراتب"
                              name={[name, "salary"]}
                              rules={previousEmploymentRecordRules.salary}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="البدلات"
                              name={[name, "allowance"]}
                              rules={previousEmploymentRecordRules.allowance}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="العنوان"
                              name={[name, "address"]}
                              rules={previousEmploymentRecordRules.address}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              label="سبب ترك العمل"
                              name={[name, "quit_reason"]}
                              rules={previousEmploymentRecordRules.quitReason}
                            >
                              <TextArea />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <Form.Item label="إضافة أعمال أخرى">
                      <Row>
                        <Col>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            اضافة
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
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

      {!props.isPrevEmployee && (
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
            <h2>هل تملك أعمال سابقة تود إضافتها ؟</h2>
            <Row gutter={8}>
              <Col span={8}>
                <Button
                  onClick={() => {
                    props.setIsPrevEmployee(false);
                    props.onNext();
                  }}
                  style={{
                    background: `${
                      props.isPrevEmployee === false ? "#52c41a" : undefined
                    }`,
                  }}
                >
                  لا
                </Button>
              </Col>
              <Col offset={8} span={8}>
                <Button
                  type="primary"
                  onClick={() => props.setIsPrevEmployee(true)}
                >
                  نعم
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      )}

      {props.validateState === false && props.isPrevEmployee && (
        <FloatButton
          badge={{ dot: errorFields.length }}
          onClick={() => {
            props.form.getFieldInstance(errorFields[0]).focus();
          }}
          icon={<FrownOutlined style={{ color: "red" }} />}
        />
      )}
      {props.isPrevEmployee === undefined &&
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

export default EmploymentForm;
