import { Button, Form, Table, Tag } from "antd";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import "./ViewRoles.css";
import RoleModal from "./RoleModal";
import {
  createRole,
  destroyRole,
  getPermissions,
  getRoles,
  updateRole,
} from "../../redux/roles/slice";
import { useDispatch, useSelector } from "react-redux";

function ViewRoles() {

  const [form] = Form.useForm();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();

  const [openRoleModal, setOpenRoleModal] = useState(false);
  const rolesSlice = useSelector((state) => state.rolesSlice);

  const roles = useSelector((state) => state.rolesSlice.roles);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getPermissions());
  }, [dispatch]);


  const deleteRole = () => {
    console.log("deleted: ", selectedRole);
    dispatch(
      destroyRole({
        id: selectedRole.job_title_id,
      })
    );
    closeDeleteModal();
  };

  const create = (data) => {
    console.log("created: ", data);
    dispatch(createRole(data));
  };

  const update = (data) => {
    console.log("updated: ", data);
    let rolePermissions = [];
    rolePermissions = rolePermissions.concat(
      selectedRole.permissions.map((p) => p.perm_id)
    );

    if (data.name === selectedRole.name) {
      delete data.name;
    }
    if (data.description === selectedRole.description) {
      delete data.description;
    }
    if (!permissionsHasChanged(data.permissions_ids, rolePermissions)) {
      delete data.permissions_ids;
    }
    if (Object.keys(data).length !== 0) {
      data.id = selectedRole.job_title_id;
      dispatch(updateRole(data));
    }
  };

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
  };

  const closeDeleteModal = () => {
    setSelectedRole(null);
    setOpenDeleteModal(false);
  };

  const closeRoleModal = () => {
    setSelectedRole(null);
    setOpenRoleModal(false);
    form.resetFields();
  };

  const onFinish = (data) => {
    if (selectedRole) {
      update(data);
    } else {
      create(data);
    }
    closeRoleModal();
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "الوصف",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "الموظفين",
      dataIndex: "employees_count",
      key: "count",
    },
    {
      title: "الصلاحيات",
      key: "pres",
      render: (record) => {
        return record.permissions.map((permission) => (
          <Tag key={permission.perm_id}>{permission.name}</Tag>
        ));
      },
    },
    {
      title: "العمليات",
      key: "actions",
      render: (record) => {
        return (
          <div id="actions">
            <DeleteOutlined
              onClick={() => {
                setSelectedRole(record);
                setOpenDeleteModal(true);
              }}
            />
            <EditOutlined
              onClick={() => {
                setSelectedRole(record);
                let permissionsIDS = [];
                permissionsIDS = permissionsIDS.concat(
                  record.permissions.map((p) => p.perm_id)
                );
                form.setFieldsValue({
                  name: record.name,
                  description: record.description,
                  permissions_ids: permissionsIDS,
                });
                setOpenRoleModal(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Spinner loading={rolesSlice.loading}>
      <div>
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="job_title_id"
        />
        <Button className="roleButton" onClick={() => setOpenRoleModal(true)}>
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
          permissions={rolesSlice.permissions}
          getPermissions={getPermissions}
        />
      </div>
    </Spinner>
  );
}

export default ViewRoles;
