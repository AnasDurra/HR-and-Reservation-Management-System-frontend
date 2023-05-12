import './Login.css';
import LoginForm from './LoginForm';
import * as userActions from '../../redux/user/actions';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function LogInPage(props) {

    const location = useLocation();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
        // props.logIn(values, location, navigate);
    };

    return (
        <div className="loginContainer">
            <img className='image' src="./undraw_sign_in_re_o58h.svg" />
            <LoginForm onFinish={onFinish} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error,
        loading: state.userReducer.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (payload, location, navigate) => {
            dispatch(
                userActions.userLogIn(payload, location, navigate)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);