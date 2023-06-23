import { Table, Tag, Typography } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './Vacations.css';
import { getVacationRequests, acceptVacationRequest, rejectVacationRequest } from "../../../redux/vacations/reducer";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function ViewVacationRequests() {

    const dispatch = useDispatch();
    const vacationsRequests = useSelector(state => state.vacationsReducer.vacationRequests);
    const metaData = useSelector(state => state.vacationsReducer.metaData);
    const loading = useSelector(state => state.vacationsReducer.loading);
    const error = useSelector(state => state.vacationsReducer.error);

    const [filterValue, setFilterValue] = useState([]);

    useEffect(() => {
        dispatch(getVacationRequests());
    }, []);

    useEffect(() => {
        dispatch(getVacationRequests({ req_stat: Number(filterValue[0]) }));
    }, [filterValue]);


    const handlePageChange = (page) => {
        dispatch(getVacationRequests({ page: page, req_stat: Number(filterValue[0]) }));
    }


    const filterValues = [
        {
            text: "قيد الإنتظار",
            value: 1
        },
        {
            text: "مقبول",
            value: 2,
        },
        {
            text: "مرفوض",
            value: 3,
        },
    ];

    const columns = [
        {
            title: 'المعرف الشخصي',
            dataIndex: 'emp_id',
            key: 'emp_id',
        },
        {
            title: 'اسم الموظف',
            key: 'emp_name',
            render: (record) => <Typography>
                {record.first_name + " " + record.last_name}
            </Typography>
        },
        {
            title: 'القسم',
            dataIndex: 'current_department',
            key: 'department',
        },
        {
            title: 'التاريخ',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'مدة الإجازة',
            dataIndex: 'duration',
            key: 'duration',
            render: (len) => <Tag>{len}</Tag>
        },
        // {
        //     title: 'سبب الإجازة',
        //     dataIndex: 'description',
        //     key: 'description',
        //     width: '600px'
        // },
        {
            title: 'حالة الطلب',
            dataIndex: 'req_stat',
            key: 'req_stat',
            render: (req) => {
                let color = "";
                let status = "";

                if (req === 1) {
                    color = "purple";
                    status = "قيد الانتظار";
                } else if (req === 2) {
                    color = "green";
                    status = "مقبول";
                } else if (req === 3) {
                    color = "red";
                    status = "مرفوض";
                }

                return <Tag color={color}>{status}</Tag>
            },
            filters: filterValues,
            defaultFilteredValue: filterValue,
            filterMultiple: false,
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    (record.req_stat === 1 ?
                        <div id="actions">
                            <CheckOutlined
                                style={{ color: "green" }}
                                onClick={() => {
                                    dispatch(acceptVacationRequest({ id: record.vacation_req_id }));
                                }}
                            >
                                قبول
                            </CheckOutlined>

                            <CloseOutlined
                                style={{ color: "red" }}
                                onClick={() => {
                                    dispatch(rejectVacationRequest({ id: record.vacation_req_id }));
                                }}
                            >
                                رفض
                            </CloseOutlined>
                        </div>
                        : null)
                );
            },
            width: '10%'
        },
    ];

    const handleChange = (pagination, filters, sorter) => {
        if (!filters.req_stat) {
            setFilterValue([]);
        } else if (String(filters.req_stat[0]) !== filterValue[0]) {
            setFilterValue([String(filters.req_stat[0])]);
        }
    };


    return (
        <Spinner loading={loading}>
            <div>
                <Table
                    columns={columns}
                    dataSource={vacationsRequests}
                    rowKey='vacation_req_id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                    scroll={{ x: 'max-content' }}
                    onChange={handleChange}
                />
            </div>
        </Spinner>
    );
}

export default ViewVacationRequests;