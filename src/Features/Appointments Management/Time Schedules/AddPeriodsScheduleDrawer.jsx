import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
  message,
} from 'antd';
import { useState } from 'react';
import { PlusOutlined, MinusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import TimeSchedule from './TimeSchedule';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createTimeSchedule } from '../../../redux/Features/Appointments Management/Consultant Time Schedules/slice';
import { handleError } from '../../../redux/utils/helpers';

function formatPeriods(array) {
  const result = [];

  array.forEach((item) => {
    if (!item?.start_time || !item?.period) {
      return;
    }

    const startTime = new Date(item.start_time);
    const durationHours = new Date(item.period).getHours();
    const durationMinutes = new Date(item.period).getMinutes();

    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000);

    const startTimeString = formatTime(startTime);
    const endTimeString = formatTime(endTime);

    const startObj = {
      title: <h3 style={{ direction: 'ltr' }}>{startTimeString}</h3>,
      status: 'finish',
    };

    const endObj = {
      title: <h3 style={{ direction: 'ltr' }}>{endTimeString}</h3>,
      status: 'process',
    };

    result.push(startObj, endObj);
  });

  return result;
}
function formatTime(time) {
  const hours = time.getHours() % 12 === 0 ? 12 : time.getHours() % 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const suffix = time.getHours() >= 12 ? 'pm' : 'am';
  return `${hours}:${minutes} ${suffix}`;
}
function checkOverlap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const compare = arr[j];

      // Extracting hours and minutes from time strings
      const [currentStartHour, currentStartMin] = current.start_time.split(':');
      const [currentEndHour, currentEndMin] = current.end_time.split(':');
      const [compareStartHour, compareStartMin] = compare.start_time.split(':');
      const [compareEndHour, compareEndMin] = compare.end_time.split(':');

      // Converting extracted values to numbers
      const currentStartTime = Number(currentStartHour) * 60 + Number(currentStartMin);
      const currentEndTime =
        Number(currentEndHour) < Number(currentStartHour)
          ? (Number(currentEndHour) + 24) * 60 + Number(currentEndMin)
          : Number(currentEndHour) * 60 + Number(currentEndMin);
      const compareStartTime = Number(compareStartHour) * 60 + Number(compareStartMin);
      const compareEndTime =
        Number(compareEndHour) < Number(compareStartHour)
          ? (Number(compareEndHour) + 24) * 60 + Number(compareEndMin)
          : Number(compareEndHour) * 60 + Number(compareEndMin);

      // Checking if the times overlap
      if (
        (currentStartTime <= compareEndTime && currentEndTime >= compareStartTime) ||
        (compareStartTime <= currentEndTime && compareEndTime >= currentStartTime)
      ) {
        return true; // Times overlap
      }
    }
  }

  return false; // No overlap found
}
function isEndTimeBeforeStartTime(timeArray) {
  for (let i = 0; i < timeArray.length; i++) {
    const { start_time, end_time } = timeArray[i];
    const startTime = new Date(`1970-01-01T${start_time}:00Z`);
    const endTime = new Date(`1970-01-01T${end_time}:00Z`);

    if (endTime < startTime) {
      return true;
    }
  }

  return false;
}

