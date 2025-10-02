import { useState } from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/user/reducer";
import CredentialsModal from "./components/CredentialsModal";
import { Button, Tooltip } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

function LogInPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);

  const [isModalVisible, setIsModalVisible] = useState(true);

  const onFinish = (values) => {
    dispatch(login({ values, location, navigate }));
  };

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const [visible, setVisible] = useState(true);
  const handleTooltipClose = () => {
    setVisible(false); // Close the tooltip when clicked
  };

  return (
    <>
      <CredentialsModal
        autoOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <div className="loginContainer">
        <img className="image" src="./undraw_sign_in_re_o58h.svg" />
        <LoginForm loading={loading} onFinish={onFinish} />
      </div>

      <Tooltip
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>هنا يمكنك عرض البيانات الشخصية</span>
            <CloseOutlined
              style={{ cursor: "pointer", marginRight: 10 }}
              onClick={handleTooltipClose}
            />
          </div>
        }
        open={visible}
      >
        <Button
          type="primary"
          shape="circle"
          icon={<UserOutlined />}
          size="large"
          className="fab-button"
          onClick={toggleModal}
        />
      </Tooltip>
    </>
  );
}

export default LogInPage;
