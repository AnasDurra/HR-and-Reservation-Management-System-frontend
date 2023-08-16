import { ConfigProvider } from 'antd';
import './App.css';
import arEG from 'antd/lib/locale/ar_EG';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Components/Layout/Layout';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LogInPage from './Features/Login/Login';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AccessRoute from './Components/AccessRoute/AccessRoute';
import Permissions from './Components/AccessRoute/Permissions';
import ViewDepartments from './Features/EmployeesProfiles/Departments/ViewDepartments';
import JobApplicationMultiStepForm from './Features/EmployeesProfiles/Job Application/add/JobApplicationMultiStepForm';
import ViewJobVacancies from './Features/EmployeesProfiles/JobVacancies/ViewJobVacancies';
import ViewJobApplications from './Features/EmployeesProfiles/Job Application/view all/ViewJobApplications';
import ViewRoles from './Features/Roles/ViewRoles';
import ViewShifts from './Features/Attendance/Shifts/ViewShifts';
import ViewBiometricDevices from './Features/Attendance/BiometricDevices/ViewBiometricDevices';
import ViewTimeSheetLog from './Features/Attendance/TimeSheetLog/ViewTimeSheetLog';
import ViewEmployeesProfiles from './Features/EmployeesProfiles/Profile/view all/ViewEmployeesProfiles';
import ViewEmployeeProfile from './Features/EmployeesProfiles/Profile/view-edit one/ViewEmployeeProfile';
import ViewJobApplication from './Features/EmployeesProfiles/Job Application/view one/ViewJobApplication';
import Log from './Features/Log/Log';
import EmployeesVacations from './Features/Attendance/Vacations/EmployeesVacations';
import EmployeesAbsences from './Features/Attendance/Absences/EmployeesAbsences';
import ViewVacationRequests from './Features/Attendance/Vacations/ViewVacationRequests';
import ViewTimeShiftRequests from './Features/Attendance/TimeShift/ViewTimeShiftRequests';
import EmployeesReports from './Features/EmployeesReports/EmployeesReports';
import { useEffect } from 'react';
import { getEmployeePermissions } from './redux/user/reducer';
import getUser from './redux/utils/cookiesUtils';
import PERMISSIONS from './Components/AccessRoute/Permissions';
import Cookies from 'js-cookie';
import TimeSchedules from './Features/Appointments Management/Time Schedules/TimeSchedules';
import ConsultantCalendar from './Features/Appointments Management/Calendars/Consultant Appointments Calendar/ConsultantCalendar';
import AppointmentsCalendar from './Features/Appointments Management/Calendars/Global Appointments Calendar/AppointmentsCalendar';
import CancelledAppointments from './Features/Appointments Management/Cancelled Appointments/CancelledAppointments';
import ViewConsultants from "./Features/Consultants/ViewConsultants";
import MaintainConsultant from "./Features/Consultants/MaintainConsultant";
import ViewConsultant from "./Features/Consultants/ViewConsultant";
import ViewCustomers from "./Features/Customers/ViewCustomers";
import MaintainCustomer from "./Features/Customers/MaintainCustomer";
import ViewCustomer from "./Features/Customers/ViewCustomer";
import ViewEvents from "./Features/CenterEvents/ViewEvents";
import MaintainEvent from "./Features/CenterEvents/MaintainEvent";
import DetectCustomer from "./Features/Customers/DetectCustomer";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = getUser();
  const permissions = useSelector((state) => state.userReducer.permissions);

  useEffect(() => {
    if (user && user?.user_type === 1) {
      dispatch(getEmployeePermissions());
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (permissions.length > 0) {
      Cookies.set('perms', JSON.stringify(permissions));
    }
  }, [permissions]);

  return (
    <div>
      <ConfigProvider
        direction='rtl'
        locale={arEG}
        theme={{
          token: {
            fontFamily: 'cairo',
            colorPrimary: '#0c3ded',
          },
          components: {
            Button: {
              borderRadius: '12px',
            },
          },
        }}
      >
        <Layout>
          <Routes>
            {/*public Routes*/}
            <Route
              path='/'
              element={<div>Root</div>}
            />
            <Route element={<AccessRoute />}>
              <Route
                path='/login'
                element={<LogInPage />}
              />
            </Route>
            <Route
              path='/unauthorized'
              element={<Unauthorized />}
            />

            <Route element={<AccessRoute />}>
              <Route element={<AccessRoute allowedRoutes={[PERMISSIONS.MANAGE_DEPARTMENTS]} userType={1} />}>
                <Route path="/departments" element={<ViewDepartments />} />
              </Route>

              <Route element={<AccessRoute allowedRoutes={[PERMISSIONS.MANAGE_JOB_VACANCIES]} userType={1} />}>
                <Route path="/jobVacancies" element={<ViewJobVacancies />} />
              </Route>

              <Route path="employees">

                <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_EMPLOYEES]} userType={1} />}>
                  <Route index element={<ViewEmployeesProfiles />} />
                  <Route path="profile" element={<ViewEmployeeProfile />} />
                </Route>

                <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ATTENDANCE]} userType={1} />}>
                  <Route path="vacations">
                    <Route index element={<EmployeesVacations />} />
                    <Route path="requests" element={<ViewVacationRequests />} />
                  </Route>
                  <Route
                    path='timeShiftRequests'
                    element={<ViewTimeShiftRequests />}
                  />
                  <Route
                    path='absences'
                    element={<EmployeesAbsences />}
                  />
                </Route>

                <Route element={<AccessRoute allowedRoutes={[Permissions.EXPORT_REPORTS]} userType={1} />}>
                  <Route path="reports" element={<EmployeesReports />} />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_JOB_APPLICATIONS]} userType={1} />}>
                <Route path="jobApplications">
                  <Route index element={<ViewJobApplications />} />
                  <Route path="add" element={<JobApplicationMultiStepForm />} />
                  <Route path="jobApplication" element={<ViewJobApplication />} />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_LOG]} userType={1} />}>
                <Route path="log">
                  <Route index element={<Log />} />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ROLES]} userType={1} />}>
                <Route path="/roles" element={<ViewRoles />} />
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ATTENDANCE]} userType={1} />}>
                <Route path="/shifts" element={<ViewShifts />} />
                <Route
                  path='/biometricDevices'
                  element={<ViewBiometricDevices />}
                />
                <Route
                  path='/timeSheetLog'
                  element={<ViewTimeSheetLog />}
                />
              </Route>

              <Route path='appointments'>
                <Route
                  index
                  path='calendar'
                  element={<AppointmentsCalendar />}
                />

                <Route
                  path='cancelled'
                  element={<CancelledAppointments />}
                />
              </Route>

              <Route path='consultant'>
                <Route
                  path='timeSchedules'
                  element={<TimeSchedules />}
                />
                <Route
                  path='calendar'
                  element={<ConsultantCalendar />}
                />
              </Route>

              {/* <Route element={<AccessRoute allowedRoutes={[]} />}> */}
              <Route path="consultants">
                <Route index element={<ViewConsultants />} />
                <Route path="add" element={<MaintainConsultant />} />
                <Route path="update/:consID" element={<MaintainConsultant />} />
                <Route path="view/:consID" element={<ViewConsultant />} />
              </Route>
              {/* </Route> */}

              {/* <Route element={<AccessRoute allowedRoutes={[]} />}> */}
              <Route path="customers">
                <Route index element={<ViewCustomers />} />
                <Route path="add" element={<MaintainCustomer />} />
                <Route path="update/:custID" element={<MaintainCustomer />} />
                <Route path="view/:custID" element={<ViewCustomer />} />
                <Route path="detect" element={<DetectCustomer />} />
              </Route>
              {/* </Route> */}

              {/* <Route element={<AccessRoute allowedRoutes={[]} />}> */}
              <Route path="events">
                <Route index element={<ViewEvents />} />
                <Route path="add" element={<MaintainEvent />} />
                <Route path="update/:eventID" element={<MaintainEvent />} />
              </Route>
              {/* </Route> */}

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
