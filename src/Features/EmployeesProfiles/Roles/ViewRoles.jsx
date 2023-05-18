import { Button, Form, Table, Tag } from "antd";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Spinner from "../../../Components/Spinner/Spinner";
import './ViewRoles.css';
import RoleModal from "./RoleModal";
import * as rolesActions from '../../../redux/roles/actions';

function ViewRoles(props) {

    // useEffect(() => {
    //     props.getDepartments();
    // }, []);

    const roles = [
        {
            id: 1,
            name: 'منسق قسم التدريب',
            description: 'يعمل منسق قسم التدريب على إدارة النشاط التدريبي داخل المركز',
            employees_count: 4,
            permissions: [1, 2],
            pers_name: ['إدارة الاقسام', 'إدارة طلبات التوظيف', 'إدارة الاقسام', 'إدارة طلبات التوظيف', 'إدارة الاقسام', 'إدارة طلبات التوظيف', 'إدارة الاقسام', 'إدارة طلبات التوظيف'],
        }
    ];

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const [openRoleModal, setOpenRoleModal] = useState(false);


    const deleteRole = () => {
        console.log('deleted: ', selectedRole);
        // props.deleteDepartment({
        //     id: selectedRole.dep_id,
        // });
        closeDeleteModal();
    }

    const createRole = (data) => {
        console.log('created: ', data);
        // props.createDepartment(data);
    }

    const updateRole = (data) => {
        console.log('updated: ', data);
        // if (data.name === selectedRole.name) {
        //     delete data.name;
        // }
        // if (data.description === selectedRole.description) {
        //     delete data.description;
        // }
        // if (Object.keys(data).length !== 0) {
        //     data.id = selectedRole.dep_id;
        //     props.updateDepartment(data);
        // }
    }

    const closeDeleteModal = () => {
        setSelectedRole(null);
        setOpenDeleteModal(false);
    }

    const closeRoleModal = () => {
        setSelectedRole(null);
        setOpenRoleModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        if (selectedRole) {
            updateRole(data);
        } else {
            createRole(data);
        }
        closeRoleModal();
    }

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
            width: '15%'
        },
        {
            title: 'الوصف',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'الموظفين',
            dataIndex: 'employees_count',
            key: 'count',
        },
        {
            title: 'الصلاحيات',
            key: 'pres',
            render: (record) => {
                return record.pers_name.map((i, key) => <Tag key={key}>{i}</Tag>);
            }
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedRole(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            setSelectedRole(record);
                            form.setFieldsValue({
                                name: record.name,
                                description: record.description,
                                permissions: record.permissions,
                            })
                            setOpenRoleModal(true);
                        }} />
                    </div>
                );
            },
        },
    ];

    return (
        <Spinner loading={false}>
            <div>
                <Table
                    columns={columns}
                    dataSource={roles}
                    rowKey='id'
                />
                <Button
                    className="roleButton"
                    onClick={() => setOpenRoleModal(true)}
                >
                    إضافة مسمى وظيفي
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteRole}
                    handleCancel={closeDeleteModal}
                />
                <RoleModal
                    open={openRoleModal}
                    handleCancel={closeRoleModal}
                    department={selectedRole}
                    form={form}
                    onFinish={onFinish}
                />
            </div>
        </Spinner>
    );
}

export default ViewRoles;