import { Button, Form, Table, Tag } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import './Vacations.css';
import dayjs from "dayjs";
import AddVacationModal from "./AddVacationModal";
import { getAllVacations, addVacation, deleteVacation } from "../../../redux/vacations/reducer";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";

function EmployeesVacations() {

    const dispatch = useDispatch();
    const allVacations = useSelector(state => state.vacationsReducer.allVacations);
    const metaData = useSelector(state => state.vacationsReducer.metaData);
    const loading = useSelector(state => state.vacationsReducer.loading);
    const error = useSelector(state => state.vacationsReducer.error);

    const [form] = Form.useForm();
    const [openAddVacationModalModal, setOpenAddVacationModalModal] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getAllVacations());
    }, []);

    const closeAddVacationModal = () => {
        setOpenAddVacationModalModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        data.start_date = dayjs(data.start_date.$d).format('YYYY-MM-DD');

        dispatch(addVacation(data));
        closeAddVacationModal();
    }

    const handlePageChange = (page) => {
        dispatch(getAllVacations({
            page: page,
        }));
    }

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false);
        setSelectedVacation(null);
    }

    const deleteVacationFunction = () => {
        console.log(selectedVacation.employee_vacation_id);
        dispatch(deleteVacation({
            id: selectedVacation.employee_vacation_id
        }));
        setOpenDeleteModal(false);
        setSelectedVacation(null);
    }

    const columns = [
        {
            title: 'المعرف الشخصي',
            dataIndex: 'emp_id',
            key: 'emp_id',
        },
        {
            title: 'اسم الموظف',
            dataIndex: ['employee', 'full_name'],
            key: 'emp_name',
        },
        {
            title: 'التاريخ',
            dataIndex: 'start_date',
            key: 'date',
        },
        {
            title: 'مدة الإجازة',
            dataIndex: 'total_days',
            key: 'total_days',
            render: (days) => {
                return (
                    <Tag>
                        {days}
                    </Tag>
                );
            }
        },
        {
            title: 'الأيام المتبقية',
            key: 'remaining_days',
            dataIndex: 'remaining_days',
            render: (days) => {
                return (
                    <Tag color={days === 0 ? "red" : "purple"}>
                        {days === 0 ? 'منتهية' : days}
                    </Tag>
                );
            }
        },
        {
            title: 'حذف',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        {record.remaining_days === record.total_days ?
                            <DeleteOutlined onClick={() => {
                                setSelectedVacation(record);
                                setOpenDeleteModal(true);
                            }} />
                            : <Tag color="red">لا يمكن الحذف</Tag>}
                    </div>
                );
            },
            width: '10%'
        },
    ];

    return (
        <Spinner loading={loading}>
            <div>
                <div className="employeesVacationsActionButtons">
                    <Button
                        onClick={() => {
                            form.setFieldsValue({
                                attendance_date: dayjs(),
                                attendance_time: dayjs().second(0),
                            });
                            setOpenAddVacationModalModal(true);
                        }}
                    >
                        تسجيل إجازة
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={allVacations}
                    rowKey='employee_vacation_id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                    scroll={{ x: 'max-content' }}
                />

                <AddVacationModal
                    form={form}
                    handleCancel={closeAddVacationModal}
                    open={openAddVacationModalModal}
                    onFinish={onFinish}
                />

                <DeleteModal
                    open={openDeleteModal}
                    handleCancel={handleDeleteCancel}
                    handleOk={deleteVacationFunction}
                />

            </div>
        </Spinner>
    );
}

export default EmployeesVacations;