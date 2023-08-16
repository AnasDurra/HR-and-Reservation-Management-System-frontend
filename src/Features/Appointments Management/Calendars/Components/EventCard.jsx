import {
  CloseCircleFilled,
  DeleteOutlined,
  DownCircleOutlined,
  DownOutlined,
  DropboxOutlined,
  ExclamationCircleFilled,
  FormOutlined,
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
import { updateAppointment } from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';
import confirm from 'antd/es/modal/confirm';
import CaseNoteModal from './CaseNoteModal';

function EventCard({ event, editable }) {
  const dispatch = useDispatch();
  const [isSelectCustomerModalOpen, setIsSelectCustomerModalOpen] = useState(false);
  const [isCaseNoteModalOpen, setIsCaseNoteModalOpen] = useState(false);

  const showCancelAppointmentConfirm = () => {
    Modal.confirm({
      title: 'تأكيد إلغاء الموعد',
      icon: <ExclamationCircleFilled />,
      content: 'هل أنت متأكد من رغبتك بإلغاء الموعد',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'لا',
      onOk() {
        //TODO dispatch cancel
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
            menu={{ items: attendanceItems }}
            placement='bottomRight'
          >
            <DownCircleOutlined />
          </Dropdown>,
          <UserAddOutlined
            onClick={() => setIsSelectCustomerModalOpen(true)}
            style={{ fontSize: '135%' }}
          />,
          <UserDeleteOutlined
            onClick={showCancelAppointmentConfirm}
            style={{ fontSize: '135%' }}
          />,
          <CloseCircleFilled
            onClick={showCancelAppointmentConfirm}
            style={{ fontSize: '135%' }}
          />,
          //TODO different icon if case not is set
          <FormOutlined
            onClick={() => setIsCaseNoteModalOpen(true)}
            style={{ fontSize: '135%' }}
          />,
        ].filter((_, index) => {
          switch (index) {
            case 0:
              // return true;
              return editable && event?.status?.name == 'محجوز' ? true : false;
            case 1:
              return editable && !event?.customer_id && event?.status?.name == 'متاح' ? true : false;
            case 2:
              return editable && event?.customer_id ? true : false;
            case 3:
              return true;
            case 4:
              //TODO add the appointment status condition ( it should be completed)
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
          //TODO
          dispatch(updateAppointment({ appointment_id: 17, customer_id: 1 }));
        }}
        onClose={() => setIsSelectCustomerModalOpen(false)}
      />

      <CaseNoteModal
        appointment_id={2}
        isModalOpen={isCaseNoteModalOpen}
        onClose={() => setIsCaseNoteModalOpen(false)}
      />
    </>
  );
}
export default EventCard;
