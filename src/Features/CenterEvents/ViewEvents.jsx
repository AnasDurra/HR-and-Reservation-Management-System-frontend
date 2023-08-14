import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, deleteEvent } from "../../redux/centerEvents/reducer";
import './CenterEvents.css';
import { useNavigate } from "react-router-dom";
import ServerSideSearchField from "../../Components/ServerSideSearchField/ServerSideSearchField";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { IMAGE_URL } from "../../redux/utils/constants";

function ViewEvents() {

    const events = useSelector(state => state.eventsReducer.events);
    const loading = useSelector(state => state.eventsReducer.loading);
    const error = useSelector(state => state.eventsReducer.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const deleteEventFunction = () => {
        console.log('deleted: ', selectedEvent);
        dispatch(deleteEvent({
            id: selectedEvent.id,
        }));
        closeDeleteModal();
    }

    const closeDeleteModal = () => {
        setSelectedEvent(null);
        setOpenDeleteModal(false);
    }

    const columns = [
        {
            title: 'الصورة',
            dataIndex: 'image',
            key: 'image',
            render: (image) =>
                <PhotoProvider>
                    <PhotoView src={IMAGE_URL.concat(image)} >
                        <img src={IMAGE_URL.concat(image)} width='80px' />
                    </PhotoView>
                </PhotoProvider>
        },
        {
            title: 'رقم الفعاليّة',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'اسم الفعاليّة',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'العنوان',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'تاريخ الفعاليّة',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'تاريخ الانتهاء',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'الوصف',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'الرابط',
            dataIndex: 'link',
            key: 'link',
            render: (link) => <Button type="link" href={link} target="_blank">الرابط الخارجي</Button>
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedEvent(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            navigate(`update/${record.id}`);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const handleReset = () => {
        setSearchValue("");
        dispatch(getEvents());
    }

    const handleSearch = () => {
        dispatch(getEvents({ name: searchValue }));
    }

    return (
        <Spinner loading={loading}>
            <div>
                <ServerSideSearchField
                    handleReset={handleReset}
                    handleSearch={handleSearch}
                    placeholder="البحث عن فعاليّة"
                    resetBtnText="إعادة"
                    searchBtnText="البحث"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Table
                    columns={columns}
                    dataSource={events}
                    rowKey='id'
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
                />
                <Button
                    className="centerEventsButton"
                    onClick={() => navigate("/events/add")}
                >
                    إضافة فعاليّة
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteEventFunction}
                    handleCancel={closeDeleteModal}
                />
            </div>
        </Spinner>
    );
}

export default ViewEvents;