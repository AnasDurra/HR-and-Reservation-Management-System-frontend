import { Button, Table, Tag } from "antd";
import Spinner from "../../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobApplications } from "../../../../redux/Features/Employee Profile/Job application/slice";
import "./ViewJobApplications.css";
const colorMapping = {
  1: "#FFA500",
  2: "#008000",
  3: "#FF0000",
  4: "#808080",
};

function ViewJobApplications(props) {
  const jobApplicationsSlice = useSelector(
    (state) => state.jobApplicationsSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(jobApplicationsSlice);
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
                navigate(`jobApplication?id=${record.id}`);
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
  const handlePageChange = (page) => {
    dispatch(getJobApplications(page));
  };

  return (
    <div className="table-container">
      <Spinner loading={jobApplicationsSlice.loading}>
        <Table
          dataSource={jobApplicationsSlice?.jobApplications?.data}
          pagination={{
            current: jobApplicationsSlice.jobApplications?.meta?.current_page,
            pageSize: jobApplicationsSlice.jobApplications?.meta?.per_page,
            total: jobApplicationsSlice.jobApplications?.meta?.total,
            onChange: handlePageChange,
            showQuickJumper: false,
            showSizeChanger: false,
            itemRender: (page, type, originalElement) => {
              /* if (type === "prev") {
        return <a>السابق</a>;
      }
      if (type === "next") {
        return <a>التالي</a>;
      } */
              return originalElement;
            },
          }}
          rowKey="id"
          size="small"
          columns={columns}
        />
      </Spinner>

      <Button
        className="jobApplicationsButton"
        onClick={() => {
          navigate("add");
        }}
      >
        إضافة طلب توظيف
      </Button>
    </div>
  );
}

export default ViewJobApplications;
