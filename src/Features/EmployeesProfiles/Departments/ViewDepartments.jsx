import { Button, Form, Table } from "antd";
import "./ViewDepartments.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import DepartmentModal from "./DepartmentModal";
import Spinner from "../../../Components/Spinner/Spinner";
import ServerSideSearchField from '../../../Components/ServerSideSearchField/ServerSideSearchField';
import {
  destroyDepartment,
  getDepartments,
  createDepartment,
  updateDepartment
} from "../../../redux/departments/slice";

function ViewDepartments(props) {
  const dispatch = useDispatch();
  const departmentsSlice = useSelector((state) => state.departmentsSlice);
  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const [form] = Form.useForm();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

  const deleteDepartment = () => {
    console.log("deleted: ", selectedDepartment);
    dispatch(
      destroyDepartment({
        id: selectedDepartment.dep_id,
      })
    );
    closeDeleteModal();
  };

  const create = (data) => {
    console.log("created: ", data);
    dispatch(createDepartment(data));
  };

  const update = (data) => {
    console.log("updated: ", data);
    if (data.name === selectedDepartment.name) {
      delete data.name;
    }
    if (data.description === selectedDepartment.description) {
      delete data.description;
    }
    if (Object.keys(data).length !== 0) {
      data.id = selectedDepartment.dep_id;
      dispatch(updateDepartment(data));
    }
  };

  const closeDeleteModal = () => {
    setSelectedDepartment(null);
    setOpenDeleteModal(false);
  };

  const closeDepartmentModal = () => {
    setSelectedDepartment(null);
    setOpenDepartmentModal(false);
    form.resetFields();
  };

  const onFinish = (data) => {
    if (selectedDepartment) {
      update(data);
    } else {
      create(data);
    }
    closeDepartmentModal();
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الوصف",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
    {
      title: "عدد الموظفين",
      dataIndex: "employees_count",
      key: "count",
    },
    {
      title: "العمليات",
      key: "actions",
      render: (record) => {
        return (
          <div id="actions">
            <DeleteOutlined
              onClick={() => {
                setSelectedDepartment(record);
                setOpenDeleteModal(true);
              }}
            />
            <EditOutlined
              onClick={() => {
                setSelectedDepartment(record);
                form.setFieldsValue({
                  name: record.name,
                  description: record.description,
                });
                setOpenDepartmentModal(true);
              }}
            />
          </div>
        );
      },
      width: "10%",
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const handleReset = () => {
      setSearchValue("");
      dispatch(getDepartments());
  }

  const handleSearch = () => {
      dispatch(getDepartments({ name: searchValue }));
  }

  return (
    <Spinner loading={departmentsSlice?.loading}>
      <div>
        <ServerSideSearchField
          handleReset={handleReset}
          handleSearch={handleSearch}
          placeholder="البحث عن قسم"
          resetBtnText="إعادة"
          searchBtnText="البحث"
          searchValue={searchValue}
          setSearchValue={setSearchValue} 
        />
        <Table
          columns={columns}
          dataSource={departmentsSlice?.departments}
          rowKey="dep_id"
          scroll={{ x: 'max-content' }}
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

export default ViewDepartments;
