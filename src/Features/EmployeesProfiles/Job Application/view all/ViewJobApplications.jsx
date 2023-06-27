import { Button, Input, Popconfirm, Table, Tag } from "antd";
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
import { getDepartments } from "../../../../redux/departments/slice";
import { getJobVacancies } from "../../../../redux/jobVacancies/reducer";
import Search from "antd/es/input/Search";
const colorMapping = {
  1: "#FFA500",
  2: "#008000",
  3: "#FF0000",
  4: "#808080",
};
const statusMapping = {
  1: "بانتظار المراجعة",
  2: "مقبول",
  3: "مرفوض",
  4: "مؤرشف",
};

function ViewJobApplications(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const jobApplicationsSlice = useSelector(
    (state) => state.jobApplicationsSlice
  );
  const departments = useSelector(
    (state) => state.departmentsSlice.departments
  );
  const jobVacancies = useSelector(
    (state) => state.jobVacanciesReducer.jobVacancies
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    job_name: [],
    department_name: [],
    status: [],
    employee_name: [],
  });

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleDelete = () => {
    dispatch(destroyJobApplications(selectedRowKeys));
  };
  const handlePageChange = (page) => {
    dispatch(getJobApplications({ page: page }));
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log(filters);
    dispatch(
      getJobApplications({
        dep: filters.department_name,
        status: filters.status,
        vacancy: filters.job_name,
        page: pagination.current,
        name:
          filters.employee_name?.length > 0
            ? filters.employee_name[0]
            : undefined,
      })
    );
    setFilters(filters);
  };

  useEffect(() => {
    dispatch(getJobApplications());
    dispatch(getDepartments());
    dispatch(getJobVacancies());
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
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder="اسم الموظَف"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            onSearch={confirm}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      filteredValue: filters.employee_name,
    },
    {
      title: "الشاغر الوظيفي",
      dataIndex: "job_name",
      key: "job_name",
      filters: jobVacancies?.map((jv) => ({
        text: jv.name,
        value: jv.id,
      })),
      filteredValue: filters.job_name,
    },
    {
      title: "القسم",
      dataIndex: "department_name",
      key: "department_name",
      filters: departments?.map((dep) => ({
        text: dep.name,
        value: dep.dep_id,
      })),
      filteredValue: filters.department_name,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      filters: Object.entries(statusMapping).map(([value, text]) => ({
        text,
        value: parseInt(value),
      })),
      render: (_, { status }) => (
        <Tag color={colorMapping[status.app_status_id]}>{status.name}</Tag>
      ),
      filteredValue: filters.status,
    },
  ];

  return (
    <div className="table-container">
      <Spinner loading={jobApplicationsSlice.loading}>
        <Table
          onChange={onTableChange}
          dataSource={jobApplicationsSlice?.jobApplications}
          pagination={{
            current: jobApplicationsSlice.pagination?.meta?.current_page,
            pageSize: jobApplicationsSlice.pagination?.meta?.per_page,
            total: jobApplicationsSlice.pagination?.meta?.total,
            showQuickJumper: false,
            showSizeChanger: false,
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
