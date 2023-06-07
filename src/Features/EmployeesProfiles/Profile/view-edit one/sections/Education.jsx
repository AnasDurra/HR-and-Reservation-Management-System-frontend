import React from "react";
import {
  Input,
  DatePicker,
  Button,
  Form,
  Divider,
  Row,
  Col,
  Empty,
} from "antd";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { educationRules, trainingCoursesRules } from "../../../validationRules";
import CustomCard from "../components/CustomCard";
import "../style.css";

const Education = (props) => {
  return (
    <div className={`${props.show ? "" : "hidden"}`}>
      <Form.Item
        name={["education", 0, "education_level_id"]}
        initialValue={1}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Divider>
        {" "}
        <span className="divider-text">المرحلة الابتدائية</span>
      </Divider>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item
            label="اسم المدرسة"
            name={["education", 0, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="المدينة"
            name={["education", 0, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 0, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={["education", 1, "education_level_id"]}
        initialValue={2}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Divider>
        {" "}
        <span className="divider-text">المرحلة الإعدادية</span>
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم المدرسة"
            name={["education", 1, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="المدينة"
            name={["education", 1, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 1, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="الدرجة (الصف التاسع)"
            name={["education", 1, "grade"]}
            rules={educationRules.grade}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={["education", 2, "education_level_id"]}
        initialValue={3}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>

      <Divider>
        {" "}
        <span className="divider-text">المرحلة الثانويَة</span>
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم المدرسة"
            name={["education", 2, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="المدينة"
            name={["education", 2, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 2, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="التخصَص"
            name={["education", 2, "specialize"]}
            rules={educationRules.specialize}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="الدرجة (البكالوريا)"
            name={["education", 2, "grade"]}
            rules={educationRules.grade}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}></Row>

      <Form.Item
        name={["education", 3, "education_level_id"]}
        initialValue={4}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Divider>
        {" "}
        <span className="divider-text">دبلوم بعد الثانويَة</span>
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم المدرسة"
            name={["education", 3, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="المدينة"
            name={["education", 3, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 3, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="التخصَص"
            name={["education", 3, "specialize"]}
            rules={educationRules.specialize}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="الدرجة"
            name={["education", 3, "grade"]}
            rules={educationRules.grade}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={["education", 4, "education_level_id"]}
        initialValue={5}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>

      <Divider>
        {" "}
        <span className="divider-text">المرحلة الجامعيَة</span>
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم الجامعة"
            name={["education", 4, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="المدينة"
            name={["education", 4, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 4, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="التخصَص"
            name={["education", 4, "specialize"]}
            rules={educationRules.specialize}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="الدرجة"
            name={["education", 4, "grade"]}
            rules={educationRules.grade}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={["education", 5, "education_level_id"]}
        initialValue={6}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Divider>
        {" "}
        <span className="divider-text">الدراسات العليا</span>
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="اسم الجامعة"
            name={["education", 5, "univ_name"]}
            rules={educationRules.univName}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="المدينة"
            name={["education", 5, "city"]}
            rules={educationRules.city}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label="مدّة الدراسة"
            name={["education", 5, "date"]}
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="التخصَص"
            name={["education", 5, "specialize"]}
            rules={educationRules.specialize}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="الدرجة"
            name={["education", 5, "grade"]}
            rules={educationRules.grade}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider>
        {" "}
        <span className="divider-text">الدورات التدريبية</span>
      </Divider>

      <Form.Item name="deleted_training_courses" style={{ display: "none" }} />
      <Form.List name="training_courses" initialValue={""}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={"لا يوجد سجل دورات تدريبية سابقة"}
                >
                  {props.editMode && (
                    <Button type="primary" onClick={add}>
                      اضافة دورة
                    </Button>
                  )}
                </Empty>
              )}

              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ margin: "1rem 0" }}>
                  <>
                    <CustomCard
                      editMode={props.editMode}
                      title={`كورس رقم ${name + 1}`}
                      deleteTitle={`حذف كورس رقم ${name + 1}`}
                      deleteDescription={"هل انت متأكد من رغبتك بحذف الكورس ؟"}
                      onDelete={() => {
                        const deletedTrainingCourse = props.form.getFieldValue([
                          "training_courses",
                          name,
                        ]);

                        if (deletedTrainingCourse.training_course_id) {
                          var currentDeletedTrainingCourses =
                            props.form.getFieldValue(
                              "deleted_training_courses"
                            );

                          if (currentDeletedTrainingCourses === undefined)
                            currentDeletedTrainingCourses = [];

                          const newDeletedDependents = [
                            ...currentDeletedTrainingCourses,
                            deletedTrainingCourse.training_course_id,
                          ];

                          props.form.setFieldValue(
                            "deleted_training_courses",
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
                            label="اسم الكورس"
                            name={[name, "course_name"]}
                            rules={trainingCoursesRules.courseName}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            label="اسم المعهد"
                            name={[name, "institute_name"]}
                            rules={trainingCoursesRules.instituteName}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            label="التخصَص"
                            name={[name, "specialize"]}
                            rules={trainingCoursesRules.specialize}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={7} offset={4}>
                          <Form.Item
                            {...restField}
                            label="المدينة"
                            name={[name, "city"]}
                            rules={trainingCoursesRules.city}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            label="المدَة"
                            name={[name, "date"]}
                            rules={[{ required: true }]}
                          >
                            <DatePicker.RangePicker />
                          </Form.Item>
                        </Col>
                      </Row>
                    </CustomCard>
                  </>
                </div>
              ))}
              {props.editMode && fields.length > 0 && (
                <Row>
                  <Col>
                    <Form.Item label="إضافة كورس">
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

export default Education;
