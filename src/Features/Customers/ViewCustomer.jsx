import { Button, Descriptions, Form, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cahngeCustomerAccountActiveState, getCustomer, getCustomerAppointmentsStatistics, verifyAccount } from "../../redux/customers/reducer";
import Spinner from "../../Components/Spinner/Spinner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import VerifyAccountModal from "./VerifyAccountModal";

function ViewCustomer() {

    const customer = useSelector(state => state.customersReducer.customer);
    const statis = useSelector(state => state.customersReducer.customerAppointmentsStatistics);
    const loading = useSelector(state => state.customersReducer.loading);
    const dispatch = useDispatch();
    const { custID } = useParams();
    const navigate = useNavigate();
    const [customerFamilyState, setCustomerFamilyState] = useState(null);

    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        if (custID) {
            dispatch(getCustomerAppointmentsStatistics({id: custID}));
            dispatch(getCustomer({ id: custID }));
        }
    }, []);

    console.log(statis);

    const data =
     
    [
        {
            name: 'العيادة النفسية',
            ["المواعيد المكتملة"]: 20,
            ["المواعيد الملغية"]: 20,
        },
        {
            name: 'العيادة القانونية',
            ["المواعيد المكتملة"]: 0,
            ["المواعيد الملغية"]: 5,
        },
        {
            name: 'العيادة الأسرية',
            ["المواعيد المكتملة"]: 10,
            ["المواعيد الملغية"]: 7,
        },
    ];

    const [show, setShow] = useState(false);

    const familyState = [
        {
            id: 1,
            name: 'متزوج',
        },
        {
            id: 2,
            name: 'أعزب',
        },
        {
            id: 3,
            name: 'خاطب',
        },
        {
            id: 4,
            name: 'مطلّق',
        },
        {
            id: 5,
            name: 'أرمل',
        },
    ];

    useEffect(() => {
        if (customer) {
            setTimeout(() => {
                setShow(true);
            }, 200);

            familyState.map(s => s.id === customer.martial_status ? setCustomerFamilyState(s) : null);
        }
    }, [customer]);

    const changeActiveState = () => {
        dispatch(cahngeCustomerAccountActiveState({ id: customer?.id }));
    };

    const accountState = (
        <div style={{ display: "flex", justifyContent: 'space-around' }}>
            <Typography>{customer?.verified ? "موثّق" : "غير موثّق"}</Typography>
            {customer?.verified ? <CheckCircleOutlined style={{ color: "green" }} />
                : <CloseCircleOutlined style={{ color: "red" }} />}
            <Typography>{!customer?.blocked ? "فعّال" : "غير فعّال"}</Typography>
            {!customer?.blocked ? <CheckCircleOutlined style={{ color: "green" }} />
                : <CloseCircleOutlined style={{ color: "red" }} />}
        </div>
    );

    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [verifyForm] = Form.useForm();

    const handleCancel = () => {
        verifyForm.resetFields();
        setOpenVerifyModal(false);
    }

    const onFinish = (data) => {
        data.app_account_id = custID;
        dispatch(verifyAccount(data));
        setOpenVerifyModal(false);
        verifyForm.resetFields();
    }

    return (
        <Spinner loading={loading}>
            <div>
                <Descriptions bordered column={2} title={
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography>بيانات المستفيد</Typography>
                        <div className="customerProfileActionButtons">
                            {!customer?.verified ?
                                <Button onClick={() => setOpenVerifyModal(true)}>توثيق الحساب</Button>
                                : null}
                            <Button onClick={changeActiveState}>{!customer?.blocked ? "إلغاء تفعيل" : "تفعيل"}</Button>
                        </div>
                    </div>}>
                    <Descriptions.Item label="المعرّف الشخصي">{customer?.id}</Descriptions.Item>
                    <Descriptions.Item label="تاريخ التسجيل">{customer?.created_at?.substring(0, 10)}</Descriptions.Item>
                    <Descriptions.Item label="الاسم">{customer?.first_name}</Descriptions.Item>
                    <Descriptions.Item label="الكنية">{customer?.last_name}</Descriptions.Item>
                    <Descriptions.Item label="تاريخ الميلاد">{customer?.birth_date}</Descriptions.Item>
                    <Descriptions.Item label="رقم الهاتف">{customer?.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="رقم الهاتف الأرضي">{customer?.phone}</Descriptions.Item>
                    <Descriptions.Item label="البريد الألكتروني">{customer?.email}</Descriptions.Item>
                    <Descriptions.Item label="الرقم الوظني">{customer?.national_number ? customer?.national_number : "لا يوجد"}</Descriptions.Item>
                    <Descriptions.Item label="المستوى التعليمي">{customer?.education_level?.name}</Descriptions.Item>
                    <Descriptions.Item label="العمل">{customer?.job}</Descriptions.Item>
                    <Descriptions.Item label="عدد الأولاد">{customer?.num_of_children}</Descriptions.Item>
                    <Descriptions.Item label="الحالة العائلية">{customerFamilyState?.name}</Descriptions.Item>
                    <Descriptions.Item label="حالة الحساب">{accountState}</Descriptions.Item>
                </Descriptions>

                {show ?
                    <div>
                        <ResponsiveContainer width={"100%"} height={500}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickCount={10} tickSize={10} tickMargin={30} />
                                <Tooltip />
                                <Legend />
                                <Bar barSize={34} dataKey="المواعيد المكتملة" stackId="a" fill="#82ca9d" />
                                <Bar barSize={35} dataKey="المواعيد الملغية" stackId="a" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            العودة
                        </Button>
                    </div>
                    : null}

                <VerifyAccountModal
                    form={verifyForm}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    open={openVerifyModal}
                />

            </div>
        </Spinner>
    );
}

export default ViewCustomer;