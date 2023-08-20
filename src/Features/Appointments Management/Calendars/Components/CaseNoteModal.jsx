import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCaseNote,
  getCaseNote,
  updateCaseNote,
} from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';

function CaseNoteModal({ appointment_id, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const caseNote = useSelector((state) => state.consultingAppointmentsSlice.caseNote);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getCaseNote({ appointment_id }));
      console.log('casenote', caseNote);
      form.setFieldValue(['title'], caseNote?.title);
      form.setFieldValue(['description'], caseNote?.description);
    }
  }, [isModalOpen]);

  return (
    <Modal
      title='المعاينة'
      open={isModalOpen}
      //okButtonProps={{ disabled: selectedCustomerId == null }}
      onCancel={() => {
        onClose();
      }}
      onOk={() => {
        form.submit();
      }}
      okText={'حفظ التعديلات'}
      cancelText={'إلفاء'}
      footer={isFooterVisible ? undefined : null}
      closable
    >
      <Form
        form={form}
        onFinish={(values) => {
          dispatch(updateCaseNote({ appointment_id, title: values?.title, description: values?.description }));
          onClose();
        }}
        style={{ margin: '1rem' }}
        onFieldsChange={() => {
          if (
            caseNote?.title != form.getFieldValue(['title']) ||
            caseNote?.description != form.getFieldValue(['description'])
          )
            setIsFooterVisible(true);
          else setIsFooterVisible(false);
        }}
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
