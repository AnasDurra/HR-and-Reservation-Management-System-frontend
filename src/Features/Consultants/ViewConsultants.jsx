import { Button, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { deleteConsultant, getConsultants } from "../../redux/consultants/reducer";
import './Consultants.css';
import { useNavigate } from "react-router-dom";
import ServerSideSearchField from "../../Components/ServerSideSearchField/ServerSideSearchField";

function ViewConsultants() {

    const consultants = useSelector(state => state.consultantsReducer.consultants);
    const loading = useSelector(state => state.consultantsReducer.loading);
    const error = useSelector(state => state.consultantsReducer.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getConsultants());
    }, [dispatch]);

    console.log(consultants);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState(null);

    const deleteConsultantFunction = () => {
        console.log('deleted: ', selectedConsultant);
        dispatch(deleteConsultant({
            id: selectedConsultant.id,
        }));
        closeDeleteModal();
    }

    const closeDeleteModal = () => {
        setSelectedConsultant(null);
        setOpenDeleteModal(false);
    }

    const columns = [
        {
            title: 'المعرّف الشخصي',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'الاسم',
            key: 'name',
            render: (consultant) => <Typography>
                {consultant.first_name + " " + consultant.last_name}
            </Typography>
        },
        {
            title: 'رقم الهاتف',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'البريد الألكتروني',
            dataIndex: 'user_email',
            key: 'email',
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <DeleteOutlined onClick={() => {
                            setSelectedConsultant(record);
                            setOpenDeleteModal(true);
                        }} />
                        <EditOutlined onClick={() => {
                            navigate(`update/${record.id}`);
                        }} />
                        <EyeOutlined onClick={() => {
                            navigate(`view/${record.id}`);
                        }} />
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const [searchValue, setSearchValue] = useState("");

    const handleReset = () => {
        setSearchValue("");
        dispatch(getConsultants());
    }

    const handleSearch = () => {
        console.log(searchValue);
        dispatch(getConsultants({ name: searchValue }));
    }

    return (
        <Spinner loading={loading}>
            <div>
                <ServerSideSearchField
                    placeholder="البحث عن الاستشاري"
                    searchBtnText="البحث"
                    resetBtnText="إعادة"
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    handleReset={handleReset}
                    handleSearch={handleSearch}
                />
                <Table
                    columns={columns}
                    dataSource={consultants}
                    rowKey='id'
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
                />
                <Button
                    className="consultantsButton"
                    onClick={() => navigate("/consultants/add")}
                >
                    إضافة استشاري
                </Button>
                <DeleteModal
                    open={openDeleteModal}
                    handleOk={deleteConsultantFunction}
                    handleCancel={closeDeleteModal}
                />
            </div>
        </Spinner>
    );
}

export default ViewConsultants;