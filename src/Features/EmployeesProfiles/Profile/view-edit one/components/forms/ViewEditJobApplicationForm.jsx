import { Form, Segmented } from "antd";
import GeneralInfo from "./sections/GeneralInfo";
import DrivingLicense from "./sections/DrivingLicense";
import Employment from "./sections/Employment";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";
import Additional from "./sections/Additional";
import { useState } from "react";

const ViewEditJobApplicationForm = ({
  form,
  editMode,
  initialValue,
  handleRemoveField,
  hidePersonalImg
}) => {
  const [segmentValue, setSegmentValue] = useState(1);
  return (
    <div className="info-container">
    
      <Segmented
        style={{ marginBottom: "2rem" }}
        value={segmentValue}
        options={[
          {
            label: "معلومات عامّة",
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
            label: "الشهادات",
            value: 6,
          },
          {
            label: "أخرى",
            value: 7,
          },
        ]}
        onChange={(value) => {
          setSegmentValue(value);
        }}
        block
      />
      <Form
        form={form}
        layout="horizontal"
        disabled={!editMode}
      >
        <GeneralInfo
          show={segmentValue === 1}
          editMode={editMode}
          form={form}
          hidePersonalImg={hidePersonalImg}
        />
        <DrivingLicense
          show={segmentValue === 2}
          editMode={editMode}
          form={form}
          handleRemoveField={handleRemoveField}
        />
        <Employment show={segmentValue === 3} editMode={editMode} form={form} />
        <Skills show={segmentValue === 4} editMode={editMode} form={form} />
        <Education show={segmentValue === 5} editMode={editMode} form={form} />
        <Certificates
          show={segmentValue === 6}
          editMode={editMode}
          form={form}
        />
        <Additional show={segmentValue === 7} editMode={editMode} form={form} />
      </Form>
    </div>
  );
};
export default ViewEditJobApplicationForm;
