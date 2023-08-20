import { Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTimeSchedule,
  getTimeSchedules,
} from '../../../../redux/Features/Appointments Management/Consultant Time Schedules/slice';

function SelectTimeScheduleModal({ onSelect, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const timeSchedules = useSelector((state) => state?.consultantTimeScheduleSlice?.timeSchedules);
  const [selectedTimeScheduleId, setSelectedTimeScheduleId] = useState(null);

  const handleChange = (id) => setSelectedTimeScheduleId(id);

  useEffect(() => {
    dispatch(getTimeSchedules());
  }, []);
  return (
    <Modal
      title='اسناد برنامج دوام'
      open={isModalOpen}
      okButtonProps={{ disabled: selectedTimeScheduleId == null }}
      closable
      onCancel={() => {
        setSelectedTimeScheduleId(null);
        onClose();
      }}
      onOk={() => {
        onSelect(selectedTimeScheduleId);
      }}
    >
      <Select
        placeholder='انقر لاختيار برنامج دوام'
        style={{
          width: '80%',
          margin: '1rem',
        }}
        value={selectedTimeScheduleId}
        onChange={handleChange}
        options={timeSchedules?.map((ts) => ({
          label: `(${ts.id}) ${ts.name} `,
          value: ts.id,
        }))}
        // onSearch={onRelativesSearch}
        //showSearch
        //    filterOption={false}
      />
    </Modal>
  );
}
export default SelectTimeScheduleModal;
