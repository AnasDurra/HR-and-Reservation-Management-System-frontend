import { useForm } from "antd/lib/form/Form";
import ViewEditJobApplicationForm from "../../Profile/view-edit one/components/ViewEditJobApplicationForm";
import VacancyCard from "../components/VacancyCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplication } from "../../../../redux/Features/Employee Profile/Job application/slice";

const ViewJobApplication = () => {
  const jobApplication = useSelector(
    (state) => state.jobApplicationsSlice.jobApplication
  );
  const [form] = useForm();
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(getJobApplication(searchParam.get("id")));
    form.setFieldsValue(jobApplication?.employee_data);
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
        vacancyName={jobApplication?.job_vacancy?.name}
        vacancyDescription={jobApplication?.job_vacancy?.description}
        department={jobApplication?.job_vacancy?.department_name}
        vacancyCount={jobApplication?.job_vacancy?.count}
      />
    </div>
  );
};
export default ViewJobApplication;
