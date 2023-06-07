import { Button, ConfigProvider } from "antd";
import "./App.css";
import arEG from "antd/lib/locale/ar_EG";
import { connect } from "react-redux";
import Layout from "./Components/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
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
import ViewShifts from './Features/Attendance/Shifts/ViewShifts';
import ViewBiometricDevices from './Features/Attendance/BiometricDevices/ViewBiometricDevices';
import ViewTimeSheetLog from './Features/Attendance/TimeSheetLog/ViewTimeSheetLog';
import ViewEmployeesProfiles from "./Features/EmployeesProfiles/Profile/view all/ViewEmployeesProfiles";
import ViewEmployeeProfile from "./Features/EmployeesProfiles/Profile/view-edit one/ViewEmployeeProfile";
import ViewJobApplication from "./Features/EmployeesProfiles/Job Application/view one/ViewJobApplication";
import Log from "./Features/Log/Log";

function App(props) {
  return (
    <div>
      <ConfigProvider
        direction="rtl"
        locale={arEG}
        theme={{
          token: {
            fontFamily: 'cairo',
            colorPrimary: '#0c3ded',
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
            <Route path="/login" element={<LogInPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/*Example For Privilaged Routes*/}
            {/* <Route element={<AccessRoute allowedRoutes={Permissions.ADD_DEPARTMENT} />}> */}
            {/*Some Route*/}
            {/* </Route> */}

            <Route path="/departments" element={<ViewDepartments />} />

            <Route path="jobApplications">
              <Route index element={<ViewJobApplications />} />
              <Route path="add" element={<JobApplicationMultiStepForm />} />
              <Route path="jobApplication" element={<ViewJobApplication />} />
            </Route>

            <Route path="employees">
              <Route index element={<ViewEmployeesProfiles />} />
              <Route path="profile" element={<ViewEmployeeProfile />} />
            </Route>
            <Route path="log">
              <Route index element={<Log />} />
            </Route>

            {/*Dummy Routes*/}
            <Route
              path="/jobVacancies"
              element={
                <div>
                  <Button>Users</Button>
                </div>
              }
            />
            {/*Dummy Routes*/}
            <Route path="/test" element={<Log />} />
            <Route
              path="/jobVacancies/add"
              element={<div>Add job Vacancy</div>}
            />
            <Route path="/employees" element={<div>All Emplyees</div>} />
            <Route path="/departments" element={<ViewDepartments />} />
            <Route path="/jobVacancies" element={<ViewJobVacancies />} />

            <Route path="/jobApplications" element={<ViewJobApplications />} />
            <Route path="/roles" element={<ViewRoles />} />
            <Route
              path="/changeEmployeePermissions"
              element={<ChangeEmployeePermissions />}
            />

            <Route path="*" element={<Navigate to="/" />} />
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
