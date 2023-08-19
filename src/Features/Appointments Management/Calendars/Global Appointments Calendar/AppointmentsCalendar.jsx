import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { createRef, useEffect, useState } from 'react';
import EventCard from '../Components/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../../../redux/Features/Appointments Management/Consulting Appointements/slice';

function renderEventContent(eventInfo) {
  //console.log("eventInfo",eventInfo.event);
  return (
    <>
      <EventCard
        editable
        event={eventInfo.event.extendedProps.appointment}
      />
    </>
  );
}

function AppointmentsCalendar() {
  const dispatch = useDispatch();
  const calendarRef = createRef();

  const appointments = useSelector((state) => state.consultingAppointmentsSlice?.appointments);

  return (
    <>
      <FullCalendar
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        selectable={false}
        events={appointments.map((app) => ({
          appointment: app,
          start: new Date(`${app.date}T${app.start_time}`),
          end: new Date(`${app.date}T${app.end_time}`),
        }))}
        datesSet={(dateInfo) => {
          const startDate = new Date(dateInfo.start);
          const endDate = new Date(dateInfo.end);

          const formattedStartDate = startDate.toISOString().split('T')[0];
          const formattedEndDate = endDate.toISOString().split('T')[0];
          console.log('changed!', dateInfo);

          dispatch(getAppointments({ start_date: formattedStartDate, end_date: formattedEndDate }));
        }}
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
export default AppointmentsCalendar;
