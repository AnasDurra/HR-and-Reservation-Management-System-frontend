import { Button, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, deleteCustomer } from "../../redux/customers/reducer";
import './Customers.css';
import { useNavigate } from "react-router-dom";
import ServerSideSearchField from "../../Components/ServerSideSearchField/ServerSideSearchField";

function ViewCustomers() {

    const customers = useSelector(state => state.customersReducer.customers);
    const loading = useSelector(state => state.customersReducer.loading);
    const metaData = useSelector(state => state.customersReducer.metaData);
    const error = useSelector(state => state.customersReducer.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [showAllCustomers, setShowAllCustomers] = useState(1);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCustomers({ type: showAllCustomers }));
    }, [showAllCustomers]);

    const deleteCustomerFunction = () => {
        console.log('deleted: ', selectedCustomer);
        dispatch(deleteCustomer({
            id: selectedCustomer.id,
        }));
        closeDeleteModal();
    }

    const closeDeleteModal = () => {
        setSelectedCustomer(null);
        setOpenDeleteModal(false);
    }

    const allCustomersColumns = [
        {
            title: 'المعرّف الشخصي',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'الاسم',
            key: 'name',
            dataIndex: 'full_name',
        },
        {
            title: 'رقم الهاتف',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'حالة الحساب',
            key: 'status',
            render: (record) =>
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <Typography>{record.verified ? "موثّق" : "غير موثّق"}</Typography>
                    {record.verified ? <CheckCircleOutlined style={{ color: "green" }} />
                        : <CloseCircleOutlined style={{ color: "red" }} />}
                    <Typography>{!record.blocked ? "فعّال" : "غير فعّال"}</Typography>
                    {!record.blocked ? <CheckCircleOutlined style={{ color: "green" }} />
                        : <CloseCircleOutlined style={{ color: "red" }} />}
                </div>
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedCustomer(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            navigate(`update/${record.id}`);
                        }} />
                        <EyeOutlined onClick={() => {
                            navigate(`view/${record.id}`);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const contrayCustomersColumns = [
        {
            title: 'المعرّف الشخصي',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'الاسم',
            key: 'name',
            dataIndex: 'full_name',
        },
        {
            title: 'رقم الهاتف',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'عدد المواعيد المتخلف عنها',
            dataIndex: 'missed_appointment_count',
            key: 'missed_appointment_count',
        },
        {
            title: 'حالة الحساب',
            key: 'status',
            render: (record) =>
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <Typography>{record.verified ? "موثّق" : "غير موثّق"}</Typography>
                    {record.verified ? <CheckCircleOutlined style={{ color: "green" }} />
                        : <CloseCircleOutlined style={{ color: "red" }} />}
                    <Typography>{!record.blocked ? "فعّال" : "غير فعّال"}</Typography>
                    {!record.blocked ? <CheckCircleOutlined style={{ color: "green" }} />
                        : <CloseCircleOutlined style={{ color: "red" }} />}
                </div>
        },
    ];

    const handleReset = () => {
        setSearchValue("");
        dispatch(getCustomers({ type: showAllCustomers }));
    }

    const handleSearch = () => {
        dispatch(getCustomers({ name: searchValue, type: showAllCustomers }));
    }

    const handlePageChange = (page) => {
        console.log(page);
        dispatch(getCustomers({ page: page, name: searchValue, type: showAllCustomers }));
    }

    return (
        <Spinner loading={loading}>
            <div>
                <Button
                    className="viewCustomersButton"
                    onClick={() => setShowAllCustomers(!showAllCustomers)}
                >
                    {showAllCustomers ? "عرض المستفيدين المخالفين" : "عرض جميع المستفيدين"}
                </Button>
                <ServerSideSearchField
                    handleReset={handleReset}
                    handleSearch={handleSearch}
                    placeholder="البحث عن المستفيد"
                    resetBtnText="إعادة"
                    searchBtnText="البحث"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Table
                    columns={showAllCustomers ? allCustomersColumns : contrayCustomersColumns}
                    dataSource={customers}
                    rowKey='id'
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                />
                <Button
                    className="customersButton"
                    onClick={() => navigate("/customers/add")}
                >
                    إضافة مستفيد
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteCustomerFunction}
                    handleCancel={closeDeleteModal}
                />
            </div>
        </Spinner>
    );
}

export default ViewCustomers;