function AddPeriodsScheduleDrawer({ isOpen, close, open } = {}) {
  const dispatch = useDispatch();
  const consultantTimeScheduleSlice = useSelector((state) => state.consultantTimeScheduleSlice);
  const [periods, setPeriods] = useState([]);
  const [isDefaultPeriods, setIsDefaultPeriods] = useState(false);
  const [defaultPeriod, setDefaultPeriod] = useState();
  const [form] = useForm();

  const updatePeriods = () => {
    const unFormattedPeriods = form
      .getFieldsValue()
      ['periods'].filter((item) => item != null && item.period != null && item.start_time != null);

    const sortedUnformattedPeriods = [...unFormattedPeriods].sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );

    const formattedPeriods = sortedUnformattedPeriods.map((item) => {
      const period = new Date(item.period);
      const startTime = new Date(item.start_time);
      const endTime = new Date(
        startTime.getTime() + period.getHours() * 60 * 60 * 1000 + period.getMinutes() * 60 * 1000
      );
      return {
        start_time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        end_time: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
    });

    setPeriods(formattedPeriods);
  };

  const onFinish = () => {
    const periods = form.getFieldsValue()['periods'].map((item) => {
      const period = new Date(item.period);
      const startTime = new Date(item.start_time);
      const endTime = new Date(
        startTime.getTime() + period.getHours() * 60 * 60 * 1000 + period.getMinutes() * 60 * 1000
      );
      return {
        start_time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        end_time: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
    });

    console.log(periods);
    if (checkOverlap(periods)) {
      message.open({
        type: 'error',
        content: 'يوجد تضارب في الفترات المختارة ! ',
      });
    } else if (isEndTimeBeforeStartTime(periods)) {
      message.open({
        type: 'error',
        content: 'لا يمكن لفترة أن تمتد ليومين!',
      });
    } else {
      dispatch(
        createTimeSchedule({
          name: form.getFieldValue(['name']),
          periods,
        })
      );
      console.log(consultantTimeScheduleSlice);
      if (consultantTimeScheduleSlice?.error == null) {
        close();
      }
    }
  };

  return (
    <Drawer
      open={isOpen}
      title={'إضافة برنامج دوام جديد'}
      closable={false}
      size='large'
      placement='top'
      footer={
        <Space>
          <Button onClick={close}>إلغاء</Button>

          <Button
            onClick={() => {
              form.submit();
            }}
            type='primary'
          >
            إضافة
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              name='name'
              label='عنوان البرنامج'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider>الفترات</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.List name='periods'>
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <>
                        <div key={key}>
                          <Row gutter={16}>
                            <Col span={2}>
                              <MinusCircleFilled
                                style={{ color: '#f5222d' }}
                                onClick={() => {
                                  remove(name);
                                  updatePeriods();
                                }}
                              />
                            </Col>

                            <Col span={10}>
                              <Form.Item
                                {...restField}
                                label='توقيت الجلسة '
                                name={[name, 'start_time']}
                              >
                                <TimePicker
                                  format={'HH:mm'}
                                  onChange={updatePeriods}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={10}>
                              <Form.Item
                                {...restField}
                                label='مدة الجلسة'
                                name={[name, 'period']}
                                initialValue={isDefaultPeriods ? defaultPeriod : null}
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject('الرجاء ادخال مدة الجلسة');
                                    },
                                  }),
                                ]}
                              >
                                <TimePicker
                                  format={'HH:mm'}
                                  onChange={updatePeriods}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>

                        {name == fields.length - 1 && <Divider key={'dynamic divider'} />}
                      </>
                    ))}

                    <Row>
                      <Col
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Checkbox
                          checked={isDefaultPeriods}
                          onChange={(e) => {
                            setIsDefaultPeriods(e.target.checked);
                          }}
                        >
                          فترة افتراضية
                        </Checkbox>
                      </Col>

                      <Col
                        offset={1}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <TimePicker
                          format={'HH:mm'}
                          disabled={!isDefaultPeriods}
                          onChange={(value) => {
                            /*  const periods = [
                                ...form.getFieldValue('periods'),
                              ];
                              periods.forEach((p) => {
                                if (p.period) p.period = value;
                              });
                              form.setFieldValue('periods', periods);
                              */
                            setDefaultPeriod(value);
                          }}
                        />
                      </Col>

                      <Col offset={1}>
                        <Button
                          onClick={() => {
                            add();
                          }}
                        >
                          إضافة فترة
                        </Button>
                      </Col>
                    </Row>
                  </>
                );
              }}
            </Form.List>
          </Col>

          <Col
            span={12}
            style={{
              marginTop: '2.5%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TimeSchedule periods={periods} />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default AddPeriodsScheduleDrawer;
