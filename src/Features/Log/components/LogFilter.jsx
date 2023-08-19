import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, DatePicker, Form, Input, Row, Select } from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getActionedUsers, getActions, getAffectedUsers, getLogs } from '../../../redux/Features/Log/slice';
import { debounce } from 'lodash';
import moment from 'moment';
const { Panel } = Collapse;

const colorMapping = {
  1: '#FF0000',
  2: '#008000',
  3: '#808080',
};
const statusMapping = {
  1: 'حرج',
  2: 'متوسَط',
  3: 'منخفض',
};

const LogFilter = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const logSlice = useSelector((state) => state.logSlice);

  useEffect(() => {
    dispatch(getActions());
    dispatch(getActionedUsers());
    dispatch(getAffectedUsers());
  }, []);

  const onActionedUsersSearch = debounce((data) => dispatch(getActionedUsers({ name: data })), 1000);

  const onAffectedUsersSearch = debounce((data) => dispatch(getAffectedUsers({ name: data })), 1000);

  const resetFilters = () => form.resetFields();

  const filter = () => {
    console.log('log', form.getFieldsValue());
    dispatch(getLogs(form.getFieldsValue()));
  };

  const disabledEndDate = (endValue) => {
    const startValue = form.getFieldValue('start_date');
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.isBefore(startValue);
  };

  const disabledStartDate = (startValue) => {
    const endValue = form.getFieldValue('end_date');
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.isAfter(endValue);
  };

  return (
    <Collapse
      size='large'
      expandIconPosition='start'
      defaultActiveKey={'panel-1'}
    >
      <Panel
        header='الترشيح'
        key='panel-1'
      >
        <Form
          form={form}
          layout='vertical'
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name={'actioned_user'}
                label={'القائمين بالحدث'}
              >
                <Select
                  mode='multiple'
                  showSearch
                  onSearch={onActionedUsersSearch}
                  placeholder='انقر للاختيار'
                  style={{ width: '100%' }}
                  options={logSlice?.actionedUsers.map((user) => ({
                    label: `${user.name} (${user.user_id})`,
                    value: user.user_id,
                  }))}
                  filterOption={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name={['affected_user']}
                label={'المتأثرين بالحدث'}
              >
                <Select
                  mode='multiple'
                  showSearch
                  onSearch={onAffectedUsersSearch}
                  placeholder='انقر للاختيار'
                  style={{ width: '100%' }}
                  options={logSlice?.affectedUsers?.map((user) => ({
                    label: `(${user.user_id}) ${user.name} `,
                    value: user.user_id,
                  }))}
                  filterOption={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['action']}
                label={'الأحداث'}
              >
                <Select
                  mode='multiple'
                  placeholder='انقر للاختيار'
                  style={{ width: '100%' }}
                  options={logSlice?.actions?.map((action) => ({
                    label: `(${action.action_id}) ${action.name} `,
                    value: action.action_id,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={['action_severity']}
                label={'الدرجة'}
              >
                <Select
                  mode='multiple'
                  placeholder='انقر للاختيار'
                  style={{ width: '100%' }}
                  options={Object.keys(statusMapping).map((key) => ({
                    label: statusMapping[key],
                    value: key,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={'start_date'}
                noStyle
              />
              <label htmlFor='start_date'>الأحداث بدءًا من</label>
              <DatePicker
                style={{ marginTop: '0.4rem' }}
                id='start_date'
                disabledDate={disabledStartDate}
                onChange={(date, dateString) => {
                  const formattedDate = moment(date).format('YYYY-MM-DD');
                  form.setFieldValue('start_date', formattedDate);
                }}
              />
            </Col>

            <Col span={12}>
              <Form.Item
                name={'end_date'}
                noStyle
              />

              <label htmlFor='end_date'>الأحداث قبل تاريخ</label>
              <DatePicker
                style={{ marginTop: '0.4rem', marginBottom: '0.6rem' }}
                id='end_date'
                disabledDate={disabledEndDate}
                onChange={(date, dateString) => {
                  const formattedDate = moment(date).format('YYYY-MM-DD');
                  form.setFieldValue('end_date', formattedDate);
                }}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={7}>
              <Button type='primary'>
                <CheckOutlined onClick={filter} />
              </Button>
            </Col>

            <Col span={7}>
              <Button
                onClick={resetFilters}
                type='primary'
              >
                <ReloadOutlined />
              </Button>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default LogFilter;
