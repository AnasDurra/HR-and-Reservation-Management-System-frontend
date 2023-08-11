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
} from 'antd';
import { useState } from 'react';
import { PlusOutlined, MinusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import TimeSchedule from './TimeSchedule';
import { useForm } from 'antd/es/form/Form';

function formatPeriods(array) {
  const result = [];

  array.forEach((item) => {
    if (!item?.start_time || !item?.period) {
      return;
    }

    const startTime = new Date(item.start_time);
    const durationHours = new Date(item.period).getHours();
    const durationMinutes = new Date(item.period).getMinutes();

    const endTime = new Date(
      startTime.getTime() +
        durationHours * 60 * 60 * 1000 +
        durationMinutes * 60 * 1000
    );

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

function AddPeriodsScheduleDrawer({ isOpen, close, open } = {}) {
  const [periods, setPeriods] = useState([]);
  const [isDefaultPeriods, setIsDefaultPeriods] = useState(false);
  const [defaultPeriod, setDefaultPeriod] = useState();
  const [form] = useForm();

  const updatePeriods = () => {
    const unFormattedPeriods = form.getFieldsValue()['periods'];
    const sortedUnformattedPeriods = [...unFormattedPeriods].sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );
    const formattedPeriods = formatPeriods(sortedUnformattedPeriods);
    setPeriods(formattedPeriods);
  };

  const onFinish = () => {
    console.log(form.getFieldsValue()['periods']);
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
            type='primary'>
            إضافة
          </Button>
        </Space>
      }>
      <Form
        form={form}
        onFinish={onFinish}>
        <Row>
          <Col span={8}>
            <Form.Item
              name='name'
              label='عنوان البرنامج'
              rules={[{ required: true }]}>
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
                                  name={[name, 'start_time']}>
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
                                  name={[name, 'period']}>
                                  <TimePicker
                                    format={'HH:mm'}
                                    defaultValue={
                                      isDefaultPeriods ? defaultPeriod : null
                                    }
                                    onChange={updatePeriods}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>

                          {name == fields.length - 1 && (
                            <Divider key={'dynamic divider'} />
                          )}
                        </>
                      ))}

                      <Row>
                        <Col
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Checkbox
                            checked={isDefaultPeriods}
                            onChange={(e) => {
                              setIsDefaultPeriods(e.target.checked);
                            }}>
                            فترة افتراضية
                          </Checkbox>
                        </Col>

                        <Col
                          offset={1}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
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
                            }}>
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
            }}>
            <TimeSchedule periods={periods} />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default AddPeriodsScheduleDrawer;
