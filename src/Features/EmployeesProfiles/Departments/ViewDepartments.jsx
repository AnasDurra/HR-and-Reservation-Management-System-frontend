import { Button, Form, Table } from "antd";
import './ViewDepartments.css';
import * as departmentsActions from '../../../redux/departments/actions';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import DepartmentModal from "./DepartmentModal";
import Spinner from "../../../Components/Spinner/Spinner";

function ViewDepartments(props) {

    useEffect(() => {
        props.getDepartments();
    }, []);

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false);


    const deleteDepartment = () => {
        console.log('deleted: ', selectedDepartment);
        props.deleteDepartment({
            id: selectedDepartment.dep_id,
        });
        closeDeleteModal();
    }

    const createDepartment = (data) => {
        console.log('created: ', data);
        props.createDepartment(data);
    }

    const updateDepartment = (data) => {
        console.log('updated: ', data);
        if (data.name === selectedDepartment.name) {
            delete data.name;
        }
        if (data.description === selectedDepartment.description) {
            delete data.description;
        }
        if (Object.keys(data).length !== 0) {
            data.id = selectedDepartment.dep_id;
            props.updateDepartment(data);
        }
    }

    const closeDeleteModal = () => {
        setSelectedDepartment(null);
        setOpenDeleteModal(false);
    }

    const closeDepartmentModal = () => {
        setSelectedDepartment(null);
        setOpenDepartmentModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        if (selectedDepartment) {
            updateDepartment(data);
        } else {
            createDepartment(data);
        }
        closeDepartmentModal();
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
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedDepartment(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            setSelectedDepartment(record);
                            form.setFieldsValue({
                                name: record.name,
                                description: record.description
                            })
                            setOpenDepartmentModal(true);
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
                    dataSource={props.departments}
                    rowKey='dep_id'
                />
                <Button
                    className="departmentButton"
                    onClick={() => setOpenDepartmentModal(true)}
                >
                    إضافة قسم
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteDepartment}
                    handleCancel={closeDeleteModal}
                />
                <DepartmentModal
                    open={openDepartmentModal}
                    handleCancel={closeDepartmentModal}
                    department={selectedDepartment}
                    form={form}
                    onFinish={onFinish}
                />
            </div>
        </Spinner>
    );
}

const mapStateToProps = state => {
    return {
        departments: state.departmentsReducer.departments,
        error: state.departmentsReducer.error,
        loading: state.departmentsReducer.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDepartments: (payload) => {
            dispatch(
                departmentsActions.getDepartments(payload)
            )
        },
        deleteDepartment: (payload) => {
            dispatch(
                departmentsActions.deleteDepartment(payload)
            )
        },
        updateDepartment: (payload) => {
            dispatch(
                departmentsActions.updateDepartment(payload)
            )
        },
        createDepartment: (payload) => {
            dispatch(
                departmentsActions.createDepartment(payload)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDepartments);