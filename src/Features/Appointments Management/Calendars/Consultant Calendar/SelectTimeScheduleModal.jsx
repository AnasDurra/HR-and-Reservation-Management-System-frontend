import { Modal, Select } from 'antd';
import { useState } from 'react';

function SelectTimeScheduleModal({ onSelect, isModalOpen, onClose }) {
    const [selectedTimeScheduleId, setSelectedTimeScheduleId] = useState(null);

    const handleChange = (id) => setSelectedTimeScheduleId(id);

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
                    margin:"1rem"
                }}
                value={selectedTimeScheduleId}
                onChange={handleChange}
                options={[
                    {
                        value: 0,
                        label: 'Jack (100)',
                    },
                    {
                        value: 1,
                        label: 'Lucy (101)',
                    },
                ]}
                /*  options={relatives?.map((emp) => ({
          label: `(${emp.emp_id}) ${emp.full_name} `,
          value: emp.emp_id,
        }))} */
                // onSearch={onRelativesSearch}
                //showSearch
                //    filterOption={false}
            />
        </Modal>
    );
}
export default SelectTimeScheduleModal;
