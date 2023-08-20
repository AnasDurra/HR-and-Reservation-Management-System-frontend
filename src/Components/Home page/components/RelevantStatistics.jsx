import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row, Statistic } from 'antd';
import AppointmentsPieChart from './AppointmentsPieChart';

function calculatePercentage(newCount, oldCount) {
  if (!oldCount && !newCount) {
    return '0%';
  }

  if (!oldCount) {
    return '100%';
  }

  const percentage = ((newCount - oldCount) / oldCount) * 100;
  return Math.abs(percentage).toFixed(2) + '% ';
}

function RelevantStatistics({
  prev: { prevCustomerByEmployeeCount, prevCustomerByAppCount, prevEventsCount, prevVerificationsCount },
  next: { nextCustomerByEmployeeCount, nextCustomerByAppCount, nextEventsCount, nextVerificationsCount },
  appointments: {
    completedAppCount,
    cancelledAppByCenterCount,
    cancelledAppByCustomerCount,
    missedAppByCustomerCount,
    missedAppByConsultantCount,
    otherCasesCount,
  },
  appointmentsCount,
  dateType,
}) {
  return (
    <>
      <Col span={12}>
        <Row gutter={24}>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#fafafa' }}
            >
              <Statistic
                title={<span style={{ color: 'black' }}>مستفيدي لوحة التحكم {` (${dateType}) `}</span>}
                value={nextCustomerByEmployeeCount}
                valueStyle={{
                  color:
                    nextCustomerByEmployeeCount > prevCustomerByEmployeeCount
                      ? '#3f8600'
                      : nextCustomerByEmployeeCount == prevCustomerByEmployeeCount
                      ? '#333333'
                      : '#cf1322',
                }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    {nextCustomerByEmployeeCount > prevCustomerByEmployeeCount ? (
                      <ArrowUpOutlined />
                    ) : nextCustomerByEmployeeCount == prevCustomerByEmployeeCount ? (
                      <MinusOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    <span style={{ fontSize: '1rem' }}>
                      {' '}
                      {calculatePercentage(nextCustomerByEmployeeCount, prevCustomerByEmployeeCount)}
                    </span>
                  </>
                }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#fafafa' }}
            >
              <Statistic
                title={<span style={{ color: 'black' }}>مستفيدي التطبيق {` (${dateType}) `}</span>}
                value={nextCustomerByAppCount}
                valueStyle={{
                  color:
                    nextCustomerByAppCount > prevCustomerByAppCount
                      ? '#3f8600'
                      : nextCustomerByAppCount == prevCustomerByAppCount
                      ? '#333333'
                      : '#cf1322',
                }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    {nextCustomerByAppCount > prevCustomerByAppCount ? (
                      <ArrowUpOutlined />
                    ) : nextCustomerByAppCount == prevCustomerByAppCount ? (
                      <MinusOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    <span style={{ fontSize: '1rem' }}>
                      {' '}
                      {calculatePercentage(nextCustomerByAppCount, prevCustomerByAppCount)}
                    </span>
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={24}>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#fafafa' }}
            >
              <Statistic
                title={<span style={{ color: 'black' }}>توثيق حساب {` (${dateType}) `}</span>}
                value={nextVerificationsCount}
                valueStyle={{
                  color:
                    nextVerificationsCount > prevVerificationsCount
                      ? '#3f8600'
                      : nextVerificationsCount == prevVerificationsCount
                      ? '#333333'
                      : '#cf1322',
                }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    {nextVerificationsCount > prevVerificationsCount ? (
                      <ArrowUpOutlined />
                    ) : nextVerificationsCount == prevVerificationsCount ? (
                      <MinusOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    <span style={{ fontSize: '1rem' }}>
                      {' '}
                      {calculatePercentage(nextVerificationsCount, prevVerificationsCount)}
                    </span>
                  </>
                }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#fafafa' }}
            >
              <Statistic
                title={<span style={{ color: 'black' }}> فعالية {` (${dateType}) `}</span>}
                value={nextEventsCount}
                valueStyle={{
                  color:
                    nextEventsCount > prevEventsCount
                      ? '#3f8600'
                      : nextEventsCount == prevEventsCount
                      ? '#333333'
                      : '#cf1322',
                }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    {nextEventsCount > prevEventsCount ? (
                      <ArrowUpOutlined />
                    ) : nextEventsCount == prevEventsCount ? (
                      <MinusOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    <span style={{ fontSize: '1rem' }}> {calculatePercentage(nextEventsCount, prevEventsCount)}</span>
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <AppointmentsPieChart
          //TODO delete fake data
          data={[
            { name: 'مكتمل', value: completedAppCount + 1 },
            { name: 'غياب مستفيد', value: missedAppByCustomerCount + 1 },
            { name: 'غياب مستشار', value: missedAppByConsultantCount + 1 },
            { name: 'ملغى (مستفيد)', value: cancelledAppByCustomerCount + 1 },
            { name: 'ملغى (مركز)', value: cancelledAppByCenterCount + 1 },
            { name: 'اخرى', value: otherCasesCount + 1 },
          ]}
          count={appointmentsCount + 6}
        />
      </Col>
    </>
  );
}
export default RelevantStatistics;
