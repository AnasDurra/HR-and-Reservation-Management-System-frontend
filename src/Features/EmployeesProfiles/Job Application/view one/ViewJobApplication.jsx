import { useForm } from "antd/lib/form/Form";
import ViewEditJobApplicationForm from "../../Profile/view-edit one/components/ViewEditJobApplicationForm";
import VacancyCard from "../components/VacancyCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyJobApplications,
  getJobApplication,
  updateJobApplication,
} from "../../../../redux/Features/Employee Profile/Job application/slice";
import Spinner from "../../../../Components/Spinner/Spinner";
import {
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Modal,
  Select,
  Space,
  Tag,
} from "antd";

const colorMapping = {
  1: "#FFA500",
  2: "#008000",
  3: "#FF0000",
  4: "#808080",
};
const statusMapping = {
  1: "معلَق",
  2: "مقبول",
  3: "مرفوض",
  4: "مؤرشف",
};

const ViewJobApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const jobApplication = useSelector(
    (state) => state.jobApplicationsSlice.jobApplication
  );
  const jobApplicationsSlice = useSelector(
    (state) => state.jobApplicationsSlice
  );

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const onCancelEdit = () => {
    toggleEditMode();
    form.setFieldsValue(jobApplication?.employee_data);
  };
  const onSaveEdit = () => {
    dispatch(
      updateJobApplication({
        form: form.getFieldsValue(),
        id: searchParam.get("id"),
      })
    );
    if (!jobApplicationsSlice.error) {
      toggleEditMode();
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemoveField = (fieldName) => {
    const fields = form.getFieldsValue();
    delete fields[fieldName];
    form.resetFields();
    form.setFieldsValue(fields);
  };

  const deleteJobApplication = () => {
    dispatch(destroyJobApplications([jobApplication.job_application?.id]));
  };

  const updateStatus = (newStatus) => {
    dispatch(
      updateJobApplication({
        form: {
          job_application: {
            app_status_id: newStatus,
          },
        },
        id: searchParam.get("id"),
      })
    );
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(jobApplication?.employee_data);
   /*  if (isEditMode) {
      toggleEditMode();
    } */
  }, [jobApplication]);

  useEffect(() => {
    dispatch(getJobApplication(searchParam.get("id")));
  }, []);

  const items = [
    {
      label: <span onClick={toggleEditMode}>تعديل البيانات</span>,
      key: "0",
    },
    {
      label: <span onClick={showModal}>تعديل الشاغر</span>,
      key: "1",
    },
    {
      label: <span>تعديل حالة الطلب</span>,
      key: "2",
      children: [
        {
          key: "2-1",
          disabled: jobApplication?.application_status?.id === 1,
          label: (
            <span
              onClick={() => {
                updateStatus(1);
              }}
            >
              {" "}
              تعليق
            </span>
          ),
        },
        {
          key: "2-2",
          disabled: jobApplication?.application_status?.id === 2,

          label: (
            <span
              onClick={() => {
                updateStatus(2);
              }}
            >
              {" "}
              قبول
            </span>
          ),
        },
        {
          key: "2-3",
          disabled: jobApplication?.application_status?.id === 3,
          label: (
            <span
              onClick={() => {
                updateStatus(3);
              }}
            >
              {" "}
              رفض
            </span>
          ),
        },
        {
          key: "2-4",
          disabled: jobApplication?.application_status?.id === 4,
          label: (
            <span
              onClick={() => {
                updateStatus(4);
              }}
            >
              {" "}
              أرشفة
            </span>
          ),
        },
      ],
    },
    {
      label: <span onClick={deleteJobApplication}> حذف</span>,
      key: "3",
      danger: true,
    },
  ];

  return (
    <Spinner loading={jobApplicationsSlice.loading}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        {!isEditMode && (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              <Button type="link">
                تعديل
                <SettingOutlined />
              </Button>
            </Space>
          </Dropdown>
        )}

        <ViewEditJobApplicationForm
          editMode={isEditMode}
          form={form}
          handleRemoveField={handleRemoveField}
        />
        <div
          style={{
            width: "25%",
            height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {!isEditMode && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "start",
                }}
              >
                <h5 style={{ marginTop: 0, padding: 0 }}>حالة الطلب: </h5>
                <Tag
                  style={{ marginTop: "2%", padding: 0 }}
                  color={colorMapping[jobApplication?.application_status?.id]}
                >
                  {statusMapping[jobApplication?.application_status?.id]}
                </Tag>
              </div>
              <VacancyCard
                vacancyName={jobApplication?.job_application?.job_vacancy?.name}
                vacancyDescription={
                  jobApplication?.job_application?.job_vacancy?.description
                }
                department={
                  jobApplication?.job_application?.job_vacancy?.department_name
                }
                vacancyCount={
                  jobApplication?.job_application?.job_vacancy?.count
                }
              />
            </>
          )}
          {isEditMode && (
            <Space>
              <Button type="primary" onClick={onSaveEdit}>
                حفظ
              </Button>
              <Button
                type="ghost"
                style={{ color: "red" }}
                onClick={onCancelEdit}
              >
                الغاء
              </Button>
            </Space>
          )}
        </div>
      </div>

      <Modal
        title="تعديل الشاغر الوظيفي لطلب التوظيف"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
        maskClosable
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5%",
          }}
        >
          <Select size="large" placeholder="انقر لاختيار الشاغر الجديد">
            //TODO link the job vacancies
          </Select>
        </div>
      </Modal>
    </Spinner>
  );
};
export default ViewJobApplication;
