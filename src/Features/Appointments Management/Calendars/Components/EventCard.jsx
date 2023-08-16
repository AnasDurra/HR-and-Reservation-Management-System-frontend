import {
  CloseCircleFilled,
  DeleteOutlined,
  DownCircleOutlined,
  DownOutlined,
  DropboxOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  PhoneOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Dropdown, Modal, Row, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import SelectCustomerModal from './SelectCustomerModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  cancelAppointment,
  cancelReservation,
  updateAppointment,
} from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';
import confirm from 'antd/es/modal/confirm';
import CaseNoteModal from './CaseNoteModal';
import PhoneReservationModal from './PhoneReservationModal';

//TODO color title based on status & reorder actions
function EventCard({ event, editable }) {
  const dispatch = useDispatch();
  const [isSelectCustomerModalOpen, setIsSelectCustomerModalOpen] = useState(false);
  const [isCaseNoteModalOpen, setIsCaseNoteModalOpen] = useState(false);
  const [isPhoneReservationModalOpen, setIsPhoneReservationModalOpen] = useState(false);

  const showCancelAppointmentConfirm = () => {
    Modal.confirm({
      title: 'تأكيد إلغاء الموعد',
      icon: <ExclamationCircleFilled />,
      content: 'هل أنت متأكد من رغبتك بإلغاء الموعد',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'لا',
      onOk() {
        if (editable) dispatch(cancelAppointment({ id: event.id, isEmployee: true }));
        else dispatch(cancelAppointment({ id: event.id, isConsultant: true }));
      },
      onCancel() {},
    });
  };

  const showCancelReservationConfirm = () => {
    Modal.confirm({
      title: 'تأكيد إلغاء الحجز',
      icon: <ExclamationCircleFilled />,
      content: 'هل أنت متأكد من رغبتك بإلغاء الحجز',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'لا',
      onOk() {
        //TODO check if it's working after employee login
        dispatch(cancelReservation({ id: event.id }));
      },
      onCancel() {},
    });
  };

  const attendanceItems = [
    {
      key: '1',
      label: <a onClick={() => {}}>تم تسجيل حضور الطرفين</a>,
    },
    {
      key: '2',
      label: <a onClick={() => {}}>تسجيل غياب المستفيد</a>,
    },
    {
      key: '3',
      label: <a onClick={() => {}}>تسجيل غياب المستشار</a>,
    },
  ];
  return (
    <>
      {/*   <Row gutter={35}>
        <Col>
          <Dropdown
            menu={{ attendanceItems }}
            placement='topLeft'
          >
            <DownOutlined />
          </Dropdown>
        </Col>
        <Col></Col>
      </Row> */}

      <Card
        actions={[
          <Dropdown
            key={'attendance'}
            menu={{ items: attendanceItems }}
            placement='bottomRight'
          >
            <DownCircleOutlined />
          </Dropdown>,

          <UserAddOutlined
            key={'reservation'}
            onClick={() => setIsSelectCustomerModalOpen(true)}
            style={{ fontSize: '135%' }}
          />,

          <PhoneOutlined
            key={'phoneReservation'}
            onClick={() => setIsPhoneReservationModalOpen(true)}
            style={{ fontSize: '135%' }}
          />,

          <UserDeleteOutlined
            key={'cancelReservation'}
            onClick={showCancelReservationConfirm}
            style={{ fontSize: '135%' }}
          />,

          //TODO different icon if case not is set
          <FormOutlined
            key={'caseNote'}
            onClick={() => setIsCaseNoteModalOpen(true)}
            style={{ fontSize: '135%' }}
          />,

          <CloseCircleFilled
            key={'cancelAppointment'}
            onClick={showCancelAppointmentConfirm}
            style={{ fontSize: '135%' }}
          />,
        ].filter((element, index) => {
          console.log('elemets', element);
          switch (element.key) {
            case 'attendance':
              // return true;
              return editable && event?.status?.name == 'محجوز' ? true : false;
            case 'reservation':
              return editable && !event?.customer_id && event?.status?.name == 'متاح' ? true : false;
            case 'phoneReservation':
              return editable && !event?.customer_id && event?.status?.name == 'متاح' ? true : false;
            case 'cancelReservation':
              return editable && event?.customer_id ? true : false;
            case 'cancelAppointment':
              return true;
            case 'caseNote':
              //TODO add the appointment status condition ( it should be completed) & employee cant edit casenote
              return editable && event?.customer_id ? true : false;

            default:
              return false;
          }
        })}
        title={
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {event?.status.name}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {` ${new Date(`1970-01-01T${event?.start_time}`).toLocaleTimeString('ar-EG', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })} - ${new Date(`1970-01-01T${event?.end_time}`).toLocaleTimeString('ar-EG', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}`}
            </div>
          </>
        }
        style={{ width: '100%', margin: '1rem 0.1rem' }}
        headStyle={{ backgroundColor: '#d9f7be' }}
      >
        <Meta
          description={
            <div style={{}}>
              {event?.customer_id && (
                <Tag
                  className='user-tag'
                  icon={<UserOutlined />}
                  color='default'
                  onClick={() => {}}
                >
                  {event?.customer_id}
                </Tag>
              )}
            </div>
          }
        />
      </Card>

      <SelectCustomerModal
        isModalOpen={isSelectCustomerModalOpen}
        onSelect={(id) => {
          dispatch(updateAppointment({ appointment_id: event?.id, customer_id: id }));
        }}
        onClose={() => setIsSelectCustomerModalOpen(false)}
      />

      <CaseNoteModal
        appointment_id={2}
        isModalOpen={isCaseNoteModalOpen}
        onClose={() => setIsCaseNoteModalOpen(false)}
      />

      <PhoneReservationModal
        appointment_id={event.id}
        isModalOpen={isPhoneReservationModalOpen}
        onClose={() => setIsPhoneReservationModalOpen(false)}
      />
    </>
  );
}
export default EventCard;
