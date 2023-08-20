import { Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../../../redux/customers/reducer';

function SelectCustomerModal({ onSelect, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customersReducer?.customers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleChange = (id) => setSelectedCustomerId(id);

  useEffect(() => {
    if (isModalOpen) dispatch(getCustomers({ type: true }));
  }, [isModalOpen]);

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
        onClose();
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
        options={customers?.map((c) => ({
          label: `(${c.id}) ${c.full_name} `,
          value: c.id,
        }))}
        // onSearch={onRelativesSearch}
        //showSearch
        //    filterOption={false}
      />
    </Modal>
  );
}
export default SelectCustomerModal;
