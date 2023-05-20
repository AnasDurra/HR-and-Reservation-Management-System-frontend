import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  Input,
  DatePicker,
  Radio,
  Button,
  Form,
  Divider,
  Row,
  Col,
  FloatButton,
  Upload,
  message,
} from "antd";
import {
  FrownOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons/lib/icons";
import {
  addressRules,
  dependantsRules,
  imageAllowedTypes,
  jobDataRules,
  passportRules,
  personalCardRules,
  personalDataRules,
} from "../../validationRules";
import { getFile } from "../../utils/helpers";
import moment from "moment";
import dayjs from "dayjs";
import "../style.css";

function GeneralInfoForm(props) {
  const [errorFields, setErrorFields] = useState([]);
  const [fileList, setFileList] = useState([]);

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
    if (props.validateState === false) {
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
      <Form
        form={props.form}
        layout="horizontal"
        onChange={debouncedValidateForm}
      >
        <Divider className="divider"> معلومات عامَة</Divider>
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
                  <Button icon={<UploadOutlined />}>رفع الصورة</Button>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
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
                onChange={debouncedValidateForm}
                format="YYYY-MM-DD"
                defaultValue={dayjs().subtract(18, "year")}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="متى يمكنك البدء بالعمل ؟"
              name={["job_data", "start_working_date"]}
              rules={jobDataRules.startWorkingDate}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={(current) => current.isBefore(moment())}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider className="divider"> عنوان الإقامة الحالي</Divider>
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
        <Divider className="divider">البطاقة الشخصيّة</Divider>
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
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="الحالة الاجتماعية"
              name={["personal_data", "marital_status"]}
              rules={personalDataRules.maritalStatus}
            >
              <Radio.Group>
                <Radio value={2}>أعذب</Radio>
                <Radio value={1}>متزوّج</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="هل أنت موظَف حالياَ"
              name={["job_data", "is_employed"]}
              rules={jobDataRules.isEmployed}
            >
              <Radio.Group>
                <Radio value={1}>نعم</Radio>
                <Radio value={0}>لا</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="هل تعيل أحد ؟" rules={[{ required: true }]}>
              <Radio.Group
                value={props.isDependent}
                onChange={(e) => {
                  props.setIsDependent(e.target.value);
                }}
              >
                <Radio value={true}> نعم</Radio>
                <Radio value={false}> لا</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {props.isDependent && (
          <Form.List name="dependants" initialValue={""}>
            {(fields, { add, remove }) => {
              if (fields.length === 0) {
                add();
              }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider className="divider">
                        {" "}
                        {`المعال رقم ${name + 1}`}
                      </Divider>
                      <Row gutter={16}>
                        <Col span={2}>
                          {name >= 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Col>
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
                    </div>
                  ))}
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
                </>
              );
            }}
          </Form.List>
        )}

        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="هل تملك جواز سفر ؟"
                rules={[{ required: true, message: "يجب ملئ الحقل بالأعلى " }]}
              >
                <Radio.Group
                  value={props.isPassport}
                  onChange={(e) => {
                    props.setIsPassport(e.target.value);
                  }}
                >
                  <Radio value={true}> نعم</Radio>
                  <Radio value={false}> لا</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {props.isPassport && (
            <>
              <Divider className="divider">جواز السفر</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="رقم الجواز"
                    name={["passport", "passport_number"]}
                    rules={passportRules.passportNumber}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
          )}
        </>
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
          badge={{ dot: errorFields }}
          icon={<FrownOutlined style={{ color: "red" }} />}
          onClick={() => {
            props.form.getFieldInstance(errorFields[0]).focus();
          }}
        />
      )}
    </div>
  );
}

export default GeneralInfoForm;
