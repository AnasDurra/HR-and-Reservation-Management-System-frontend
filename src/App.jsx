import { ConfigProvider } from 'antd'
import './App.css'
import arEG from 'antd/lib/locale/ar_EG';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogInPage from './Features/Login/Login';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AccessRoute from './Components/AccessRoute/AccessRoute';
import Permissions from './Components/AccessRoute/Permissions';
import ViewDepartments from './Features/EmployeesProfiles/Departments/ViewDepartments';
import ViewJobVacancies from './Features/EmployeesProfiles/JobVacancies/ViewJobVacancies';
import ViewEmployeesPrfiles from './Features/EmployeesProfiles/Apps-Profiles/ViewEmployeesProfiles';
import ViewJobApplications from './Features/EmployeesProfiles/Apps-Profiles/ViewJobApplications';
import ViewRoles from './Features/Roles/ViewRoles';
import ChangeEmployeePermissions from './Features/Roles/ChangeEmployeePermissions';
import ViewShifts from './Features/Attendance/Shifts/ViewShifts';

function App(props) {

  return (
    <div>
      <ConfigProvider
        direction='rtl'
        locale={arEG}
        theme={{
          token: {
            fontFamily: 'cairo',
            colorPrimary: 'rgb(12, 62, 237);',
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
            <Route path='/' element={<div>Root</div>} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/unauthorized' element={<Unauthorized />} />


            {/*Example For Privilaged Routes*/}
            {/* <Route element={<AccessRoute allowedRoutes={Permissions.ADD_DEPARTMENT} />}> */}
            {/*Some Route*/}
            {/* </Route> */}

            <Route path='/departments' element={<ViewDepartments />} />
            <Route path='/jobVacancies' element={<ViewJobVacancies />} />
            <Route path='/employeesProfiles' element={<ViewEmployeesPrfiles />} />
            <Route path='/jobApplications' element={<ViewJobApplications />} />
            <Route path='/roles' element={<ViewRoles />} />
            <Route path='/changeEmployeePermissions' element={<ChangeEmployeePermissions />} />
            <Route path='/shifts' element={<ViewShifts />} />

            <Route path='*' element={<Navigate to='/' />} />

          </Routes>
        </Layout>
      </ConfigProvider>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    error: state.userReducer.error,
    loading: state.userReducer.loading,
  }
}

export default connect(mapStateToProps)(App);
