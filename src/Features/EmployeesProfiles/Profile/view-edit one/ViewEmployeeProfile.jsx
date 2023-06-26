import { Form, Image, Segmented, Typography, Tag, List, Divider, Dropdown, Space, Button } from "antd";
import "./style.css";
import ViewEditJobApplicationForm from "./components/ViewEditJobApplicationForm";
import TextArea from "antd/es/input/TextArea";
import {
  ApiOutlined,
  BankOutlined,
  CalendarOutlined,
  DatabaseOutlined,
  MailOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../../../redux/Features/Employee Profile/Employee/slice";
import { useEffect, useState } from "react";
import { getJobApplication } from "../../../../redux/Features/Employee Profile/Job application/slice";
import "./ViewEmployeeProfile.css";

const ViewEmployeeProfile = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);

  const employeesSlice = useSelector((state) => state.employeesSlice);
  const employee = useSelector((state) => state.employeesSlice.employee);

  const handleRemoveField = (fieldName) => {
    const fields = form.getFieldsValue();
    delete fields[fieldName];
    form.resetFields();
    form.setFieldsValue(fields);
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const openAccountDrawer = () => setIsAccountDrawerOpen(true);
  const closeAccountDrawer = () => setIsAccountDrawerOpen(false);
  const openRoleDrawer = () => setIsRoleDrawerOpen(true);
  const closeRoleDrawer = () => setIsRoleDrawerOpen(false);
  const showEditDepartmentModal = () => {};

  useEffect(() => {
    dispatch(getEmployee(10));
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(employee?.employee_data);
    /*  if (isEditMode) {
      toggleEditMode();
    } */
  }, [employee]);

  const items = [
    {
      label: "تعديل",
      key: "0",
      children: [
        {
          label: <div onClick={openAccountDrawer}>الحساب</div>,
          key: "0-0",
        },
        {
          label: <div onClick={toggleEditMode}>البيانات</div>,
          key: "0-1",
        },
        {
          label: <div onClick={openRoleDrawer}>المسمى الوظيفي & الصلاحيات</div>,
          key: "0-2",
        },
        {
          label: <div onClick={showEditDepartmentModal}>القسم</div>,
          key: "0-3",
        },
        {
          label: <div> الوضع الوظيفي</div>,
          key: "0-4",
          children: [
            {
              key: "0-4-1",
              // disabled: jobApplication?.application_status?.app_status_id === 1,
              label: <div onClick={() => {}}> يعمل</div>,
            },
            {
              key: "0-4-4",
              //disabled: jobApplication?.application_status?.app_status_id === 2,

              label: <div onClick={() => {}}>في إجازة</div>,
            },
            {
              key: "0-4-3",
              // disabled: jobApplication?.application_status?.app_status_id === 3,
              label: <div onClick={() => {}}>استقال</div>,
            },
            {
              key: "0-4-4",
              // disabled: jobApplication?.application_status?.app_status_id === 4,
              label: <div onClick={() => {}}>إيقاف مؤقت</div>,
            },
          ],
        },
      ],
    },
    {
      label: <div onClick={() => {}}>حذف</div>,
      key: "1",
      danger: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
     {!isEditMode && (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              <Button type="link">
                <SettingOutlined />
              </Button>
            </Space>
          </Dropdown>
        )}

      <ViewEditJobApplicationForm
        editMode={isEditMode}
        form={form}
        handleRemoveField={handleRemoveField}
        hidePersonalImg={true}
      />

      <div
        style={{
          width: "25%",
          height: "20%",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            borderRadius: "50%",
            position: "relative",
            width: "200px",
            height: "200px",
          }}
          preview={false}
          src=""
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title level={2} style={{ margin: "20px" }}>
            أنس ريش
          </Typography.Title>
          <Tag color="green" style={{}}>
            موظف حالي
          </Tag>
        </div>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          <CalendarOutlined style={{ color: "#1d39c4" }} />
          <span style={{ color: "#1d39c4", margin: "0 10px" }}>
            تاريخ الانضمام
          </span>
          <span>سبتمر</span>
        </Typography.Title>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          <BankOutlined style={{ color: "#1d39c4" }} />
          <span style={{ color: "#1d39c4", margin: "0 10px" }}>السكن</span>
          <span>ركن الدين</span>
        </Typography.Title>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          <MailOutlined style={{ color: "#1d39c4" }} />
          <span style={{ color: "#1d39c4", margin: "0 10px" }}>
            البريد الإلكتروني
          </span>
          <span>anas@sos</span>
        </Typography.Title>
        <Divider> النشاطات</Divider>

        <div className="actions-list">
          <List size="small">
            {/*       <style>
              {`
          .actions-list::-webkit-scrollbar {
            width: 5px;
          }
          .actions-list::-webkit-scrollbar-track {
            background-color: #f5f5f5;
          }
          .actions-list::-webkit-scrollbar-thumb {
            background-color: #1d39c4;
          }
        `}
            </style> */}
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
            <List.Item>حدث</List.Item>
          </List>
        </div>
      </div>
    </div>
  );
};
export default ViewEmployeeProfile;
