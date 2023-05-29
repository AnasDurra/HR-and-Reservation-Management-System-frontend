import React, { useState, useEffect } from "react";
import { debounce, values } from "lodash";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Divider,
  Empty,
} from "antd";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import TextArea from "antd/es/input/TextArea";
import { previousEmploymentRecordRules } from "../../../validationRules";
import CustomCard from "../components/CustomCard";
import "../style.css";

const Employment = (props) => {
  return (
    <div className={`${props.show ? "" : "hidden"}`}>
      <>
        <Divider className="divider">
          <span className="divider-text">الأعمال السابقة</span>
        </Divider>
        <Form.List name="previous_employment_record" initialValue={""}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.length === 0 && (
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={"لا يوجد سجل أعمال سابقة"}
                  >
                    {props.editMode && (
                      <Button type="primary" onClick={add}>
                        اضافة عمل
                      </Button>
                    )}
                  </Empty>
                )}
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <CustomCard
                      title={`العمل رقم ${name + 1}`}
                      deleteTitle={`حذف العمل رقم ${name + 1}`}
                      deleteDescription="هل أنت متأكد من رغبتك بحذف العمل ؟"
                      editMode={props.editMode}
                      onDelete={() => remove(name)}
                    >
                      <>
                        <Row gutter={16}>
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
                              name={[name, "phone"]}
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
                              <DatePicker.RangePicker />
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
                      </>
                    </CustomCard>
                  </div>
                ))}
                {props.editMode && fields.length > 0 && (
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
                )}
              </>
            );
          }}
        </Form.List>
      </>
    </div>
  );
};

export default Employment;
