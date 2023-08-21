import { Button, Descriptions, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer } from "../../redux/customers/reducer";
import Spinner from "../../Components/Spinner/Spinner";

function ConsultantCustomer() {

    const customer = useSelector(state => state.customersReducer.customer);
    const statis = useSelector(state => state.customersReducer.customerAppointmentsStatistics);
    const loading = useSelector(state => state.customersReducer.loading);
    const dispatch = useDispatch();
    const { custID } = useParams();
    const navigate = useNavigate();
    const [customerFamilyState, setCustomerFamilyState] = useState(null);


    useEffect(() => {
        if (custID) {
            dispatch(getCustomer({ id: custID }));
        }
    }, []);


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
            familyState.map(s => s.id === customer.martial_status ? setCustomerFamilyState(s) : null);
        }
    }, [customer]);



    return (
        <Spinner loading={loading}>
            <div>
                <Descriptions bordered column={2} title={
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography>بيانات المستفيد</Typography>
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
                </Descriptions>
                <Button
                    style={{marginTop: '20px'}}
                    onClick={() => navigate(-1)}
                >
                    العودة
                </Button>
            </div>
        </Spinner>
    );
}

export default ConsultantCustomer;