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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = getUser();
  const permissions = useSelector((state) => state.userReducer.permissions);

  useEffect(() => {
    if (user) {
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
              <Route element={<AccessRoute allowedRoutes={[PERMISSIONS.MANAGE_DEPARTMENTS]} />}>
                <Route
                  path='/departments'
                  element={<ViewDepartments />}
                />
              </Route>

              <Route element={<AccessRoute allowedRoutes={[PERMISSIONS.MANAGE_JOB_VACANCIES]} />}>
                <Route
                  path='/jobVacancies'
                  element={<ViewJobVacancies />}
                />
              </Route>

              <Route path='employees'>
                <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_EMPLOYEES]} />}>
                  <Route
                    index
                    element={<ViewEmployeesProfiles />}
                  />
                  <Route
                    path='profile'
                    element={<ViewEmployeeProfile />}
                  />
                </Route>

                <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ATTENDANCE]} />}>
                  <Route path='vacations'>
                    <Route
                      index
                      element={<EmployeesVacations />}
                    />
                    <Route
                      path='requests'
                      element={<ViewVacationRequests />}
                    />
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

                <Route element={<AccessRoute allowedRoutes={[Permissions.EXPORT_REPORTS]} />}>
                  <Route
                    path='reports'
                    element={<EmployeesReports />}
                  />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_JOB_APPLICATIONS]} />}>
                <Route path='jobApplications'>
                  <Route
                    index
                    element={<ViewJobApplications />}
                  />
                  <Route
                    path='add'
                    element={<JobApplicationMultiStepForm />}
                  />
                  <Route
                    path='jobApplication'
                    element={<ViewJobApplication />}
                  />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_LOG]} />}>
                <Route path='log'>
                  <Route
                    index
                    element={<Log />}
                  />
                </Route>
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ROLES]} />}>
                <Route
                  path='/roles'
                  element={<ViewRoles />}
                />
              </Route>

              <Route element={<AccessRoute allowedRoutes={[Permissions.MANAGE_ATTENDANCE]} />}>
                <Route
                  path='/shifts'
                  element={<ViewShifts />}
                />
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

              <Route
                path='*'
                element={<Navigate to='/' />}
              />
            </Route>
          </Routes>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
