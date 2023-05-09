import { Button, Form, Table } from "antd";
import './ViewDepartments.css';
import * as departmentsActions from '../../../redux/departments/actions';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import DepartmentModal from "./DepartmentModal";

function ViewDepartments(props) {

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

    useEffect(() => {
        // props.getDepartments();
    }, []);

    const deleteDepartment = () => {
        console.log('deleted: ', selectedDepartment);
    }

    const createDepartment = (data) => {
        console.log('created: ', data);
    }

    const updateDepartment = (data) => {
        console.log('updated: ', data);
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
    }

    const columns = [
        {
            title: 'القسم',
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

    const data = [
        {
            id: 1,
            name: 'التدريب',
            description: 'قسم التدريب الخاص بالمركز',
            employees_count: 10
        },
        {
            id: 2,
            name: 'الإعلامي',
            description: 'قسم التدريب الخاص بالمركز',
            employees_count: 10
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey='id'
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDepartments);