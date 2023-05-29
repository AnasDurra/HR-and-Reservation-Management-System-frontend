import { Button, Form, Table } from "antd";
import './ViewJobVacancies.css';
import * as jobVacanciesActions from '../../../redux/jobVacancies/actions';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import JobVacancyModal from "./JobVacancyModal";
import Spinner from "../../../Components/Spinner/Spinner";

function ViewJobVacancies(props) {
    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedJobVacancy, setSelectedJobVacancy] = useState(null);

    const [openJobVacancyModal, setOpenJobVacancyModal] = useState(false);

    //the data must have the department id


    useEffect(() => {
        props.getJobVacancies();
    }, []);

    const deleteJobVacancy = () => {
        console.log('deleted: ', selectedJobVacancy);
        props.deleteJobVacancy({
            id: selectedJobVacancy.id,
        });
        closeDeleteModal();
    }

    const createJobVacancy = (data) => {
        console.log('created: ', data);
        props.createJobVacancy(data);
    }

    const updateJobVacancy = (data) => {
        console.log('updated: ', data);
        data.id = selectedJobVacancy.id;
        props.updateJobVacancy(data);
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
            updateJobVacancy(data);
        } else {
            createJobVacancy(data);
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
            dataIndex: 'employees_count',
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
                            console.log(record);
                            form.setFieldsValue({
                                name: record.name,
                                department_id: record.department_id,
                                employees_count: record.employees_count,
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

    return (
        <Spinner loading={props.loading}>
            <div>
                <Table
                    columns={columns}
                    dataSource={props.jobVacancies}
                    rowKey='id'
                />
                <Button
                    className="jobVacanciesButton"
                    onClick={() => setOpenJobVacancyModal(true)}
                >
                    إضافة شاغر وظيفي
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteJobVacancy}
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

const mapStateToProps = state => {
    return {
        jobVacancies: state.jobVacanciesReducer.jobVacancies,
        error: state.jobVacanciesReducer.error,
        loading: state.jobVacanciesReducer.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getJobVacancies: (payload) => {
            dispatch(
                jobVacanciesActions.getJobVacancies(payload)
            )
        },
        createJobVacancy: (payload) => {
            dispatch(
                jobVacanciesActions.createJobVacancy(payload)
            )
        },
        deleteJobVacancy: (payload) => {
            dispatch(
                jobVacanciesActions.deleteJobVacancy(payload)
            )
        },
        updateJobVacancy: (payload) => {
            dispatch(
                jobVacanciesActions.updateJobVacancy(payload)
            )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewJobVacancies);