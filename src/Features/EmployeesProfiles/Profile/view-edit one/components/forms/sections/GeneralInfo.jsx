import React, { useState } from "react";
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
  Upload,
  Image,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons/lib/icons";
import {
  addressRules,
  dependentsRules,
  passportRules,
  personalCardRules,
  personalDataRules,
} from "../../../../../validationRules";
import moment from "moment";
import CustomCard from "../../CustomCard";
import useForceUpdate from "../../../../../Hooks/useForceUpdate";
import "../../../style.css";
import { getFile } from "../../../../../utils/getFile";

const GeneralInfo = (props) => {
  const forceUpdate = useForceUpdate();
  const [fileList, setFileList] = useState([]);

  return (
    <div className={`${props.show ? "" : "hidden"}`} >
      {!props.editMode && !props.hidePersonalImg && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: "3%",
          }}
        >
          <Image
          
            src={props.form.getFieldValue(["personal_data", "personal_photo"])}
            fallback="data:image/png;base64,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"
          />
        </div>
      )}
      {props.editMode && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="الصورة الشخصيَة"
              name={["personal_data", "personal_photo"]}
              rules={personalDataRules.personalPhoto}
              getValueFromEvent={getFile}
            >
              <Upload
                accept=".jpeg,.png,.jpg,.gif,.svg"
                listType="picture-circle"
                maxCount={1}
                customRequest={(file) => {
                  file.onSuccess(() => {});
                }}
                fileList={fileList}
                onChange={({ fileList: newFileList }) => {
                  setFileList(newFileList);
                }}
                beforeUpload={(file) => {
                  const allowedTypes = imageAllowedTypes.split(",");
                  const fileType = file.type;
                  const isAllowed = allowedTypes.some((type) =>
                    fileType.endsWith(type)
                  );
                  if (!isAllowed) {
                    message.open({
                      type: "error",
                      content: `يجب اختيار ملف من النوع ${allowedTypes.join(
                        ", "
                      )} فقط`,
                      style: {
                        marginTop: "20vh",
                      },
                    });
                  }
                  return isAllowed || Upload.LIST_IGNORE;
                }}
              >
                {fileList.length === 0 && (
                  <Button icon={<UploadOutlined />}>رفع صورة جديدة </Button>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      )}

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
      <Form.Item name="deleted_dependents" style={{ display: "none" }} />
      <Form.List name="dependents" initialValue={""}>
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
                    onDelete={() => {
                      const deleted_dependent = props.form.getFieldValue([
                        "dependents",
                        name,
                      ]);

                      if (deleted_dependent.dependent_id) {
                        var currentDeletedDependents =
                          props.form.getFieldValue("deleted_dependents");

                        if (currentDeletedDependents === undefined)
                          currentDeletedDependents = [];

                        const newDeletedDependents = [
                          ...currentDeletedDependents,
                          deleted_dependent.dependent_id,
                        ];

                        props.form.setFieldValue(
                          "deleted_dependents",
                          newDeletedDependents
                        );
                      }

                      remove(name);
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="الاسم"
                          name={[name, "name"]}
                          rules={dependentsRules.name}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="القرابة"
                          name={[name, "relationship"]}
                          rules={dependentsRules.relationship}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="العمر"
                          name={[name, "age"]}
                          rules={dependentsRules.age}
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
                          rules={dependentsRules.address}
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
