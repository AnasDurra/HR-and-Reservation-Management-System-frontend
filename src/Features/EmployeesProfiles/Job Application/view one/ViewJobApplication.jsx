import { useForm } from "antd/lib/form/Form";
import ViewEditJobApplicationForm from "../../Profile/view-edit one/components/ViewEditJobApplicationForm";
import VacancyCard from "../components/VacancyCard";
import { Card } from "antd";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplication } from "../../../../redux/Features/Employee Profile/Job application/slice";

const ViewJobApplication = () => {
  const jobApplicationState = useSelector(
    (state) => state.jobApplications.jobApplication
  );
  const [form] = useForm();
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(getJobApplication(searchParam.get("id")));
    form.setFieldsValue(jobApplicationState?.employee_data);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <ViewEditJobApplicationForm editMode={true} form={form} />
      <VacancyCard
        vacancyName={jobApplicationState?.job_vacancy?.name}
        vacancyDescription={jobApplicationState?.job_vacancy.description}
        department={jobApplicationState?.job_vacancy.department_name}
        vacancyCount={jobApplicationState?.job_vacancy.count}

      />
    </div>
  );
};
export default ViewJobApplication;
