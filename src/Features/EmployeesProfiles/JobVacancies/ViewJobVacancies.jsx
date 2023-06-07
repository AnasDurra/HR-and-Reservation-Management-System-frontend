import { Button, Form, Table } from "antd";
import './ViewJobVacancies.css';
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import JobVacancyModal from "./JobVacancyModal";
import Spinner from "../../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addJobVacancy, getJobVacancies, updateJobVacancy, deleteJobVacancy } from "../../../redux/jobVacancies/reducer";

function ViewJobVacancies() {

    const jobVacancies = useSelector(state => state.jobVacanciesReducer.jobVacancies);
    const loading = useSelector(state => state.jobVacanciesReducer.loading);
    const metaData = useSelector(state => state.jobVacanciesReducer.metaData);
    const error = useSelector(state => state.jobVacanciesReducer.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getJobVacancies());
    }, [dispatch]);


    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedJobVacancy, setSelectedJobVacancy] = useState(null);

    const [openJobVacancyModal, setOpenJobVacancyModal] = useState(false);

    const deleteJobVacancyFunction = () => {
        console.log('deleted: ', selectedJobVacancy);
        dispatch(deleteJobVacancy({
            id: selectedJobVacancy.id,
        }));
        closeDeleteModal();
    }

    const createJobVacancyFunction = (data) => {
        console.log('created: ', data);
        dispatch(addJobVacancy(data));
    }

    const updateJobVacancyFunction = (data) => {
        console.log('updated: ', data);
        data.id = selectedJobVacancy.id;
        dispatch(updateJobVacancy(data));
    }

    const closeDeleteModal = () => {
        setSelectedJobVacancy(null);
        setOpenDeleteModal(false);
    }

    const closeJobVacancyModal = () => {
        setSelectedJobVacancy(null);
        setOpenJobVacancyModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        if (selectedJobVacancy) {
            updateJobVacancyFunction(data);
        } else {
            createJobVacancyFunction(data);
        }
        closeJobVacancyModal();
    }

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'الوصف',
            dataIndex: 'description',
            key: 'description',
            width: '40%'
        },
        {
            title: 'عدد الموظفين',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'القسم',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedJobVacancy(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            setSelectedJobVacancy(record);
                            form.setFieldsValue({
                                name: record.name,
                                department_id: record.department_id,
                                employees_count: record.count,
                                description: record.description
                            })
                            setOpenJobVacancyModal(true);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const handlePageChange = (page) => {
        dispatch(getJobVacancies(page));
    }

    return (
        <Spinner loading={loading}>
            <div>
                <Table
                    columns={columns}
                    dataSource={jobVacancies}
                    rowKey='id'
                    pagination={{
                        current: metaData?.current_page,
                        pageSize: metaData?.per_page,
                        total: metaData?.total,
                        onChange: handlePageChange,
                    }}
                />
                <Button
                    className="jobVacanciesButton"
                    onClick={() => setOpenJobVacancyModal(true)}
                >
                    إضافة شاغر وظيفي
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteJobVacancyFunction}
                    handleCancel={closeDeleteModal}
                />
                <JobVacancyModal
                    open={openJobVacancyModal}
                    handleCancel={closeJobVacancyModal}
                    jobVacancy={selectedJobVacancy}
                    form={form}
                    onFinish={onFinish}
                />
            </div>
        </Spinner>
    );
}

export default ViewJobVacancies;