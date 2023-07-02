import { useEffect, useState } from 'react';
import { Button, Input, Table, Tag } from 'antd';
import Spinner from '../../../../Components/Spinner/Spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import { getEmployees } from '../../../../redux/Features/Employee Profile/Employee/slice';
import { useDispatch, useSelector } from 'react-redux';
import './EmployessProfiles.css';
import { getDepartments } from '../../../../redux/departments/slice';
import { getRoles } from '../../../../redux/roles/slice';

const colorMapping = {
  1: '#FF0000',
  2: '#008000',
  3: '#808080',
};
const statusMapping = {
  1: 'حرج',
  2: 'متوسَط',
  3: 'منخفض',
};

function ViewEmployeesProfiles(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    department: [],
    status: [],
    employee_name: [],
    title: [],
    schedule: [],
  });
  const employeeSlice = useSelector((state) => state.employeesSlice);
  const departments = useSelector(
    (state) => state.departmentsSlice.departments
  );
  const roles = useSelector((state) => state.rolesSlice.roles);
  const shifts = useSelector((state) => state.shiftsReducer.shifts);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getDepartments());
    dispatch(getRoles());
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    console.log(filters);
    dispatch(
      getEmployees({
        dep: filters.department,
        status: filters.status,
        title: filters.title,
        schedule: filters.schedule,
        page: pagination.current,
        name:
          filters.employee_name?.length > 0
            ? filters.employee_name[0]
            : undefined,
      })
    );
    setFilters(filters);
  };

  const columns = [
    {
      title: 'الاسم',
      dataIndex: 'full_name',
      key: 'employee_name',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder='اسم الموظَف'
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            onSearch={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      filteredValue: filters.employee_name,
    },
    {
      title: 'القسم',
      dataIndex: 'department',
      key: 'department',
      filters: departments?.map((dep) => ({
        text: dep.name,
        value: dep.dep_id,
      })),
      filteredValue: filters.department,
    },
    {
      title: 'المسمى الوظيفي',
      dataIndex: 'job_title_name',
      key: 'title',
      filters: roles?.map((role) => ({
        text: role.name,
        value: role.job_title_id,
      })),
      filteredValue: filters.title,
    },
    {
      title: 'الدوام',
      dataIndex: ['schedule', 'name'],
      key: 'schedule',
      filters: shifts?.map((shift) => ({
        text: shift.name,
        value: shift.schedule_id,
      })),
      filteredValue: filters.schedule,
    },
    {
      title: 'حالة الموظف',
      dataIndex: 'status',
      key: 'status',
      filters: Object.entries(statusMapping).map(([value, text]) => ({
        text,
        value: parseInt(value),
      })),
      render: (_, { status }) => (
        <Tag
          color={
            colorMapping[employeeSlice?.employees?.current_employment_status]
          }>
          {statusMapping[employeeSlice?.employees?.current_employment_status]}
        </Tag>
      ),
      filteredValue: filters.status,
    },
  ];

  return (
    <Spinner loading={employeeSlice?.loading}>
      <div>
        <Table
          columns={columns}
          dataSource={employeeSlice.employees}
          rowKey='id'
          pagination={{
            current: employeeSlice?.pagination?.meta?.current_page,
            pageSize: employeeSlice?.pagination?.meta?.per_page,
            total: employeeSlice?.pagination?.meta?.total,
            showQuickJumper: false,
            showSizeChanger: false,
          }}
          onRow={(record, index) => ({
            onClick: () => navigate(`profile?id=${record.emp_id}`),
            className: 'table-row-hoverable',
          })}
          onChange={onTableChange}
        />
        <Button
          className='employeesButton'
          onClick={() => {
            navigate('/jobApplications/add');
          }}>
          إضافة موظف
        </Button>
      </div>
    </Spinner>
  );
}

export default ViewEmployeesProfiles;
