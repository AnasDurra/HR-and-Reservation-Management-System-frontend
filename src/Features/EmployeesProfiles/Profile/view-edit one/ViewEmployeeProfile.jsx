import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmployee,
  getEmployeeLogs,
  updateEmployeeStatus,
} from '../../../../redux/Features/Employee Profile/Employee/slice';
import { useEffect, useState } from 'react';
import { Form, Image, Typography, List, Divider, Dropdown, Space, Button, Card, Row, Col, Avatar } from 'antd';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import ViewEditJobApplicationForm from './components/forms/ViewEditJobApplicationForm';
import EmployeeInfoCard from './components/EmployeeInfoCard';
import ViewEditEmployeeAccountDrawer from './components/drawers/ViewEditEmployeeAccountDrawer';
import EditEmployeeDepartmentDrawer from './components/drawers/EditEmployeeDepartmentDrawer';
import ViewEditEmployeeScheduleDrawer from './components/drawers/ViewEditEmployeeScheduleDrawer';
import EmployeeDepartmentsHistoryModal from './components/modals/EmployeeDepartmentsHistoryModal';
import EmployeeJobTitlesHistoryModal from './components/modals/EmployeeJobTitlesHistoryModal';
import EmployeeAbsencesModal from './components/modals/EmployeeAbsencesModal';
import './ViewEmployeeProfile.css';
import './style.css';
import ViewEditEmployeeRolesAndPermissionsDrawer from './components/drawers/ViewEditEmployeeRolesAndPermissionsDrawer';

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

