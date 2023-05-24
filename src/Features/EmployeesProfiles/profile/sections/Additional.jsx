import React from "react";
import { Input, Button, Form, Divider, Row, Col, Select, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import CustomCard from "../components/CustomCard";
import {
  convictionsRules,
  referencesRules,
} from "../../validationRules";
import "../style.css";

const Additional = (props) => {
  return (
    <div className={` ${props.show ? "" : "hidden"}`}>
      <Divider className="divider">
        {" "}
        <span className="divider-text"> المحاكمات</span>
      </Divider>
      <Form.List name="convictions" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد محاكمات سابقة"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة
                    </Button>
                  )}
                </Empty>
              )}
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <CustomCard
                    title={`المحاكمة رقم ${name + 1}`}
                    deleteTitle={`حذف المحاكمة رقم ${name + 1}`}
                    deleteDescription="هل أنت متأكد من رغبتك بحذف المحاكمة ؟"
                    editMode={props.editMode}
                    onDelete={() => remove(name)}
                  >
                    <Row gutter={1}>
                      <Col span={16}>
                        <Form.Item
                          {...restField}
                          name={[name, "description"]}
                          rules={convictionsRules.description}
                        >
                          <Input.TextArea placeholder="التفاصيل" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </CustomCard>
                </div>
              ))}
              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      إضافة
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          );
        }}
      </Form.List>

      <Divider className="divider">
        {" "}
        <span className="divider-text"> أقارب في المركز</span>
      </Divider>
      <Form.List name="relatives" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد أقارب في المركز"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة
                    </Button>
                  )}
                </Empty>
              )}

              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <CustomCard
                    title={name + 1}
                    deleteTitle={`حذف الموظف رقم ${name + 1}`}
                    deleteDescription="هل أنت متأكد من رغبتك بحذف الموظف من فائمة الأقارب ؟"
                    editMode={props.editMode}
                    onDelete={() => remove(name)}
                  >
                    <Row gutter={1}>
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
                  </CustomCard>
                </div>
              ))}

              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Form.Item label="إضافة موظف قريب">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        إضافة
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          );
        }}
      </Form.List>

      <Divider className="divider">
        <span className="divider-text">الأشخاص المرجعيين</span>
      </Divider>
      <Form.List name="references" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد أشخاص مرجعيين"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة
                    </Button>
                  )}
                </Empty>
              )}

              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <CustomCard
                    title={`المرجع رقم  ${name + 1}`}
                    deleteTitle={`حذف المرجع رقم ${name + 1}`}
                    deleteDescription="هل أنت متأكد من رغبتك بحذف المرجع ؟"
                    editMode={props.editMode}
                    onDelete={() => remove(name)}
                  >
                    <>
                      <Row gutter={16}>
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
                    </>
                  </CustomCard>
                </div>
              ))}
              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Form.Item label="إضافة مرجع">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        إضافة
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export default Additional;
