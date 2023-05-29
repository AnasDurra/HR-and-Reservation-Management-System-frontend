import React from "react";
import {
  Input,
  DatePicker,
  Button,
  Form,
  Divider,
  Row,
  Col,
  Select,
  Empty,
  Popconfirm,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import {
  addressRules,
  dependantsRules,
  passportRules,
  personalCardRules,
  personalDataRules,
} from "../../../validationRules";
import moment from "moment";
import CustomCard from "../components/CustomCard";
import useForceUpdate from "../../../Hooks/useForceUpdate";
import "../style.css";

const GeneralInfo = (props) => {
  const forceUpdate = useForceUpdate();
  return (
    <div className={`${props.show ? "" : "hidden"}`}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="الاسم الأول"
            name={["personal_data", "first_name"]}
            rules={personalDataRules.firstName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="اسم العائلة"
            name={["personal_data", "last_name"]}
            rules={personalDataRules.lastName}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم الأب"
            name={["personal_data", "father_name"]}
            rules={personalDataRules.fatherName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="اسم الجَد"
            name={["personal_data", "grand_father_name"]}
            rules={personalDataRules.grandFatherName}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="البريد"
            name={["address", "postal_code"]}
            rules={addressRules.postalCode}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="مكان الولادة"
            name={["personal_data", "birth_place"]}
            rules={personalDataRules.birthPlace}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="رقم الهاتف النَقال"
            name={["address", "mobile_no"]}
            rules={addressRules.mobileNo}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="رقم الهاتف الأرضي"
            name={["address", "home_phone_no"]}
            rules={addressRules.homePhoneNo}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="البريد الالكتروني"
            name={["address", "email"]}
            rules={addressRules.email}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="رقم هاتف العمل"
            name={["address", "work_phone_no"]}
            rules={addressRules.workPhoneNo}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="تاريخ الولادة"
            name={["personal_data", "birth_date"]}
            rules={personalDataRules.birthDate}
          >
            <DatePicker
              disabledDate={(current) =>
                current.isAfter(moment().subtract(15, "year"))
              }
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="الحالة الاجتماعية"
            name={["personal_data", "marital_status"]}
            rules={personalDataRules.maritalStatus}
          >
            <Select>
              <Select.Option value={2}>أعذب</Select.Option>
              <Select.Option value={1}>متزوج</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider className="divider">
        <span className="divider-text">عنوان الإقامة الحالي</span>
      </Divider>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            label="المحافظة"
            name={["address", "state"]}
            rules={addressRules.state}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="المدينة"
            name={["address", "city"]}
            rules={addressRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="الشارع"
            name={["address", "street"]}
            rules={addressRules.street}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider className="divider">
        <span className="divider-text">البطاقة الشخصيّة</span>
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="رقم البطاقة الشخصَية"
            name={["personal_card", "card_number"]}
            rules={personalCardRules.cardNumber}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="مكان الإصدار"
            name={["personal_card", "card_place_of_issue"]}
            rules={personalCardRules.cardPlaceOfIssue}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="تاريخ الإصدار"
            name={["personal_card", "card_date_of_issue"]}
            rules={personalCardRules.cardDateOfIssue}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => current.isAfter(moment())}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider className="divider">
        {" "}
        <span className="divider-text"> الإعالة</span>
      </Divider>
      <Form.List name="dependants" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد أشخاص معالة"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة معال
                    </Button>
                  )}
                </Empty>
              )}

              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <CustomCard
                    title={`المعال رقم ${name + 1}`}
                    deleteTitle={`حذف المعال رقم ${name + 1}`}
                    deleteDescription="هل أنت متأكد من رغبتك بحذف المعال ؟"
                    editMode={props.editMode}
                    onDelete={() => remove(name)}
                  >
                    <Row gutter={16}>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="الاسم"
                          name={[name, "name"]}
                          rules={dependantsRules.name}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="القرابة"
                          name={[name, "relationship"]}
                          rules={dependantsRules.relationship}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="العمر"
                          name={[name, "age"]}
                          rules={dependantsRules.age}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={14} offset={2}>
                        <Form.Item
                          {...restField}
                          label="العنوان"
                          name={[name, "address"]}
                          rules={dependantsRules.address}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </CustomCard>
                </div>
              ))}
              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Form.Item label="إضافة معال">
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
      <>
        <Divider className="divider">
          <span className="divider-text"> حواز السفر</span>
        </Divider>
        {props.form.getFieldValue("passport") ? (
          <>
            <Row gutter={16}>
              {props.editMode && (
                <Col span={2}>
                  <Popconfirm
                    title={"حذف جواز السفر"}
                    description="هل أنت متأكد من رغبتك بحذف جواز السفر ؟"
                    onConfirm={() => {
                      props.form.setFieldValue("passport", undefined);
                      forceUpdate();
                    }}
                    okText="نعم"
                    cancelText="لا"
                    placement="leftTop"
                  >
                    <DeleteOutlined className="delete-icon" />
                  </Popconfirm>
                </Col>
              )}
              <Col span={10}>
                <Form.Item
                  label="رقم الجواز"
                  name={["passport", "passport_number"]}
                  rules={passportRules.passportNumber}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="مكان الإصدار"
                  name={["passport", "passport_place_of_issue"]}
                  rules={passportRules.passportPlaceOfIssue}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="تاريخ الإصدار"
                  name={["passport", "passport_date_of_issue"]}
                  rules={passportRules.passportDateOfIssue}
                >
                  <DatePicker
                    disabledDate={(current) => current.isAfter(moment())}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={"لا يوجد جواز سفر"}
          >
            {props.editMode && (
              <Button
                type="primary"
                onClick={() => {
                  props.form.setFieldValue("passport", {});
                  forceUpdate();
                }}
              >
                إضافة جواز سفر
              </Button>
            )}
          </Empty>
        )}
      </>
    </div>
  );
};

export default GeneralInfo;
