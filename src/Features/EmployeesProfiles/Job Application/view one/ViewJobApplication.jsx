import { useForm } from "antd/lib/form/Form";
import ViewEditJobApplicationForm from "../../Profile/view-edit one/components/forms/ViewEditJobApplicationForm";
import VacancyCard from "../components/VacancyCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyJobApplications,
  getJobApplication,
  updateJobApplication,
} from "../../../../redux/Features/Employee Profile/Job application/slice";
import Spinner from "../../../../Components/Spinner/Spinner";
import { ExclamationCircleFilled, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tag,
  message,
} from "antd";
import CreateProfileDrawer from "../components/CreateProfileDrawer";
import { getJobVacancies } from "../../../../redux/jobVacancies/reducer";
import confirm from "antd/es/modal/confirm";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [form] = useForm();
  const jobApplication = useSelector(
    (state) => state.jobApplicationsSlice.jobApplication
  );
  const jobApplicationsSlice = useSelector(
    (state) => state.jobApplicationsSlice
  );
  const jobVacanciesSlice = useSelector((state) => state.jobVacanciesReducer);

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
    dispatch(getJobVacancies());
    setIsModalOpen(true);
  };
  const handleModalOk = () => {
    if (selectedVacancy === null) {
      message.warning("الرجاء اختيار الشاغر الوظيفي");
    } else {
      dispatch(
        updateJobApplication({
          form: {
            job_application: {
              job_vacancy_id: selectedVacancy,
            },
          },
          id: searchParam.get("id"),
        })
      );
      setSelectedVacancy(null);
      setIsModalOpen(false);
    }
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
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

  const showDeleteConfirm = () => {
    console.log("hi");
    console.log(jobApplication?.employee_data?.personal_data?.full_name);
    Modal.confirm({
      title: "حذف طلب توظيف",
      icon: <ExclamationCircleFilled />,
      content: `هل أنت متأكد من رغبتك بحذف طلب توظيف ${jobApplication?.employee_data?.personal_data?.full_name}`,
      okText: "نعم",
      okType: "danger",
      cancelText: "لا",
      onOk() {
        deleteJobApplication();
        navigate(-1);
      },
      onCancel() {},
    });
  };
  useEffect(() => {
    dispatch(getJobApplication(searchParam.get("id")));
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(jobApplication?.employee_data);
    /*  if (isEditMode) {
      toggleEditMode();
    } */
  }, [jobApplication]);

  const items = [
    {
      label: "تعديل",
      key: "0",
      children: [
        {
          label: <div onClick={toggleEditMode}> البيانات</div>,
          key: "0-0",
        },
        {
          label: <div onClick={showModal}> الشاغر</div>,
          key: "0-1",
        },
        {
          label: "حالة الطلب",
          key: "0-2",
          children: [
            {
              key: "0-2-1",
              disabled: jobApplication?.application_status?.app_status_id === 1,
              label: (
                <div
                  onClick={() => {
                    updateStatus(1);
                  }}
                >
                  {" "}
                  تعليق
                </div>
              ),
            },
            {
              key: "0-2-2",
              disabled: jobApplication?.application_status?.app_status_id === 2,

              label: (
                <div
                  onClick={() => {
                    updateStatus(2);
                  }}
                >
                  {" "}
                  قبول
                </div>
              ),
            },
            {
              key: "0-2-3",
              disabled: jobApplication?.application_status?.app_status_id === 3,
              label: (
                <div
                  onClick={() => {
                    updateStatus(3);
                  }}
                >
                  {" "}
                  رفض
                </div>
              ),
            },
            {
              key: "0-2-4",
              disabled: jobApplication?.application_status?.app_status_id === 4,
              label: (
                <div
                  onClick={() => {
                    updateStatus(4);
                  }}
                >
                  {" "}
                  أرشفة
                </div>
              ),
            },
          ],
        },
      ],
    },
    {
      label: (
        <div
          onClick={() => {
            jobApplication?.application_status?.app_status_id === 2 &&
              openDrawer();
          }}
        >
          إنشاء حساب موظَف
        </div>
      ),
      key: "1",
      disabled: jobApplication?.application_status?.app_status_id !== 2,
    },
    {
      label: <div onClick={showDeleteConfirm}>حذف</div>,
      key: "2",
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
                <SettingOutlined style={{ fontSize: '150%'}} />
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
                  color={
                    colorMapping[
                      jobApplication?.application_status?.app_status_id
                    ]
                  }
                >
                  {jobApplication?.application_status?.name}
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
        <Spinner loading={jobVacanciesSlice.loading}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5%",
            }}
          >
            <Select
              size="large"
              placeholder="انقر لاختيار الشاغر الجديد"
              options={jobVacanciesSlice.jobVacancies.map((jv) => ({
                value: jv.id,
                label: jv.name,
              }))}
              //TODO search queries on API
              showSearch
              onSelect={(selectedVacancy) =>
                setSelectedVacancy(selectedVacancy)
              }
            />
          </div>
        </Spinner>
      </Modal>

      <CreateProfileDrawer
        employeeName={jobApplication?.employee_data?.personal_data?.full_name}
        job_app_id={jobApplication?.job_application?.id}
        open={isDrawerOpen}
        onClose={closeDrawer}
      />
    </Spinner>
  );
};
export default ViewJobApplication;
