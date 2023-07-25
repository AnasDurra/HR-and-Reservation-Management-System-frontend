import './Login.css';
import LoginForm from './LoginForm';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { login } from '../../redux/user/reducer';

function LogInPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const loading = useSelector(state => state.userReducer.loading);

    const onFinish = (values) => {
        console.log(values);
        dispatch(login({values, location, navigate}));
    };

    return (
        <div className="loginContainer">
            <img className='image' src="./undraw_sign_in_re_o58h.svg" />
            <LoginForm loading={loading} onFinish={onFinish} />
        </div>
    );
};

export default LogInPage;