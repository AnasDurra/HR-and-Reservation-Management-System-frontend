import { Button, Table, Tag } from "antd";
import Spinner from "../../../../../Components/Spinner/Spinner";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobApplications } from "../../../../../redux/Features/Employee Profile/Job application/slice";
import "./ViewJobApplications.css";
const colorMapping = {
  1: "orange",
  2: "green",
  3: "red",
  4: "gray",
};

function ViewJobApplications(props) {
  const jobApplicationsState = useSelector((state) => state.jobApplications);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobApplications());
  }, []);

  const columns = [
    {
      title: "المعرف الشخصي",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "الاسم",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "الشاغر الوظيفي",
      dataIndex: "job_name",
      key: "job_name",
    },
    {
      title: "القسم",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "الحالة",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={colorMapping[status]}>{status}</Tag>
      ),
    },
    {
      title: "العمليات",
      key: "actions",
      render: (record) => {
        return (
          <div id="actions">
            <Button
              type="link"
              onClick={() => {
                console.log(record);
              }}
            >
              استعراض
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];

  return (
    <Spinner loading={jobApplicationsState.loading}>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={jobApplicationsState.jobApplications}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 8 }}
        />
        <Button
          className="jobApplicationsButton"
          onClick={() => {
            navigate("add");
          }}
        >
          إضافة طلب توظيف
        </Button>
      </div>
    </Spinner>
  );
}

export default ViewJobApplications;
