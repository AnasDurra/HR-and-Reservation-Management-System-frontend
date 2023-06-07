import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Badge, Card, Space } from "antd";

const VacancyCard = ({
  department,
  vacancyName,
  vacancyDescription,
  vacancyCount,
  onDepartmentClick,
  onVacancyNameClick,
}) => {
  return (
    
      <Card
        style={{
          borderColor: "#0c3eed",
          width: "100%",
          backgroundColor: "#fafafa",
        }}
      >
        <h3>الشاغر الوظيفي</h3>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Badge.Ribbon text="اسم الشاغر" placement="start">
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
              hoverable
            >
              {vacancyName}
              <LeftOutlined style={{ margin: "0 0.2rem" }} />
            </Card>
          </Badge.Ribbon>
          <Badge.Ribbon text="الوصف" placement="start">
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
            >
              {vacancyDescription}
            </Card>
          </Badge.Ribbon>
          <Badge.Ribbon text="القسم" placement="start">
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
              hoverable
            >
              {department}
              <LeftOutlined style={{ margin: "0 0.2rem" }} />
            </Card>
          </Badge.Ribbon>

          <Badge.Ribbon text=" الشواغر المتبقَية" placement="start">
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
            >
              {vacancyCount}
            </Card>
          </Badge.Ribbon>
        </Space>
      </Card>
   
  );
};
export default VacancyCard;
