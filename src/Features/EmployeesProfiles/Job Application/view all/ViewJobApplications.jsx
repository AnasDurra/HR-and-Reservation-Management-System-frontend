import { Button, Popconfirm, Table, Tag } from "antd";
import Spinner from "../../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  destroyJobApplications,
  getJobApplications,
} from "../../../../redux/Features/Employee Profile/Job application/slice";
import "./ViewJobApplications.css";
import CreateProfileDrawer from "../components/CreateProfileDrawer";
const colorMapping = {
  1: "#FFA500",
  2: "#008000",
  3: "#FF0000",
  4: "#808080",
};
const statusMapping = {
  1: "معلَق",
  2: "مقبول",
  3: "مرفوض",
  4: "مؤرشف",
};

function ViewJobApplications(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const jobApplicationsSlice = useSelector(
    (state) => state.jobApplicationsSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleDelete = () => {
    dispatch(destroyJobApplications(selectedRowKeys));
  };
  const handlePageChange = (page) => {
    dispatch(getJobApplications(page));
  };

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
        <Tag color={colorMapping[status]}>{statusMapping[status]}</Tag>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Spinner loading={jobApplicationsSlice.loading}>
        <Table
          dataSource={jobApplicationsSlice?.jobApplications}
          pagination={{
            current: jobApplicationsSlice.pagination?.meta?.current_page,
            pageSize: jobApplicationsSlice.pagination?.meta?.per_page,
            total: jobApplicationsSlice.pagination?.meta?.total,
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
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: handleRowSelection,
          }}
          onRow={(record, _) => {
            return {
              onClick: () => navigate(`jobApplication?id=${record.id}`),
            };
          }}
        />
        <div
          style={{
            display: selectedRowKeys.length === 0 ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Popconfirm
            title=" حذف طلبات التوظيف المختارة ؟"
            onConfirm={handleDelete}
          >
            <Button type="primary">حذف</Button>
          </Popconfirm>
        </div>
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
