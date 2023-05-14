import { ConfigProvider } from 'antd'
import './App.css'
import arEG from 'antd/lib/locale/ar_EG';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogInPage from './Features/Login/Login';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AccessRoute from './Components/AccessRoute/AccessRoute';
import Roles from './Components/AccessRoute/Roles';
import ViewDepartments from './Features/EmployeesProfiles/Departments/ViewDepartments';
import ViewJobVacancies from './Features/EmployeesProfiles/JobVacancies/ViewJobVacancies';
import ViewEmployeesPrfiles from './Features/EmployeesProfiles/Apps-Profiles/ViewEmployeesProfiles';
import ViewJobApplications from './Features/EmployeesProfiles/Apps-Profiles/ViewJobApplications';

function App(props) {

  return (
    <div>
      <ConfigProvider
        direction='rtl'
        locale={arEG}
        theme={{
          token: {
            fontFamily: 'cairo',
            colorPrimary: '#E4D39E',
          },
          components: {
            Button: {
              borderRadius: '12px',
            },
            Typography: {
              colorBgBase: 'red'
            }
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
            {/* <Route element={<AccessRoute allowedRoutes={Roles.HR} />}> */}
            {/*Some Route*/}
            {/* </Route> */}

            <Route path='/departments' element={<ViewDepartments />} />
            <Route path='/jobVacancies' element={<ViewJobVacancies />} />
            <Route path='/employeesProfiles' element={<ViewEmployeesPrfiles />} />
            <Route path='/jobApplications' element={<ViewJobApplications />} />

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
