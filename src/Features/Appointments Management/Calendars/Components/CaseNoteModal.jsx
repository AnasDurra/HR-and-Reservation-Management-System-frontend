import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CaseNoteModal({ appointment_id, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const [form] = useForm();

  useEffect(() => {
    //TODO get customers
    //dispatch(getTimeSchedules());
  }, []);
  return (
    <Modal
      title='المعاينة'
      open={isModalOpen}
      //okButtonProps={{ disabled: selectedCustomerId == null }}
      onCancel={() => {
        onClose();
      }}
      onOk={() => {}}
      okText={'حفظ التعديلات'}
      cancelText={'إلفاء'}
      // TODO if changes are made render footer
      footer={undefined}
      closable
    >
      <Form
        form={form}
        onFinish={() => {}}
        style={{ margin: '1rem' }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label='العنوان'
              name={'title'}
            >
              <Input.TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 4,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label='الوصف'
              name={'description'}
            >
              <Input.TextArea
                autoSize={{
                  minRows: 10,
                  maxRows: 15,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default CaseNoteModal;
