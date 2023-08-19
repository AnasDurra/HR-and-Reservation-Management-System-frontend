import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPhoneReservation } from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';

function PhoneReservationModal({ appointment_id, isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const [form] = useForm();

  return (
    <Modal
      title='معلومات الحجز'
      open={isModalOpen}
      //okButtonProps={{ disabled: selectedCustomerId == null }}
      onCancel={() => {
        onClose();
      }}
      onOk={() => form.submit()}
      okText={'تأكيد'}
      cancelText={'إلفاء'}
      closable
    >
      <Form
        form={form}
        onFinish={(values) => {
          console.log(values);
          dispatch(createPhoneReservation({ appointment_id, phone_number: values?.phone, name: values?.name }));
        }}
        style={{ margin: '1rem' }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label='الاسم الكامل'
              name={'name'}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label='رقم الهاتف'
              name={'phone'}
              rules={[
                { pattern: new RegExp(/^\+*[0-9][0-9 -]+$/), message: 'يرجى إدخال رقم هاتف صالح' },
                { max: 25 },
                { min: 10 },
                { required: true },
              ]}
            >
              <Input type='tel' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default PhoneReservationModal;
