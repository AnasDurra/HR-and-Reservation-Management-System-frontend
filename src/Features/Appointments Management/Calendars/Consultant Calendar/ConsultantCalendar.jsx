import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { Alert, Avatar, Card, Modal, Popconfirm, Tag, message } from 'antd';
import { createRef, useState } from 'react';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import EventCard from './EventCard';
import SelectTimeScheduleModal from './SelectTimeScheduleModal';

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
            />
        </>
    );
}

function ConsultantCalendar() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const calendarRef = createRef();

    const onClose = () => setIsModalOpen(false);
    const onOpen = () => setIsModalOpen(true);

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
                            //send req
                            setIsModalOpen(false);
                        }}
                        onClose={onClose}
                        isModalOpen={isModalOpen}
                    />
                </>
            )}

            <FullCalendar
                headerToolbar={
                    isEditMode
                        ? {
                              left: 'prev,next today',
                              center: 'title',
                              right: 'cancelButton saveChangesButton',
                          }
                        : {
                              left: 'prev,next today',
                              center: 'title',
                              right: 'addAppointmentsButton dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                          }
                }
                customButtons={
                    isEditMode
                        ? {
                              saveChangesButton: {
                                  text: 'حفظ',
                                  click: function () {
                                      setIsEditMode(!isEditMode);
                                  },
                              },
                              cancelButton: {
                                  text: 'إلغاء',
                                  click: function () {
                                      setIsEditMode(!isEditMode);
                                  },
                              },
                          }
                        : {
                              addAppointmentsButton: {
                                  text: 'إضافة مواعيد للجدول',
                                  click: function () {
                                      calendarRef.current
                                          .getApi()
                                          .changeView('dayGridMonth');
                                      setIsEditMode(!isEditMode);
                                  },
                              },
                          }
                }
                selectable={isEditMode}
                select={(date) => {
                    console.log(date);
                    setSelectedDate(date);
                    setIsModalOpen(true);
                }}
                selectAllow={(dateInfo) => {
                    console.log(dateInfo);
                    if (
                        dateInfo.start <= new Date('2023-08-03') &&
                        new Date('2023-08-03') <= dateInfo.end
                    ) {
                        message.config({
                            maxCount: 1,
                        });
                        message.open({
                            type: 'warning',
                            content: 'يوجد برنامج محدد لليوم المختار',
                        });

                        return false;
                    }
                    return true;
                }}
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
                eventContent={renderEventContent}
                eventMouseEnter={(arg) => {}}
                ref={calendarRef}
                plugins={[
                    timeGridPlugin,
                    dayGridPlugin,
                    listPlugin,
                    interactionPlugin,
                ]}
                initialView='dayGridMonth'
                locale={arLocale}
                allDaySlot={false}
                firstDay={0}
                slotDuration={'01:00'}
                height={'85vh'}
                eventInteractive
                slotEventOverlap={false}
                eventBackgroundColor='#00000000'
                eventColor='#00000000'
                moreLinkText={'المزيد'}
                moreLinkHint={'عرض الكل '}
                dayMaxEvents={1}
                dayMaxEventRows={1}
                eventMaxStack={1}
            />
        </>
    );
}
export default ConsultantCalendar;
