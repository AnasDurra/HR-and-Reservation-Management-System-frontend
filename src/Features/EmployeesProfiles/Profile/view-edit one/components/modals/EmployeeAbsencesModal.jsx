import { Descriptions, Divider, Empty, Modal, Tag, Timeline } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmployeeAbsences,
  getEmployeeJobTitlesHistory,
} from '../../../../../../redux/Features/Employee Profile/Employee/slice';

const colorMapping = {
  1: 'green',
  2: 'red',
};

function EmployeeAbsencesModal({ emp_id, isOpen, onClose }) {
  const dispatch = useDispatch();
  const absences = useSelector(
    (state) => state.employeesSlice?.employeeAbsences
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(getEmployeeAbsences({ emp_id }));
    }
  }, [isOpen]);

  return (
    <Modal
      title='سجل الغياب'
      open={isOpen}
      onCancel={onClose}
      footer={null}>
      {absences.length > 0 ? (
        absences.map((absence, index) => (
          <>
            <Descriptions
              key={`absences-${index}`}
              column={2}>
              <Descriptions.Item label='معرَف '>
                {absence.absence_id}
              </Descriptions.Item>
              <Descriptions.Item label='تاريخ'>
                {absence.absence_date}
              </Descriptions.Item>
              <Descriptions.Item label='الحالة'>
                <Tag
                  color={
                    colorMapping[absence?.absence_status?.absence_status_id]
                  }>
                  {absence?.absence_status?.absence_status_name}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />
          </>
        ))
      ) : (
        // Note displayed when there are no absenses
        <Empty description={'لايوجد غيابات'} />
      )}
    </Modal>
  );
}

export default EmployeeAbsencesModal;
