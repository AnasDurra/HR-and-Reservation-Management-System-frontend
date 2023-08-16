import { Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SelectCustomerModal({ onSelect, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleChange = (id) => setSelectedCustomerId(id);

  useEffect(() => {
    //TODO get customers
    //dispatch(getTimeSchedules());
  }, []);
  return (
    <Modal
      title='اختيار مستفيد'
      open={isModalOpen}
      okButtonProps={{ disabled: selectedCustomerId == null }}
      closable
      onCancel={() => {
        setSelectedCustomerId(null);
        onClose();
      }}
      onOk={() => {
        onSelect(selectedCustomerId);
      }}
    >
      <Select
        placeholder='انقر لاختيار مستفيد'
        style={{
          width: '80%',
          margin: '1rem',
        }}
        value={selectedCustomerId}
        onChange={handleChange}
        options={[
          {
            label: 'test',
            value: 1,
          },
        ]}
        /* options={timeSchedules?.map((ts) => ({
          label: `(${ts.id}) ${ts.name} `,
          value: ts.id,
        }))}*/
        // onSearch={onRelativesSearch}
        //showSearch
        //    filterOption={false}
      />
    </Modal>
  );
}
export default SelectCustomerModal;
