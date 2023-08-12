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
    const error = useSelector(state => state.customersReducer.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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

    const columns = [
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
            dataIndex: 'verified',
            key: 'status',
            render: (status) =>
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <Typography>{status ? "موثّق" : "غير موثّق"}</Typography>
                    {status ? <CheckCircleOutlined style={{ color: "green" }} />
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


    const handleReset = () => {
        setSearchValue("");
        dispatch(getCustomers());
    }

    const handleSearch = () => {
        console.log(searchValue);
        dispatch(getCustomers({ name: searchValue }));
    }

    return (
        <Spinner loading={loading}>
            <div>
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
                    columns={columns}
                    dataSource={customers}
                    rowKey='id'
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
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