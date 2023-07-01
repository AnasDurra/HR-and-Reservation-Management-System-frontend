import { Button, ConfigProvider } from "antd";
import "./App.css";
import arEG from "antd/lib/locale/ar_EG";
import { connect, useDispatch } from "react-redux";
import Layout from "./Components/Layout/Layout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LogInPage from "./Features/Login/Login";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import AccessRoute from "./Components/AccessRoute/AccessRoute";
import Permissions from "./Components/AccessRoute/Permissions";
import ViewDepartments from "./Features/EmployeesProfiles/Departments/ViewDepartments";
import JobApplicationMultiStepForm from "./Features/EmployeesProfiles/Job Application/add/JobApplicationMultiStepForm";
import ViewJobVacancies from "./Features/EmployeesProfiles/JobVacancies/ViewJobVacancies";
import ViewJobApplications from "./Features/EmployeesProfiles/Job Application/view all/ViewJobApplications";
import ViewRoles from "./Features/Roles/ViewRoles";
import ChangeEmployeePermissions from "./Features/Roles/ChangeEmployeePermissions";
import ViewShifts from "./Features/Attendance/Shifts/ViewShifts";
import ViewBiometricDevices from "./Features/Attendance/BiometricDevices/ViewBiometricDevices";
import ViewTimeSheetLog from "./Features/Attendance/TimeSheetLog/ViewTimeSheetLog";
import ViewEmployeesProfiles from "./Features/EmployeesProfiles/Profile/view all/ViewEmployeesProfiles";
import ViewEmployeeProfile from "./Features/EmployeesProfiles/Profile/view-edit one/ViewEmployeeProfile";
import ViewJobApplication from "./Features/EmployeesProfiles/Job Application/view one/ViewJobApplication";
import Log from "./Features/Log/Log";
import EmployeesVacations from "./Features/Attendance/Vacations/EmployeesVacations";
import EmployeesAbsences from "./Features/Attendance/Absences/EmployeesAbsences";
import EmployeesVacationRequests from "./Features/Attendance/Vacations/EmployeesVacationRequests";
import ViewVacationRequests from "./Features/Attendance/Vacations/ViewVacationRequests";
import ViewTimeShiftRequests from "./Features/Attendance/TimeShift/ViewTimeShiftRequests";
import EmployeesReports from "./Features/EmployeesReports/EmployeesReports";
import { useEffect } from "react";
import { getEmployeePermissions } from "./redux/user/reducer";

function App(props) {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getEmployeePermissions());
  }, [dispatch, location]);

  return (
    <div>
      <ConfigProvider
        direction="rtl"
        locale={arEG}
        theme={{
          token: {
            fontFamily: "cairo",
            colorPrimary: "#0c3ded",
          },
          components: {
            Button: {
              borderRadius: "12px",
            },
          },
        }}
      >
        <Layout>
          <Routes>
            {/*public Routes*/}
            <Route path="/" element={<div>Root</div>} />
            <Route element={<AccessRoute />}>
              <Route path="/login" element={<LogInPage />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/*Example For Privilaged Routes*/}
            {/* <Route element={<AccessRoute allowedRoutes={Permissions.ADD_DEPARTMENT} />}> */}
            {/*Some Route*/}
            {/* </Route> */}

            <Route element={<AccessRoute />}>
              <Route path="/departments" element={<ViewDepartments />} />
              <Route path="/jobVacancies" element={<ViewJobVacancies />} />

              <Route path="employees">
                <Route index element={<ViewEmployeesProfiles />} />
                <Route path="profile" element={<ViewEmployeeProfile />} />
                <Route path="vacations">
                  <Route index element={<EmployeesVacations />} />
                  <Route path="requests" element={<ViewVacationRequests />} />
                </Route>
                <Route path="timeShiftRequests" element={<ViewTimeShiftRequests />} />
                <Route path="absences" element={<EmployeesAbsences />} />

                <Route path="reports" element={<EmployeesReports />} />
              </Route>

              <Route path="jobApplications">
                <Route index element={<ViewJobApplications />} />
                <Route path="add" element={<JobApplicationMultiStepForm />} />
                <Route path="jobApplication" element={<ViewJobApplication />} />
              </Route>
              <Route path="log">
                <Route index element={<Log />} />
              </Route>
              <Route path="/roles" element={<ViewRoles />} />
              <Route
                path="/changeEmployeePermissions"
                element={<ChangeEmployeePermissions />}
              />
              <Route path="/shifts" element={<ViewShifts />} />
              <Route
                path="/biometricDevices"
                element={<ViewBiometricDevices />}
              />
              <Route path="/timeSheetLog" element={<ViewTimeSheetLog />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    error: state.userReducer.error,
    loading: state.userReducer.loading,
  };
};

export default connect(mapStateToProps)(App);
