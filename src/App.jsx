import { Button, ConfigProvider } from 'antd'
import './App.css'
import arEG from 'antd/lib/locale/ar_EG';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogInPage from './Features/Login/LogInPage/Login';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AccessRoute from './Components/AccessRoute/AccessRoute';
import Roles from './Components/AccessRoute/Roles';

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
            <Route path='/login' element={<LogInPage />} />
            <Route path='/unauthorized' element={<Unauthorized />} />


            {/*Example For Privilaged Routes*/}
            {/* <Route element={<AccessRoute allowedRoutes={Roles.HR} />}> */}
            {/*Some Route*/}
            {/* </Route> */}

            {/*Dummy Routes*/}
            <Route path='/jobVacancies' element={<div><Button >Users</Button></div>} />
            <Route path='/jobVacancies/add' element={<div>Add job Vacancy</div>} />
            <Route path='/employees' element={<div>All Emplyees</div>} />

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
