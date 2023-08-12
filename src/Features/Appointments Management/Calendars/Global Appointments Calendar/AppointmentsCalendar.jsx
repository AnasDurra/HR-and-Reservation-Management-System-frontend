import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { createRef, useState } from 'react';

import EventCard from '../Components/EventCard';

function renderEventContent(eventInfo) {
  console.log(eventInfo.event);
  return (
    <>
      <EventCard
        customerName={'انس ريش'}
        startTime={'11:30'}
        endTime={'12:30'}
        eventStatus={'متاح'}
        onCustomerTagClick={() => {
          console.log('customer clicked');
        }}
        onCancel={() => {
          console.log('cancel', eventInfo.event);
        }}
        editable
      />
    </>
  );
}

function AppointmentsCalendar() {
  const calendarRef = createRef();

  const onClose = () => setIsModalOpen(false);
  const onOpen = () => setIsModalOpen(true);

  return (
    <>
      <FullCalendar
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        selectable={false}
        events={[
          {
            title: 'The Title', // a property!
            start: '2023-08-03T10:30:00', // a property!
            end: '2023-08-03T11:30:00', // a property! ** see important note below about 'end' **
          },
          {
            title: 'The Title', // a property!
            start: '2023-08-03T11:10:00', // a property!
            end: '2023-08-03T12:30:00', // a property! ** see important note below about 'end' **
          },
          {
            title: 'The Title', // a property!
            start: '2023-08-04T10:30:00', // a property!
            end: '2023-08-04T11:30:00', // a property! ** see important note below about 'end' **
          },
        ]}
        datesSet={(dateInfo) => {
          console.log('changed!', dateInfo);
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
