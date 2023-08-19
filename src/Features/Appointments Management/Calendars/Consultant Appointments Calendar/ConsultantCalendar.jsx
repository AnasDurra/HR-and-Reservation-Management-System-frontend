import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { Alert, Avatar, Card, Modal, Popconfirm, Tag, message } from 'antd';
import { createRef, useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import EventCard from '../Components/EventCard';
import SelectTimeScheduleModal from './SelectTimeScheduleModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAppointments,
  getAppointments,
  getConsultantAppointments,
} from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';

function renderEventContent(eventInfo) {
  //console.log('event', eventInfo.event.extendedProps);
  return (
    <>
      <EventCard event={eventInfo.event.extendedProps.appointment} />
    </>
  );
}

function ConsultantCalendar() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.consultingAppointmentsSlice?.appointments);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectTimeScheduleModalOpen, setIsSelectTimeScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const calendarRef = createRef();

  const onClose = () => setIsSelectTimeScheduleModalOpen(false);
  const onOpen = () => setIsSelectTimeScheduleModalOpen(true);

  return (
    <>
      {isEditMode && (
        <>
          <Alert
            description='للإضافة المواعيد من جداول الدوام قم بتحديد يوم أو عدة أيام بالنقر مطوَلاّ والمرور على الأيام المراد تحديدها وسيظهر خيار اسناد جدول'
            type='info'
            showIcon
            closable
          />

          <SelectTimeScheduleModal
            onSelect={(timeScheduleId) => {
              console.log(timeScheduleId);

              const startDate = new Date(selectedDate.startStr);
              const endDate = new Date(selectedDate.endStr);

              const dates = [];

              while (startDate.getTime() < endDate.getTime()) {
                const formattedDate = startDate.toISOString().split('T')[0];
                dates.push({ date: formattedDate, shift_Id: timeScheduleId });
                startDate.setDate(startDate.getDate() + 1);
                console.log('start date', startDate.getTime());
                console.log('enddate', endDate.getTime);
              }

              dispatch(createAppointments({ dates }));

              setIsSelectTimeScheduleModalOpen(false);
            }}
            onClose={onClose}
            isModalOpen={isSelectTimeScheduleModalOpen}
          />
        </>
      )}

      <FullCalendar
        datesSet={(dateInfo) => {
          const startDate = new Date(dateInfo.start);
          const endDate = new Date(dateInfo.end);

          const formattedStartDate = startDate.toISOString().split('T')[0];
          const formattedEndDate = endDate.toISOString().split('T')[0];
          console.log('changed!', dateInfo);

          dispatch(getConsultantAppointments({ start_date: formattedStartDate, end_date: formattedEndDate }));
        }}
        select={(date) => {
          setSelectedDate(date);
          setIsSelectTimeScheduleModalOpen(true);
        }}
        selectAllow={(dateInfo) => {
          const startDate = new Date(dateInfo.start);
          const endDate = new Date(dateInfo.end);
          const isInRange = appointments.some((app) => {
            const date = new Date(app.date);
            if (date >= startDate && date <= endDate) console.log('app', app);
            return (
              date >= startDate &&
              date <= endDate &&
              (app.status?.name == 'متاح' || app.status?.name == 'محجوز' || app.status?.name == 'هاتف')
            );
          });
          if (isInRange) {
            message.destroy();
            message.open({
              type: 'warning',
              content: 'يجب إلغاء المواعيد النشطة قبل تحديد برنامج دوام جديد للأيام المختارة',
            });
            return false;
          }

          if (new Date().getTime() > startDate.getTime()) {
            message.destroy();
            message.open({
              type: 'warning',
              content: 'لايمكن اضافة مواعيد بالماضي',
            });
            return false;
          }

          return true;
        }}
        events={appointments.map((app) => ({
          appointment: app,
          start: new Date(`${app.date}T${app.start_time}`),
          end: new Date(`${app.date}T${app.end_time}`),
        }))}
        headerToolbar={
          isEditMode
            ? {
                left: 'prev,next today',
                center: 'title',
                right: 'saveChangesButton',
              }
            : {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek addAppointmentsButton',
              }
        }
        customButtons={
          isEditMode
            ? {
                saveChangesButton: {
                  text: 'الخروج من وضع التعديل',
                  click: function () {
                    setIsEditMode(!isEditMode);
                  },
                },
              }
            : {
                addAppointmentsButton: {
                  text: 'إضافة مواعيد للجدول',
                  click: function () {
                    calendarRef.current.getApi().changeView('dayGridMonth');
                    setIsEditMode(!isEditMode);
                  },
                },
              }
        }
        selectable={isEditMode}
        eventContent={renderEventContent}
        eventMouseEnter={(arg) => {}}
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, listPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        locale={arLocale}
        allDaySlot={false}
        firstDay={0}
        slotDuration={'01:00'}
        // height={'85vh'}
        eventInteractive
        slotEventOverlap={false}
        eventBackgroundColor='#00000000'
        eventColor='#00000000'
        moreLinkText={'المزيد'}
        moreLinkHint={'عرض الكل '}
        dayMaxEvents={1}
        dayMaxEventRows={1}
        eventMaxStack={1}
        aspectRatio={2.33}
        //  contentHeight={550}
      />
    </>
  );
}
export default ConsultantCalendar;
