import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, deleteCustomer, getConsultantCustomers } from "../../redux/customers/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import ServerSideSearchField from "../../Components/ServerSideSearchField/ServerSideSearchField";

function ConsultantCustomers() {

    const customers = useSelector(state => state.customersReducer.customers);
    const loading = useSelector(state => state.customersReducer.loading);
    const metaData = useSelector(state => state.customersReducer.metaData);
    const error = useSelector(state => state.customersReducer.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [newData, setNewData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(getConsultantCustomers());
    }, [dispatch]);

    useEffect(() => {
        if(customers.length > 0) {
            let d = [];
            let d2 = [];
            customers.map(c => {
                if(!d2.includes(c.id)) {
                    d = d.concat(c);
                    d2 = d2.concat(c.id);
                }
            });

            setNewData(d);
        }
    }, [customers]);


    console.log(customers);
    const allCustomersColumns = [
        {
            title: 'المعرّف الشخصي',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'الاسم',
            key: 'name',
            render: (record) => <Typography>{record.first_name + " " + record.last_name}</Typography>
        },
        {
            title: 'رقم الهاتف',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
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
        dispatch(getConsultantCustomers());
    }

    const handleSearch = () => {
        dispatch(getConsultantCustomers({ name: searchValue }));
    }

    const handlePageChange = (page) => {
        dispatch(getConsultantCustomers({ page: page, name: searchValue }));
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
                    columns={allCustomersColumns}
                    dataSource={newData}
                    rowKey='id'
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        pageSize: 10
                        // current: metaData?.current_page,
                        // pageSize: metaData?.per_page,
                        // total: metaData?.total,
                        // onChange: handlePageChange,
                    }}
                />
            </div>
        </Spinner>
    );
}

export default ConsultantCustomers;