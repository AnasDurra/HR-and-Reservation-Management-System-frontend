import { useEffect } from 'react';
import { Button, Table } from 'antd';
import Spinner from '../../../../Components/Spinner/Spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  getEmployee,
  getEmployees,
  getIndexedEmployees,
} from '../../../../redux/Features/Employee Profile/Employee/slice';
import {
  DeleteOutlined,
  EyeFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './EmployessProfiles.css';

function ViewEmployeesProfiles(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeSlice = useSelector((state) => state.employeesSlice);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const columns = [
    {
      title: 'الاسم',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'القسم',
      dataIndex: 'department_name',
      key: 'department_name',
    },
    {
      title: 'المسمى الوظيفي',
      dataIndex: 'job_title_name',
      key: 'job_title_name',
    },
    {
      title: 'الدوام',
      dataIndex: ['schedule', 'name'],
      key: 'schedule_name',
    },
    {
      title: 'حالة الموظف',
      dataIndex: 'current_employment_status',
      key: 'current_employment_status',
    },
  ];

  const handlePageChange = (page) => {
    dispatch(getEmployees({ page: page }));
  };

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
            onChange: handlePageChange,
            showQuickJumper: false,
            showSizeChanger: false,
          }}
          onRow={(record, index) => ({
            onClick: () => navigate(`profile?id=${record.emp_id}`),
            className: 'table-row-hoverable',
          })}
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
