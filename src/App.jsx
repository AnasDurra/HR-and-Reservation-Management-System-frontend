import { Button, ConfigProvider } from 'antd'
import './App.css'
import arEG from 'antd/lib/locale/ar_EG';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';

function App(props) {

  return (
    <div>
      <ConfigProvider
        direction='rtl'
        locale={arEG}
        theme={{
          token: {
            fontFamily: 'cairo',
            colorPrimary: 'orange'
          },
          components: {
            Button: {
              borderRadius: '12px',
            },
          }
        }}
      >
        <Layout>
          <Routes>

            <Route path='/' element={<div>Home</div>} />
            <Route path='/users' element={<div><Button >Users</Button></div>} />
            <Route path='/products' element={<div>Products</div>} />
            <Route path='/add/products' element={<div>Add Products</div>} />

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
