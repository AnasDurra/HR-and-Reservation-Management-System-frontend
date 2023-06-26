import { Table, Tag, Typography } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { getEmployeesAbsences, updateEmployeeAbsenceStatus } from "../../../redux/absences/reducer";
import ServerSideSearchField from "../../../Components/ServerSideSearchField/ServerSideSearchField";

function EmployeesAbsences() {

    const dispatch = useDispatch();
    const absences = useSelector(state => state.employeesAbsencesReducer.absences);
    const metaData = useSelector(state => state.employeesAbsencesReducer.metaData);
    const loading = useSelector(state => state.employeesAbsencesReducer.loading);
    const error = useSelector(state => state.employeesAbsencesReducer.error);

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(getEmployeesAbsences());
    }, []);

    const handlePageChange = (page) => {
        dispatch(getEmployeesAbsences({
            page: page,
            name: searchValue
        }));
    }

    const columns = [
        {
            title: 'المعرف الشخصي',
            dataIndex: 'emp_id',
            key: 'emp_id',
        },
        {
            title: 'اسم الموظف',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'التاريخ',
            dataIndex: 'absence_date',
            key: 'absence_date',
        },
        {
            title: 'القسم',
            dataIndex: 'cur_dep',
            key: 'cur_dep',
        },
        {
            title: 'المسمّى الوظيفي',
            dataIndex: 'cur_title',
            key: 'cur_title',
        },
        {
            title: 'الحالة',
            key: 'absence_status',
            render: (record) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Typography>{record.absence_status === 1 ? 'مبرر' : 'غير مبرر'}</Typography>
                        <SwapOutlined
                            onClick={() => {
                                dispatch(updateEmployeeAbsenceStatus({
                                    id: record.absence_id,
                                    status: record.absence_status === 1 ? 2 : 1,
                                }));
                            }}
                        />
                    </div>
                );
            }
        },
    ];

    const handleSearch = () => {
        dispatch(getEmployeesAbsences({ name: searchValue }));
    }

    const handleReset = () => {
        setSearchValue("");
        dispatch(getEmployeesAbsences());
    }

    return (
        <Spinner loading={loading}>
            <div>
                <ServerSideSearchField
                    placeholder='البحث عن غيابات موظف'
                    searchBtnText='البحث'
                    resetBtnText='إعادة'
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleReset={handleReset}
                    handleSearch={handleSearch}
                />
                <Table
                    columns={columns}
                    dataSource={absences}
                    rowKey='absence_id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </Spinner>
    );
}

export default EmployeesAbsences;