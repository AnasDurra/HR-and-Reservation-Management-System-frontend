import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel, Col, DatePicker, Divider, List, Row, Select, Statistic, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import GlobalStatistics from './components/GlobalStatistics';
import EventsCarousel from './components/EventsCarousel';
import { VictoryPie, VictoryLabel } from 'victory';
import AppointmentsPieChart from './components/AppointmentsPieChart';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardSlice, getNextStatistics, getPrevStatistics, getStatistics } from '../../redux/Dashboard/slice';
import RelevantStatistics from './components/RelevantStatistics';

const dateTypesMapping = {
  year: 'سنة',
  last30days: 'شهر',
  month: 'شهر',
  date: 'يوم',
};
const PickerWithType = ({ type, onChange }) => {
  if (type === 'time')
    return (
      <TimePicker
        bordered={false}
        onChange={onChange}
      />
    );
  if (type === 'date')
    return (
      <DatePicker
        bordered={false}
        onChange={onChange}
      />
    );
  return (
    <DatePicker
      picker={type}
      onChange={onChange}
      bordered={false}
    />
  );
};

function ViewHomePage() {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state?.dashboardSlice?.statistics);
  const prevStatistics = useSelector((state) => state?.dashboardSlice?.prevStatistics);
  const nextStatistics = useSelector((state) => state?.dashboardSlice?.nextStatistics);
  const [datetype, setDateType] = useState('last30days');
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const nextStartDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const nextEndDate = new Date();

    const prevStartDate = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);
    const prevEndDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (datetype === 'last30days') {
      dispatch(
        getNextStatistics({
          start_date: nextStartDate.toISOString().slice(0, 10),
          end_date: nextEndDate.toISOString().slice(0, 10),
        })
      );
      dispatch(
        getPrevStatistics({
          start_date: prevStartDate.toISOString().slice(0, 10),
          end_date: prevEndDate.toISOString().slice(0, 10),
        })
      );
    }
    setSelectedDate(null);
  }, [datetype]);

  useEffect(() => {
    if (selectedDate) {
      let nextStartDate;
      let nextEndDate;
      let prevStartDate;
      let prevEndDate;

      switch (datetype) {
        case 'date':
          nextStartDate = new Date(selectedDate);
          nextEndDate = new Date(selectedDate);
          prevStartDate = new Date(new Date(selectedDate).getTime() - 24 * 60 * 60 * 1000);
          prevEndDate = new Date(new Date(selectedDate).getTime() - 24 * 60 * 60 * 1000);
          break;

        case 'month':
          nextStartDate = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth(), 1);
          nextEndDate = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0);
          prevStartDate = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() - 1, 0);
          prevEndDate = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth(), -1);
          break;

        case 'year':
          nextStartDate = new Date(new Date(selectedDate).getFullYear(), 0, 1);
          nextEndDate = new Date(new Date(selectedDate).getFullYear(), 11, 31);
          prevStartDate = new Date(new Date(selectedDate).getFullYear() - 1, 0, 1);
          prevEndDate = new Date(new Date(selectedDate).getFullYear() - 1, 12, 1);
          break;

        default:
          break;
      }
      console.log(new Date(selectedDate)?.toISOString().slice(0, 10));
      console.log('nextStartDate', nextStartDate?.toISOString().slice(0, 10));
      console.log('nextEndDate', nextEndDate?.toISOString().slice(0, 10));
      console.log('prevStartDate', prevStartDate?.toISOString().slice(0, 10));
      console.log('prevEndDate', prevEndDate?.toISOString().slice(0, 10));

      dispatch(
        getNextStatistics({
          start_date: nextStartDate?.toISOString().slice(0, 10),
          end_date: nextEndDate?.toISOString().slice(0, 10),
        })
      );
      dispatch(
        getPrevStatistics({
          start_date: prevStartDate?.toISOString().slice(0, 10),
          end_date: prevEndDate?.toISOString().slice(0, 10),
        })
      );
    }
  }, [selectedDate]);

  return (
    <>
      <Row gutter={16}>
        <Col span={14}>
          <GlobalStatistics
            employees={statistics?.employees}
            activeEmployees={statistics?.workingEmployees}
            customers={statistics?.customers}
            appCustomers={statistics?.usingAppCustomers}
            verifiedCustomers={statistics?.totalVerifiedCustomers}
            verifiedAppCustomers={statistics?.verifiedUsingAppCustomers}
          />
        </Col>

        <Col
          offset={1}
          span={8}
        >
          <EventsCarousel events={statistics?.last_3_events} />
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
        <Col span={2}>
          <Select
            value={datetype}
            onChange={setDateType}
            style={{ width: '100%' }}
            bordered={false}
          >
            <Option value='date'>يوم </Option>
            <Option value='month'>شهر </Option>
            <Option value='last30days'>30 يوم</Option>
            {/* <Option value='quarter'>Quarter</Option> */}
            <Option value='year'>سنة</Option>
          </Select>
        </Col>

        {datetype != 'last30days' && (
          <Col span={3}>
            <PickerWithType
              type={datetype}
              onChange={(date) => setSelectedDate(date.valueOf() + date.utcOffset() * 60 * 1000)}
            />
          </Col>
        )}
      </Row>

      <br />

      <Row>
        <RelevantStatistics
          prev={{
            prevCustomerByAppCount: prevStatistics?.newUsingAppCustomers,
            prevCustomerByEmployeeCount: prevStatistics?.newAddByEmployeeCustomers,
            prevEventsCount: prevStatistics?.events,
            prevVerificationsCount: prevStatistics?.verifiedCustomers,
          }}
          next={{
            nextCustomerByAppCount: nextStatistics?.newUsingAppCustomers,
            nextCustomerByEmployeeCount: nextStatistics?.newAddByEmployeeCustomers,
            nextEventsCount: nextStatistics?.events,
            nextVerificationsCount: nextStatistics?.verifiedCustomers,
          }}
          appointments={{
            cancelledAppByCenterCount:
              nextStatistics?.statusCounts['2']?.count + nextStatistics?.statusCounts['3']?.count,
            cancelledAppByCustomerCount: nextStatistics?.statusCounts['1']?.count,
            completedAppCount: nextStatistics?.statusCounts['4']?.count,
            missedAppByConsultantCount: nextStatistics?.statusCounts['8']?.count,
            missedAppByCustomerCount: nextStatistics?.statusCounts['7']?.count,
            otherCasesCount:
              nextStatistics?.statusCounts['5']?.count +
              nextStatistics?.statusCounts['6']?.count +
              nextStatistics?.statusCounts['9']?.count,
          }}
          appointmentsCount={nextStatistics?.appointments}
          dateType={dateTypesMapping[datetype]}
        />
      </Row>

      <Divider />

      {/*  <Row>
        <Col
          offset={2}
          span={8}
        >
          <List
            header={'يحدث الان'}
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={<a href='https://ant.design'>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row> */}
    </>
  );
}
export default ViewHomePage;
