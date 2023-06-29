import { Modal, Timeline } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeJobTitlesHistory } from "../../../../../../redux/Features/Employee Profile/Employee/slice";

function EmployeeJobTitlesHistoryModal({ emp_id, isOpen, onClose }) {
  const dispatch = useDispatch();
  const jobTitlesHistory = useSelector(
    (state) => state.employeesSlice?.jobTitlesHistory
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(getEmployeeJobTitlesHistory({ emp_id }));
    }
  }, [isOpen]);

  return (
    <Modal
      title="سجل المسمَيات الوظيفيَة"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Timeline
        mode={"alternate"}
        items={jobTitlesHistory
          ?.flatMap((his) => [
            {
              label: his.start_date,
              children: (
                <span>
                  منح مسمّى
                  <span style={{ fontWeight: "bold", color: "blue" }}>
                    {his.job_title}
                  </span>
                </span>
              ),
              color: "green",
            },
            {
              label: his.end_date,
              children: (
                <span>
                  إزالة مسمّى
                  <span style={{ fontWeight: "bold", color: "blue" }}>
                    {his.job_title}
                  </span>
                </span>
              ),
              color: "red",
            },
          ])
          .filter((entry) => entry.label !== null)
          .sort((a, b) => new Date(a.label) - new Date(b.label))}
        style={{ margin: "2rem" }}
      />
    </Modal>
  );
}

export default EmployeeJobTitlesHistoryModal;
