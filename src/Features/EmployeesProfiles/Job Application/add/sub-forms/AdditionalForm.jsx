import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  Input,
  Radio,
  Button,
  Form,
  Divider,
  Row,
  Col,
  FloatButton,
  Select,
} from "antd";
import {
  FrownOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons/lib/icons";
import { convictionsRules, referencesRules } from "../../../validationRules";

const { TextArea } = Input;

const AdditionalForm = (props) => {
  const [errorFields, setErrorFields] = useState([]);

  const validateForm = () => {
    if (props.validateState !== undefined) {
      props.form
        .validateFields()
        .then((values) => {
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
    if (props.validateState === false) {
      props.form
        .validateFields()
        .then((values) => {
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
  }, [props.validateState, props.numDependents]);

  return (
    <div className={`form-container ${props.show ? "" : "hidden"}`}>
      <Form
        form={props.form}
        layout="horizontal"
        onChange={debouncedValidateForm}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="هل صدرت بحقك أحكام قضائية ؟"
              name="isConvicted"
              rules={[{ required: true }]}
            >
              <Radio.Group
                value={props.isConvicted}
                onChange={(e) => {
                  props.setIsConvicted(e.target.value);
                }}
              >
                <Radio value={true}> نعم</Radio>
                <Radio value={false}> لا</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {props.isConvicted && (
          <Form.List name="convictions" initialValue={""}>
            {(fields, { add, remove }) => {
              if (fields.length == 0) {
                add();
              }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider> المحاكمة {name + 1} </Divider>
                      <Row gutter={1}>
                        <Col span={2}>
                          {name >= 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            {...restField}
                            name={[name, "description"]}
                            rules={convictionsRules.description}
                          >
                            <TextArea placeholder="التفاصيل" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Form.Item>
                    <Row>
                      <Col>
                        <Form.Item label="إضافة محاكمة">
                          <Button
                            type="primary"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            إضافة
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="هل تملك أقارب في المركز ؟"
              name="isRelativeEmployeed"
              rules={[{ required: true }]}
            >
              <Radio.Group
                value={props.isRelativeEmployee}
                onChange={(e) => {
                  props.setIsRelativeEmployee(e.target.value);
                }}
              >
                <Radio value={true}> نعم</Radio>
                <Radio value={false}> لا</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {props.isRelativeEmployee && (
          <Form.List name="relatives" initialValue={""}>
            {(fields, { add, remove }) => {
              if (fields.length == 0) {
                add();
              }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider> الموظف {name + 1} </Divider>
                      <Row gutter={1}>
                        <Col span={2}>
                          {name >= 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            {...restField}
                            name={[name, "emp_id"]}
                            rules={[]}
                          >
                            {/* TODO options from DB*/}
                            <Select
                              placeholder="انقر لاختيار قريبك"
                              options={[]}
                            ></Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Form.Item>
                    <Row>
                      <Col>
                        <Form.Item label="إضافة موظف">
                          <Button
                            type="primary"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            إضافة
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="هل تريد أضافة أشخاص مرجعيين ؟"
              name="isReference"
              rules={[{ required: true }]}
            >
              <Radio.Group
                value={props.isReference}
                onChange={(e) => {
                  props.setIsReference(e.target.value);
                  
                }}
              >
                <Radio value={true}> نعم</Radio>
                <Radio value={false}> لا</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {props.isReference && (
          <Form.List name="references" initialValue={""}>
            {(fields, { add, remove }) => {
              if (fields.length == 0) {
                add();
              }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider> الشخص {name + 1} </Divider>
                      <Row gutter={16}>
                        <Col span={2}>
                          {name >= 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={referencesRules.name}
                            label={"الاسم"}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            name={[name, "job"]}
                            rules={referencesRules.job}
                            label={"الوظيفة"}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            name={[name, "company"]}
                            rules={referencesRules.company}
                            label={"الشركة"}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={7} offset={2}>
                          <Form.Item
                            {...restField}
                            name={[name, "telephone"]}
                            rules={referencesRules.telephone}
                            label={"الهاتف"}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            name={[name, "address"]}
                            rules={referencesRules.address}
                            label={"العنوان"}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Row>
                    <Col>
                      <Form.Item label="إضافة شخص">
                        <Button
                          type="primary"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          إضافة
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              );
            }}
          </Form.List>
        )}
        <Row>
          <Col span={16}>
            <Form.Item
              name={"howDidYouKnowAboutTheJob"}
              rules={[{ required: false, message: "Missing first name" }]}
              label={"كيف سمعت عن فرصة العمل ؟"}
            >
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              name={"doYouHaveAnyAdditionalInfo"}
              rules={[{ required: false, message: "Missing first name" }]}
              label={"هل تود اضافة معلومات أخرى ؟"}
            >
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name={["job_application", "job_vacancy_id"]}
          initialValue={1}
          noStyle
        >
          <Input type="hidden" />
        </Form.Item>
      </Form>
      {props.validateState === false && (
        <FloatButton
          badge={{ count: errorFields.length }}
          icon={<FrownOutlined style={{ color: "red" }} />}
          onClick={() => {
            props.form.getFieldInstance(errorFields[0]).focus();
          }}
        />
      )}
    </div>
  );
};

export default AdditionalForm;
