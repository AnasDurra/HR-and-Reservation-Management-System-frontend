import { Card, Form, Segmented } from "antd";
import { useEffect, useState } from "react";
import "./style.css";
import GeneralInfoForm from "../Job Application/add/sub-forms/GeneralInfoForm";
import GeneralInfo from "./sections/GeneralInfo";
const ViewEmployeeProfile = (props) => {
  const [form] = Form.useForm();
  const [segmentValue, setSegmentValue] = useState(1);
  return (
    <>
      <div className="container">
        <div className="info-container">
          <Segmented
          value={segmentValue}
            options={[
              {
                label: "المعلومات الشخصية",
                value: 1,
              },
              {
                label: "شهادة القيادة",
                value: 2,
              },
              {
                label: "السجل الوظيفي",
                value: 3,
              },
              {
                label: "المهارات",
                value: 4,
              },

              {
                label: "التعليم",
                value: 5,
              },
              {
                label: "أخرى",
                value: 6,
              },
            ]}
            block
            onChange={(value) => {
              setSegmentValue(value);
            }}
          />
          <Form form={form} layout="horizontal">
            <GeneralInfo
              show={segmentValue === 1}
              editMode
              form={form}
            />
            
          </Form>
        </div>
        <div className="left-float">
          <Card />
        </div>
      </div>
    </>
  );
};
export default ViewEmployeeProfile;
