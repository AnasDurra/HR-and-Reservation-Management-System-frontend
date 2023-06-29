import { Modal, Timeline } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDepartmentsHistory } from "../../../../../../redux/Features/Employee Profile/Employee/slice";

function EmployeeDepartmentsHistoryModal({ emp_id, isOpen, onClose }) {
  const dispatch = useDispatch();
  const departmentsHistory = useSelector(
    (state) => state.employeesSlice?.departmentsHistory
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(getEmployeeDepartmentsHistory({ emp_id }));
    }
  }, [isOpen]);

  return (
    <Modal
      title="سجل التنقَلات بين الأقسام"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Timeline
        mode={"alternate"}
        items={departmentsHistory
          ?.flatMap((his) => [
            {
              label: his.start_date,
              children: (
                <span>
                  الانضمام لقسم <span style={{ fontWeight: 'bold', color: 'blue' }}>{his.department}</span>
                </span>
              ),
              color: "green",
            },
            {
              label: his.end_date,
              children: (
                <span>
                  مفادرة قسم <span style={{ fontWeight: 'bold', color: 'blue' }}>{his.department}</span>
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

export default EmployeeDepartmentsHistoryModal;