const ViewEmployeeProfile = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [isDepartmentDrawerOpen, setIsDepartmentDrawerOpen] = useState(false);
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);

  const [isDepartmentsHistoryModalOpen, setIsDepartmentsHistoryModalOpen] = useState(false);
  const [isJobTitlesHistoryModalOpen, setIsJobTitlesHistoryModalOpen] = useState(false);
  const [isAbsencesModalOpen, setIsAbsencesModalOpen] = useState(false);

  const employee = useSelector((state) => state.employeesSlice.employee);
  const employeeLogs = useSelector((state) => state.employeesSlice.employeeLogs);

  useEffect(() => {
    dispatch(getEmployee(searchParam.get('id')));
    dispatch(getEmployeeLogs({ emp_id: searchParam.get('id') }));
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(employee?.job_application?.employee_data);
    /*  if (isEditMode) {
      toggleEditMode();
    } */
  }, [employee]);

  const openAccountDrawer = () => setIsAccountDrawerOpen(true);
  const closeAccountDrawer = () => setIsAccountDrawerOpen(false);
  const openRoleDrawer = () => setIsRoleDrawerOpen(true);
  const closeRoleDrawer = () => setIsRoleDrawerOpen(false);
  const openDepartmentDrawer = () => setIsDepartmentDrawerOpen(true);
  const closeDepartmentDrawer = () => setIsDepartmentDrawerOpen(false);
  const openScheduleDrawer = () => setIsScheduleDrawerOpen(true);
  const closeScheduleDrawer = () => setIsScheduleDrawerOpen(false);
  const openDepartmentsHistoryModal = () => setIsDepartmentsHistoryModalOpen(true);
  const closeDepartmentsHistoryModal = () => setIsDepartmentsHistoryModalOpen(false);
  const openJobTitlesHistoryModal = () => setIsJobTitlesHistoryModalOpen(true);
  const closeJobTitlesHistoryModal = () => setIsJobTitlesHistoryModalOpen(false);
  const openAbsencesModal = () => setIsAbsencesModalOpen(true);
  const closeAbsencesModal = () => setIsAbsencesModalOpen(false);

  const handleRemoveField = (fieldName) => {
    const fields = form.getFieldsValue();
    delete fields[fieldName];
    form.resetFields();
    form.setFieldsValue(fields);
  };

  const items = [
    {
      label: 'تعديل',
      key: '0',
      children: [
        {
          label: <div onClick={openAccountDrawer}>الحساب</div>,
          key: '0-0',
        },
        {
          label: <div onClick={openRoleDrawer}>المسمى الوظيفي & الصلاحيات</div>,
          key: '0-2',
        },
        {
          label: <div onClick={openDepartmentDrawer}>القسم</div>,
          key: '0-3',
        },
        {
          label: <div onClick={openScheduleDrawer}>جدول الدوام</div>,
          key: '0-4',
        },
        {
          label: <span> الوضع الوظيفي</span>,
          key: '0-5',
          children: [
            {
              key: '0-5-1',
              disabled: employee?.current_employment_status == 1,
              label: (
                <div
                  onClick={() =>
                    dispatch(
                      updateEmployeeStatus({
                        emp_id: employee?.emp_id,
                        emp_status_id: 1,
                      })
                    )
                  }
                >
                  {' '}
                  يعمل
                </div>
              ),
            },
            {
              key: '0-5-2',
              disabled: employee?.current_employment_status == 2,

              label: (
                <div
                  onClick={() =>
                    dispatch(
                      updateEmployeeStatus({
                        emp_id: employee?.emp_id,
                        emp_status_id: 2,
                      })
                    )
                  }
                >
                  {' '}
                  إجازة
                </div>
              ),
            },
            {
              key: '0-5-3',
              disabled: employee?.current_employment_status == 3,
              label: (
                <div
                  onClick={() =>
                    dispatch(
                      updateEmployeeStatus({
                        emp_id: employee?.emp_id,
                        emp_status_id: 3,
                      })
                    )
                  }
                >
                  استقالة
                </div>
              ),
            },
            {
              key: '0-5-4',
              disabled: employee?.current_employment_status == 4,
              label: (
                <div
                  onClick={() =>
                    dispatch(
                      updateEmployeeStatus({
                        emp_id: employee?.emp_id,
                        emp_status_id: 4,
                      })
                    )
                  }
                >
                  إيقاف مؤقت
                </div>
              ),
            },
          ],
        },
      ],
    },
    {
      label: <div onClick={() => {}}>حذف</div>,
      key: '1',
      danger: true,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100% ' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'start',
            width: '90%',
          }}
        >
          <Dropdown
            menu={{ items }}
            trigger={['click']}
          >
            <Space>
              <Button type='link'>
                <SettingOutlined style={{ fontSize: '150%' }} />
              </Button>
            </Space>
          </Dropdown>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '1px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                marginLeft: '1rem',
                textAlign: 'center',
              }}
            >
              <Image
                style={{
                  borderRadius: '50%',
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                }}
                preview={false}
                src=''
                fallback='data:image/png;base64,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'
              />

              <Typography.Title
                level={2}
                style={{ margin: '1rem', color: '#1d39c4' }}
              >
                {employee?.job_application?.employee_data?.personal_data?.full_name}
              </Typography.Title>
            </div>

            <div style={{ marginBottom: '0.5rem', width: '80%' }}>
              <EmployeeInfoCard
                address={`${employee?.job_application?.employee_data?.address?.city},${employee?.job_application?.employee_data?.address?.state},${employee?.job_application?.employee_data?.address?.street}`}
                email={employee?.email}
                departmentName={employee?.current_department?.name}
                employmentStatusId={employee?.current_employment_status?.emp_status_id}
                joinDate={employee?.start_working_date}
                scheduleName={employee?.schedule?.name}
                jobTitleName={employee?.current_job_title?.name}
              />
            </div>
          </div>
          <Divider style={{ backgroundColor: '#1d39c4' }} />
          <div style={{ width: '100%' }}>
            <ViewEditJobApplicationForm
              form={form}
              handleRemoveField={handleRemoveField}
              hidePersonalImg={true}
            />
          </div>
        </div>

        <div style={{ width: '40%', marginTop: '2rem', marginRight: '2rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography.Title
              level={4}
              style={{ margin: '20px', color: '#1d39c4' }}
            >
              سجل النشاط
            </Typography.Title>

            <div className='actions-list'>
              <List
                style={{ flexDirection: 'row-reverse' }}
                itemLayout='horizontal'
                size='small'
                dataSource={[...employeeLogs, ...employeeLogs]}
                renderItem={(item, index) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        title={item.action.name}
                        description={item.date}
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: `${colorMapping[item.action.severity]}`,
                            }}
                          >
                            {statusMapping[item.action.severity]}
                          </Avatar>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Space direction='vertical'>
                <Row gutter={4}>
                  <Col span={12}>
                    <Card
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={openDepartmentsHistoryModal}
                      hoverable
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <ArrowLeftOutlined style={{ marginLeft: '1rem' }} />
                        <span>سجل الأقسام</span>
                      </div>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={openJobTitlesHistoryModal}
                      hoverable
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <ArrowLeftOutlined style={{ marginLeft: '1rem' }} />
                        <span>سجل المسمّيات الوظيفية</span>
                      </div>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={4}>
                  <Col span={12}>
                    <Card
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={openAbsencesModal}
                      hoverable
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <ArrowLeftOutlined style={{ marginLeft: '1rem' }} />
                        <span>سجل الغياب</span>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </div>
          </div>
        </div>
      </div>

      <ViewEditEmployeeAccountDrawer
        employeeName={employee?.employee_data?.personal_data?.full_name}
        emp_id={employee?.emp_id}
        username={employee?.username}
        email={employee?.email}
        //  password={'duh'}
        isOpen={isAccountDrawerOpen}
        onClose={closeAccountDrawer}
      />

      <ViewEditEmployeeRolesAndPermissionsDrawer
        emp_id={employee?.emp_id}
        employeeName={employee?.job_application?.employee_data?.personal_data?.full_name}
        current_job_title_id={employee?.current_job_title?.job_title_id}
        permissions={employee?.permissions}
        onClose={closeRoleDrawer}
        isOpen={isRoleDrawerOpen}
      />

      <EditEmployeeDepartmentDrawer
        employeeName={employee?.job_application?.employee_data?.personal_data?.full_name}
        emp_id={employee?.emp_id}
        dep_id={employee?.current_department?.dep_id}
        isOpen={isDepartmentDrawerOpen}
        onClose={closeDepartmentDrawer}
      />

      <ViewEditEmployeeScheduleDrawer
        emp_id={employee?.emp_id}
        employeeName={employee?.job_application?.employee_data?.personal_data?.full_name}
        schedule={employee?.schedule}
        isOpen={isScheduleDrawerOpen}
        onClose={closeScheduleDrawer}
      />

      <EmployeeDepartmentsHistoryModal
        emp_id={employee?.emp_id}
        isOpen={isDepartmentsHistoryModalOpen}
        onClose={closeDepartmentsHistoryModal}
      />

      <EmployeeJobTitlesHistoryModal
        emp_id={employee?.emp_id}
        isOpen={isJobTitlesHistoryModalOpen}
        onClose={closeJobTitlesHistoryModal}
      />

      <EmployeeAbsencesModal
        emp_id={employee?.emp_id}
        isOpen={isAbsencesModalOpen}
        onClose={closeAbsencesModal}
      />
    </>
  );
};

export default ViewEmployeeProfile;
