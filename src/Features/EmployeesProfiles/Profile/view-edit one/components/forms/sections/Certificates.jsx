import React from "react";
import {
  Input,
  Button,
  Form,
  Divider,
  Row,
  Col,
  Upload,
  message,
  Popconfirm,
  Empty,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons/lib/icons";
import {
  certificatesAllowedTypes,
  certificatesRules,
} from "../../../../../validationRules";
import { getFile } from "../../../../../utils/getFile";
import useForceUpdate from "../../../../../Hooks/useForceUpdate";
import { downloadFile } from "../../../utils/helpers";
import "../../../style.css";

const Certificates = (props) => {
  const forceUpdate = useForceUpdate();

  return (
    <div className={` ${props.show ? "" : "hidden"}`} >
      <Form.List name="certificates" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد شهادات مرفقة"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة شهادة
                    </Button>
                  )}
                </Empty>
              )}

              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Divider>
                    <span className="divider-text">
                      {` الشهادة رقم ${name + 1}`}
                    </span>
                  </Divider>
                  <Row gutter={16}>
                    <Col span={2}>
                      {props.editMode && (
                        <Popconfirm
                          title={`حذف الشهادة رقم ${name + 1}`}
                          description="هل أنت متأكد من رغبتك بحذف الشهادة ؟"
                          onConfirm={() => remove(name)}
                          okText="نعم"
                          cancelText="لا"
                          placement="leftTop"
                        >
                          <DeleteOutlined className="delete-icon" />
                        </Popconfirm>
                      )}
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        {...restField}
                        label="الاسم"
                        name={[name, "certificate_name"]}
                        rules={certificatesRules.certificateName}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        label="الملف"
                        name={[name, "file"]}
                        rules={[{ required: true }]}
                        getValueFromEvent={getFile}
                      >
                        {/*  TODO redvisit upload*/}
                        {props.form.getFieldValue(["certificates", name])
                          ?.file ? (
                          <Button
                            icon={<DownloadOutlined />}
                            onClick={() => {
                              const fileData = props.form.getFieldValue([
                                "certificates",
                                name,
                              ]).file;
                              let file;

                              if (Array.isArray(fileData)) {
                                file = fileData[0]?.originFileObj;
                              } else {
                                file = fileData.originFileObj;
                              }

                              if (file) {
                                downloadFile(file);
                              } else {
                                console.error("File not found");
                              }
                            }}
                          >
                            تحميل
                          </Button>
                        ) : (
                          <Upload
                            onChange={forceUpdate}
                            listType="text"
                            maxCount={1}
                            accept="file"
                            customRequest={(file) => {
                              file.onSuccess(() => {});
                            }}
                            beforeUpload={(file) => {
                              const allowedTypes =
                                certificatesAllowedTypes.split(",");
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
                            <Button icon={<UploadOutlined />}>رفع ملف</Button>
                          </Upload>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Form.Item label="إضافة شهادة">
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

export default Certificates;
