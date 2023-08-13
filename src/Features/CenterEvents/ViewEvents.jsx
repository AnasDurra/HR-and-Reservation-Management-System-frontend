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
        // dispatch(getEvents());
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

    const data = [
        {
            id: 1,
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQERIREhIVERARDxUQERcVEBMSEBASFhcXFhYVExMYICghGhooGxoYITEiJykrLjouGiAzODQsOCgtLisBCgoKDg0OGxAQGy8lHyYvNSstLS0wLi0tLS0tLzctLS0tLS0uKy0tLS0tLTUtLS0tLS0tLS0tLS0tMi0vLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUCBAYBB//EAEkQAAICAQMBBQMHBgkMAwAAAAECAAMRBBIhMQUTIkFRBmFxFCMyQlKBkRYzYnKhohWDkrGys8HC0jREVGOChJOkw9Hh8CQ1Q//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EAB0RAQEBAAICAwAAAAAAAAAAAAARASFBMWECElH/2gAMAwEAAhEDEQA/APuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBESDTXMxfKFNrlVyR4wPrDHlA81zEISDjlQSOoUsAxHwGZHUmywKpbaa2ZgWZsEFQDlicZy34TO3UVNmsupLAoV3jJzwRj1kGmfu8tcyq7YQZYDcqZGR8SWb4ETParCJhXaGGVIYeoIIP3yPR3M6BmQ1sc5ViCRzjnH4zSJ4iICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIga1tjF9iEDChmJGeCSAAMj0PPu9/GtqbHBSuwjbY+Ny5XIAJ2EZ4JIA6889OJPqTsYWfV27LPcM5VvgCTn3NnymPaaAqpPKq43fqsChOfLG7dn3TOrie1UWs5A7tVORgbdoHPHwmp2VWVLB/zmFbJOSK2+iuT9kgj34z1JnruWrCN9PvVqf9LDAk496c/fJreLaz9pXT4nhh+xW/GBFrWFboyjx2NsK5x3nBwT8Djn0J9wmdr2opclSFG5lCkeEcna2euPdz7pAnzlqt72Ye6pQVH8pju+AHpNjWHf8yOrjx/o1+efjyB958jCtsRAiaZIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiDARNahre7BdU73z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IwADhiSQBt9DkjB9SJz4PnkDzyBkDocqPMcBgPRaB9aSN7P6s/55UeMHOifceCOvf9fE5+Lk+mM19ndQfpawA5zmvSohHJPG9mA5wf8AYT7Ig4ztF2Xb3OqUDhdSprdQc4tqUlGHr82j1k+fc1nzm92rrLKbge8IqNTOQVXYGD1VgFsZA8ZJ5HTqADJOy/Z+uh+9LPdcF2K9hXKKdoIrRQFXIVQSBkhQCTgS3hN3K5dvaCy1MIorf5Otp8WXQlUbgY58RK46+E+s2B21aGI7reqk55PeNmzUIAgC4P5pf5X3m4+Rpv7zb4+oOSQDjbkDoDt4z1xJUcHOCDg4ODnB9DBcVA7ZI03fsEA3quQ+5ArOqbiR6buR7prflDYBlqgCEUuA+e73JU28noahvYbs/UPv23mrFZX5wgLkHJcpgjkYYEYmOmepQtaMgAUBVDDhccYHpiE4/Gn2b2m1thrZQp7pbBtcOpzjPiHTk8ZxkDIzztrdH23ctdKuoZ2SrxM20MWr3eLIADkg8D/xOmM8RwwyCCPUHIgqlp7YsL1o1ajvHcDx4yqPs4yBlvrYHl+Ml9ptU1dG1G2Pc60K/Tug2d9nxVA7AeZAHnLaa3aOgr1FZrtXchIPUqyspDKysOVYEAgjkEQZuVzlVYRVVV2KihVUDJrVOAoHmV2Y/Wp/1nNj2O6q5BwCRheeByBtX90Z+z3XmZAfZl1/N6y0DyFldNm3gAYYKrcbUOSScqJE3s7qvLVU49Dom6eIY4uHGDj4BfsjBrje1h7X/wCR3Z/N4XvvTuN699n3d3vlsuMcdPL0xOeXsLV9G1iEHqBpCA2SCQQbSMHnI/Tb3Y017J7Q0wWurUG7TquFVUpS+vnhR3gKuoGAMspAA+l1gmTy6+JW9hNqDW3ykAP3h2fRDmvAwbAhKhs7vonGMe8SylYIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICQ26YMckv8A7KP3SJNEDQ1WmsCMK3JypADHJ6cbX6g+85kOmc7srXhtmxVCsiKM5y7so+4AevXMtYki1pmnYrWN47AhOSOmBnCj6o9345kOi0qjdUQGXCWHI+s2dx+JK7viTLEiRabTLWDjPOOpJOAMAZPkBEK1dTWwVkOXrI4bG909zr1dfhzjr6yPSrYzuVC1KQoJCsdzDPKqwXBxjkg+XXEtIiFa3yIeb2E+vesP3Qdv7JsAT2JUIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIH/2Q==",
            name: "اخلاقيات المهنة",
            address: "شارع بغداد",
            date: "2023-09-01",
            end_date: "2023-09-01",
            decsription: "جلسة بإشراف مجموعة من الاساتذة للتحدث عن اخلاقيات المهنة",
            link: "https://www.google.com",
        }
    ];

    const columns = [
        {
            title: 'الصورة',
            dataIndex: 'image',
            key: 'image',
            render: (image) =>
                <PhotoProvider>
                    {/* <PhotoView src={IMAGE_URL.concat(image)} >
                        <img src={IMAGE_URL.concat(image)} width='80px' />
                    </PhotoView> */}
                    <PhotoView src={image} >
                        <img src={image} width='80px' />
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
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'العنوان',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'تاريخ الفعاليّة',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'تاريخ الانتهاء',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'الوصف',
            dataIndex: 'decsription',
            key: 'decsription',
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
        console.log(searchValue);
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
                    dataSource={data}
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