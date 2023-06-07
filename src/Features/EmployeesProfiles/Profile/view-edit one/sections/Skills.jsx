import React from "react";
import { Input, Button, Form, Divider, Row, Col, Select, Cascader } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons/lib/icons";
import { predefinedSkill } from "../../../constants";
import { computerSkillsRules, languagesRules } from "../../../validationRules";
import "../style.css";

const Skills = (props) => {
  return (
    <div className={`${props.show ? "" : "hidden"}`}>
      <Divider>
        {" "}
        <span className="divider-text"> مهارات الحاسوب</span>
      </Divider>
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
      <Divider>
        {" "}
        <span className="divider-text"> اللغات</span>
      </Divider>
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

      <Form.Item name="deleted_languages" style={{ display: "none" }} />
      <Form.List name="languages" initialValue={""}>
        {(fields, { add, remove }) => {
          if (fields.length === 0) {
            add();
          }
          const slicedFields = fields.slice(2);
          return (
            <>
              {slicedFields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Row gutter={8}>
                    <Col span={2}>
                      <MinusCircleOutlined
                        onClick={() => {
                          const deleted_language = props.form.getFieldValue([
                            "languages",
                            name,
                          ]);

                          if (deleted_language.language_id) {
                            var currentDeletedLanguages =
                              props.form.getFieldValue("deleted_languages");

                            if (currentDeletedLanguages === undefined)
                              currentDeletedLanguages = [];

                            const newDeletedLanguages = [
                              ...currentDeletedLanguages,
                              deleted_language.language_id,
                            ];

                            props.form.setFieldValue(
                              "deleted_languages",
                              newDeletedLanguages
                            );
                          }
                          remove(name);
                        }}
                      />
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        label="اللغة"
                        name={[name, "language_name"]}
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
                  {props.editMode && (
                    <Form.Item label={"َإضافة لغة أخرى"}>
                      <Button type="dashed" onClick={() => add()}>
                        اضافة
                      </Button>
                    </Form.Item>
                  )}
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
    </div>
  );
};

export default Skills;
