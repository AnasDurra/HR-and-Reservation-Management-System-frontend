import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  Input,
  DatePicker,
  Radio,
  Button,
  Form,
  Divider,
  Space,
  Row,
  Col,
  FloatButton,
  Select,
  Cascader,
} from "antd";
import {
  FrownOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons/lib/icons";
import { predefinedSkill } from "../constants";
import { computerSkillsRules, languagesRules } from "../validationRules";

const SkillsForm = (props) => {
  const [errorFields, setErrorFields] = useState([]);

  const validateForm = () => {
    console.log(props.form.getFieldsValue());
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
  }, [props.validateState]);

  return (
    <div className={`form-container ${props.show ? "" : "hidden"}`}>
      <Form
        form={props.form}
        layout="horizontal"
        onChange={debouncedValidateForm}
      >
        <Divider className="divider"> مهارات الحاسوب</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 0, "skill_name"]}
              initialValue="word"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Word Level"
              name={["computer_skills", 0, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 1, "skill_name"]}
              initialValue="excel"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Excel level"
              name={["computer_skills", 1, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 2, "skill_name"]}
              initialValue="powerpoint"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Power point level"
              name={["computer_skills", 2, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 3, "skill_name"]}
              initialValue="access"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Access level"
              name={["computer_skills", 3, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 4, "skill_name"]}
              initialValue="outlook"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Outlook Level"
              name={["computer_skills", 4, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["computer_skills", 5, "skill_name"]}
              initialValue="typingSpeed"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Typing speed"
              name={["computer_skills", 5, "level"]}
              rules={computerSkillsRules.level}
            >
              <Select>
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}></Row>

        <Divider className="divider"> الّلغات </Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={["languages", 0, "language_name"]}
              initialValue="arabic"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="العربيَة"
              name={["languages", 0, "reading"]}
              rules={languagesRules.reading}
            >
              <Select placeholder="القراءة">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["languages", 0, "writing"]}
              rules={languagesRules.writing}
            >
              <Select placeholder="الكتابة">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["languages", 0, "speaking"]}
              rules={languagesRules.speaking}
            >
              <Select placeholder="التحدّث">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={["languages", 1, "language_name"]}
              initialValue="english"
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="ُEnglish"
              name={["languages", 1, "reading"]}
              rules={languagesRules.reading}
            >
              <Select placeholder="القراءة">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["languages", 1, "writing"]}
              rules={languagesRules.writing}
            >
              <Select placeholder="الكتابة">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["languages", 1, "speaking"]}
              rules={languagesRules.speaking}
            >
              <Select placeholder="التحدّث">
                <Select.Option value={3}>ممتاز</Select.Option>
                <Select.Option value={2}>جيد</Select.Option>
                <Select.Option value={1}>مقبول</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {props.isAdditionalLanguage && (
          <Form.List name="dependents" initialValue={""}>
            {(fields, { add, remove }) => {
              if (fields.length === 0) {
                add();
              }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Row gutter={8}>
                        <Col span={2}>
                          <MinusCircleOutlined
                            onClick={() => {
                              if (fields.length === 1) {
                                props.setIsAdditionalLanguage(false);
                              }
                              remove(name);
                            }}
                          />
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            label="اللغة"
                            name={[name, "name"]}
                            rules={languagesRules.languageName}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "reading"]}
                            rules={languagesRules.reading}
                          >
                            <Select placeholder="القراءة">
                              <Select.Option value={3}>ممتاز</Select.Option>
                              <Select.Option value={2}>جيد</Select.Option>
                              <Select.Option value={1}>مقبول</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "writing"]}
                            rules={languagesRules.writing}
                          >
                            <Select placeholder="الكتابة">
                              <Select.Option value={3}>ممتاز</Select.Option>
                              <Select.Option value={2}>جيد</Select.Option>
                              <Select.Option value={1}>مقبول</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "speaking"]}
                            rules={languagesRules.speaking}
                          >
                            <Select placeholder="التحدّث">
                              <Select.Option value={3}>ممتاز</Select.Option>
                              <Select.Option value={2}>جيد</Select.Option>
                              <Select.Option value={1}>مقبول</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label={"َإضافة لغة أخرى"}>
                        <Button type="dashed" onClick={() => add()}>
                          اضافة
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="مهارات اخرى" name="skills">
                        <Cascader
                          style={{ width: "100%" }}
                          options={predefinedSkill}
                          multiple
                          maxTagCount="responsive"
                          placeholder="انقر للاختيار"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              );
            }}
          </Form.List>
        )}

        {!props.isAdditionalLanguage && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={"َإضافة لغة أخرى"}>
                <Button
                  type="dashed"
                  onClick={() => props.setIsAdditionalLanguage(true)}
                >
                  اضافة
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="مهارات اخرى" name="skills">
                <Cascader
                  style={{ width: "100%" }}
                  options={predefinedSkill}
                  multiple
                  maxTagCount="responsive"
                  placeholder="انقر للاختيار"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row></Row>
      </Form>
      <Button
        type="primary"
        onClick={() => {
          props.onNext();
        }}
      >
        التالي
      </Button>
      {props.validateState === false && (
        <FloatButton
          badge={{ dot: errorFields.length }}
          onClick={() => {
            props.form.getFieldInstance(errorFields[0]).focus();
          }}
          icon={<FrownOutlined style={{ color: "red" }} />}
        />
      )}
    </div>
  );
};

export default SkillsForm;
