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
import ViewEmployeesPrfiles from "./Features/EmployeesProfiles/Apps-Profiles/ViewEmployeesProfiles";
import ViewJobApplications from "./Features/EmployeesProfiles/Job Application/view/all/ViewJobApplications";
import ViewRoles from "./Features/EmployeesProfiles/Roles/ViewRoles";
import ChangeEmployeePermissions from "./Features/EmployeesProfiles/Roles/ChangeEmployeePermissions";
import ViewEmployeeProfile from "./Features/EmployeesProfiles/profile/ViewEmployeeProfile";

function App(props) {
  return (
    <div>
      <ConfigProvider
        direction="rtl"
        locale={arEG}
        theme={{
          token: {
            fontFamily: "cairo",
            colorPrimary: "rgb(12, 62, 237);",
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
            </Route>

            <Route path="/employeeProfile" element={<ViewEmployeeProfile />} />

            {/*Dummy Routes*/}
            <Route
              path="/jobVacancies"
              element={
                <div>
                  <Button>Users</Button>
                </div>
              }
            />
            <Route
              path="/jobVacancies/add"
              element={<div>Add job Vacancy</div>}
            />
            <Route path="/employees" element={<div>All Emplyees</div>} />
            <Route path="/departments" element={<ViewDepartments />} />
            <Route path="/jobVacancies" element={<ViewJobVacancies />} />
            <Route
              path="/employeesProfiles"
              element={<ViewEmployeesPrfiles />}
            />
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
