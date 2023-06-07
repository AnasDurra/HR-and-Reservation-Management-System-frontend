import { Button, Form, Table, Tag } from "antd";
import './ViewBiometricDevices.css';
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import Spinner from "../../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getDevices, createDevice, deleteDevice, updateDevice } from "../../../redux/biometricDevices/reducer";
import BioMetricDeviceModal from "./BioMetricDeviceModal";

function ViewBiometricDevices() {

    const devices = useSelector(state => state.biometricDevicesReducer.devices);
    const loading = useSelector(state => state.biometricDevicesReducer.loading);
    const error = useSelector(state => state.biometricDevicesReducer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDevices());
    }, [dispatch]);

    const [form] = Form.useForm();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const [openDeviceModal, setOpenDeviceModal] = useState(false);


    const deleteDeviceFunction = () => {
        console.log('deleted: ', selectedDevice);
        dispatch(deleteDevice({
            id: selectedDevice.id,
        }));
        closeDeleteModal();
    }

    const createDeviceFunction = (data) => {
        console.log('created: ', data);
        dispatch(createDevice(data));
    }

    const updateDeviceFunction = (data) => {
        console.log('updated: ', data);

        console.log(data);
        if (data.name === selectedDevice.name) {
            delete data.name;
        }
        if (data.ip === selectedDevice.ip) {
            delete data.ip;
        }
        if (Object.keys(data).length !== 0) {
            data.id = selectedDevice.id;
            dispatch(updateDevice(data));
        }
    }

    const closeDeleteModal = () => {
        setSelectedDevice(null);
        setOpenDeleteModal(false);
    }

    const closeDeviceModal = () => {
        setSelectedDevice(null);
        setOpenDeviceModal(false);
        form.resetFields();
    }

    const onFinish = (data) => {
        if (selectedDevice) {
            updateDeviceFunction(data);
        } else {
            createDeviceFunction(data);
        }
        closeDeviceModal();
    }

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'عنوان الـ ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'الرقم التسلسلي',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedDevice(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            setSelectedDevice(record);
                            form.setFieldsValue({
                                name: record.name,
                                ip: record.ip,
                            })
                            setOpenDeviceModal(true);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    return (
        <Spinner loading={loading}>
            <div>
                <Table
                    columns={columns}
                    dataSource={devices}
                    rowKey='id'
                />
                <Button
                    className="bioButton"
                    onClick={() => setOpenDeviceModal(true)}
                >
                    إضافة جهاز
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteDeviceFunction}
                    handleCancel={closeDeleteModal}
                />

                <BioMetricDeviceModal 
                    open={openDeviceModal}
                    handleCancel={closeDeviceModal}
                    device={selectedDevice}
                    form={form}
                    onFinish={onFinish}
                />
            </div>
        </Spinner>
    );
}

export default ViewBiometricDevices;