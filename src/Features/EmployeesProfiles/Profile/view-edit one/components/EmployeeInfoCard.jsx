import { Badge, Descriptions, List, Tag } from "antd";

const colorMapping = {
  1: "#008000",
  2: "#FFA500",
  3: "#FF0000",
  4: "#808080",
};

const statusMapping = {
  1: "يعمل",
  2: "‘إجازة",
  3: "استقالة",
  4: "إيقاف مؤقت",
};

function EmployeeInfoCard({
  employmentStatusId,
  scheduleName,
  departmentName,
  address,
  email,
  joinDate,
  jobTitleName
}) {
  return (
    <Descriptions
      layout="vertical"
      bordered
      size="small"
      style={{ width: "100%" }}
      labelStyle={{ color: "#1d39c4" }}
    >
     <Descriptions.Item
        label="المسمَى الوظيفي"
        span={3}
        style={{ textAlign: "center" }}
      >
        {jobTitleName}
      </Descriptions.Item>

      <Descriptions.Item
        label="حالة الموظَف"
        span={2}
        style={{ textAlign: "center" }}
      >
        <Tag color={colorMapping[employmentStatusId]}>
          {statusMapping[employmentStatusId]}
        </Tag>
      </Descriptions.Item>

      <Descriptions.Item
        label="جدول الدوام"
        span={2}
        style={{ textAlign: "center" }}
      >
        {scheduleName}
      </Descriptions.Item>

      <Descriptions.Item label="القسم" span={2} style={{ textAlign: "center" }}>
        {departmentName}
      </Descriptions.Item>

      <Descriptions.Item label="السكن" span={2} style={{ textAlign: "center" }}>
        {address}
      </Descriptions.Item>

      <Descriptions.Item
        label="البريد الإلكتروني"
        span={2}
        style={{ textAlign: "center" }}
      >
        {email}
      </Descriptions.Item>

      <Descriptions.Item
        label="تاريخ الانضمام"
        span={2}
        style={{ textAlign: "center" }}
      >
        {joinDate}
      </Descriptions.Item>
    </Descriptions>
  );
}
export default EmployeeInfoCard;
