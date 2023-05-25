import { Button, Form, Table, Tag } from "antd";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import './ViewRoles.css';
import RoleModal from "./RoleModal";
import * as rolesActions from '../../redux/roles/actions';
import { connect } from "react-redux";

function ViewRoles(props) {

    useEffect(() => {
        props.getRoles();
    }, []);

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const [openRoleModal, setOpenRoleModal] = useState(false);


    const deleteRole = () => {
        console.log('deleted: ', selectedRole);
        props.deleteRole({
            id: selectedRole.job_title_id,
        });
        closeDeleteModal();
    }

    const createRole = (data) => {
        console.log('created: ', data);
        props.createRole(data);
    }

    const updateRole = (data) => {
        console.log('updated: ', data);
        let rolePermissions = [];
        rolePermissions = rolePermissions.concat(selectedRole.permissions.map(p => p.perm_id));

        if (data.name === selectedRole.name) {
            delete data.name;
        }
        if (data.description === selectedRole.description) {
            delete data.description;
        }
        if(!permissionsHasChanged(data.permissions_ids, rolePermissions)) {
            delete data.permissions_ids;
        }
        if (Object.keys(data).length !== 0) {
            console.log(data);
            data.id = selectedRole.job_title_id;
            props.updateRole(data);
        }
    }

    const permissionsHasChanged = (a, b) => {
        if (a === b) return false;
        if (a == null || b == null) return true;
        if (a.length !== b.length) return true;
      
        a.sort();
        b.sort();
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return true;
        }

        return false;
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
                return record.permissions.map(permission => <Tag key={permission.perm_id}>{permission.name}</Tag>);
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
                            console.log(record);
                            setSelectedRole(record);
                            let permissionsIDS = [];
                            permissionsIDS = permissionsIDS.concat(record.permissions.map(p => p.perm_id));
                            form.setFieldsValue({
                                name: record.name,
                                description: record.description,
                                permissions_ids: permissionsIDS,
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
                    dataSource={props.roles}
                    rowKey='job_title_id'
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
                    permissions={props.permissions}
                    getPermissions={props.getPermissions}
                />
            </div>
        </Spinner>
    );
}

const mapStateToProps = state => {
    return {
        roles: state.rolesReducer.roles,
        error: state.rolesReducer.error,
        loading: state.rolesReducer.loading,

        permissions: state.rolesReducer.permissions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRoles: (payload) => {
            dispatch(
                rolesActions.getRoles(payload)
            )
        },
        getPermissions: () => {
            dispatch(
                rolesActions.getPermissions()
            )
        },
        createRole: (payload) => {
            dispatch(
                rolesActions.createRole(payload)
            )
        },
        deleteRole: (payload) => {
            dispatch(
                rolesActions.deleteRole(payload)
            )
        },
        updateRole: (payload) => {
            dispatch(
                rolesActions.updateRole(payload)
            )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);