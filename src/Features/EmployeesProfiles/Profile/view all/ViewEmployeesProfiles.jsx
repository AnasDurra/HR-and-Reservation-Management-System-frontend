import { useEffect } from "react";
import { Button, Table } from "antd";
import Spinner from "../../../../Components/Spinner/Spinner";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EyeFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

function ViewEmployeesProfiles(props) {
  const navigate = useNavigate();
  useEffect(() => {
    // props.getJobVacancies();
  }, []);

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "القسم",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "المسمى الوظيفي",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "حالة الموظف",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "العمليات",
      key: "actions",
      render: (record) => {
        return (
          <div id="actions">
            <Button
              type="dashed"
              style={{ color: "#0c3eed" }}
              onClick={() => {
                navigate("profile");
              }}
            >
              استعراض
            </Button>
            <Button type="dashed" style={{ color: "#f5222d" }}>
              حذف
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];

  const data = [
    {
      id: 1,
      name: "هادي بركات",
      department: "قسم التدريب",
      job: "منسق قسم التدريب",
      status: "يعمل الان",
    },
  ];

  return (
    <Spinner loading={props.loading}>
      <div>
        <Table columns={columns} dataSource={data} rowKey="id" />
        <Button className="employeesButton" onClick={() => {}}>
          إضافة موظف
        </Button>
      </div>
    </Spinner>
  );
}

export default ViewEmployeesProfiles;
