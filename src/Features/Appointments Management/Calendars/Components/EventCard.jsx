import {
  CloseCircleFilled,
  DeleteOutlined,
  DownCircleOutlined,
  DownOutlined,
  DropboxOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  IdcardOutlined,
  PhoneOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, Dropdown, Modal, Row, Space, Tag } from 'antd';
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
import { now } from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const statusColorsMap = new Map([
  [1, '#ffccc7'],
  [2, '#ffccc7'],
  [3, '#ffccc7'],
  [4, '#d9f7be'],
  [5, '#ffffb8'],
  [6, '#bae0ff'],
  [7, '#ffd8bf'],
  [8, '#ffd8bf'],
  [9, '#ffffb8'],
  [10, ' #b5f5ec '],
  [11, ' #efdbff'],
]);

//TODO color title based on status & reorder actions
function EventCard({ event, editable }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSelectCustomerModalOpen, setIsSelectCustomerModalOpen] = useState(false);
  const [isCaseNoteModalOpen, setIsCaseNoteModalOpen] = useState(false);
  const [isPhoneReservationModalOpen, setIsPhoneReservationModalOpen] = useState(false);
  const isEventInPast = new Date().getTime() > new Date(event?.date).getTime();

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
      label: (
        <a
          onClick={() => {
            dispatch(updateAppointment({ appointment_id: event?.id, updateReservation: true, reservationType: 4 }));
          }}
        >
          تم تسجيل حضور الطرفين
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          onClick={() => {
            dispatch(updateAppointment({ appointment_id: event?.id, updateReservation: true, reservationType: 7 }));
          }}
        >
          تسجيل غياب المستفيد
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          onClick={() => {
            dispatch(updateAppointment({ appointment_id: event?.id, updateReservation: true, reservationType: 8 }));
          }}
        >
          تسجيل غياب المستشار
        </a>
      ),
    },
  ];

  const cancelAttendanceItems = [
    {
      key: '5',
      disabled: event?.status?.name != 'مكتمل' && event?.status?.id != 7 && event?.status?.id != 8,
      label: (
        <a
          onClick={() => {
            //TODO لم يتم تسجيل الحضور
            dispatch(
              updateAppointment({
                appointment_id: event?.id,
                updateReservation: true,
                reservationType: isEventInPast ? 11 : event?.customer_id ? 5 : 9,
              })
            );
          }}
        >
          إزالة معلومات الحضور
        </a>
      ),
    },
  ];
  return (
    <>
      <Card
        actions={[
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

          <Dropdown
            key={'attendance'}
            menu={{ items: attendanceItems }}
            placement='bottomRight'
          >
            <EllipsisOutlined />
          </Dropdown>,

          <Dropdown
            key={'cancelAttendance'}
            menu={{ items: cancelAttendanceItems }}
            placement='bottomRight'
          >
            <EllipsisOutlined />
          </Dropdown>,
        ].filter((element, index) => {
          // console.log('elemets', element);
          switch (element.key) {
            case 'attendance':
              // return true;
              return editable &&
                (event?.status?.name == 'محجوز' ||
                  event?.status?.status_name == 'هاتف' ||
                  event?.status?.name == 'هاتف')
                ? true
                : false;
            case 'reservation':
              return !isEventInPast && editable && event?.status?.name == 'متاح';
            case 'phoneReservation':
              return !isEventInPast && editable && !event?.customer_id && event?.status?.name == 'متاح';
            case 'cancelReservation':
              return !isEventInPast &&
                editable &&
                ((event?.customer_id && event?.status?.name == 'محجوز') ||
                  event?.status?.status_name == 'هاتف' ||
                  event?.status?.name == 'هاتف')
                ? true
                : false;
            case 'cancelAppointment':
              return !isEventInPast && event?.status?.name == 'متاح';
            case 'caseNote':
              //TODO add the appointment status condition ( it should be completed) & employee cant edit casenote
              return !editable && event?.status?.name == 'مكتمل';
            case 'cancelAttendance':
              return event?.status?.name == 'مكتمل' || event?.status?.id == 7 || event?.status?.id == 8;
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
              {event?.status?.name}
              {event?.status?.status_name}
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
        headStyle={{ backgroundColor: statusColorsMap.get(event?.status?.id) }}
      >
        <Meta
          description={
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {event?.clinic_name}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{ color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => navigate(`/consultants/view/${event?.consultant_id}`)}
                >{`م.${event?.consultant_name}`}</span>
              </div>

              <Divider />

              {event?.customer_id && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tag
                    className='user-tag'
                    icon={<UserOutlined />}
                    color='default'
                    onClick={() => navigate(`/customers/view/${event?.customer_id}`)}
                  >
                    {event?.customer_name}
                  </Tag>
                </div>
              )}

              {event?.status?.customer_name && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Tag
                      className='user-tag'
                      icon={<UserOutlined />}
                      color='default'
                      onClick={() => {}}
                    >
                      {event?.status?.customer_name}
                    </Tag>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0.5rem 0',
                    }}
                  >
                    <Tag
                      className='user-tag'
                      icon={<PhoneOutlined />}
                      color='default'
                      onClick={() => {}}
                    >
                      {event?.status?.phone_number}
                    </Tag>
                  </div>
                </>
              )}
            </>
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
        appointment_id={event?.id}
        isModalOpen={isCaseNoteModalOpen}
        onClose={() => setIsCaseNoteModalOpen(false)}
      />

      <PhoneReservationModal
        appointment_id={event?.id}
        isModalOpen={isPhoneReservationModalOpen}
        onClose={() => setIsPhoneReservationModalOpen(false)}
      />
    </>
  );
}
export default EventCard;
