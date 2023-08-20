import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';

import { Card, Carousel, Col, Row, Statistic } from 'antd';

function TimedStatistics({
  prev: { prevCustomerByEmployeeCount, prevCustomerByAppCount, prevEventsCount, prevVerificationsCount },
  next: { nextCustomerByEmployeeCount, nextCustomerByAppCount, nextEventsCount, nextVerificationsCount },
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
                title={<span style={{ color: 'black' }}>مستفيدي لوحة التحكم (شهر)</span>}
                value={200}
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserOutlined />}
                suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#fafafa' }}
            >
              <Statistic
                title={<span style={{ color: 'black' }}>مستفيدي التطبيق (شهر)</span>}
                value={200}
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    <ArrowUpOutlined />
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
                title={<span style={{ color: 'black' }}>توثيق حساب (شهر)</span>}
                value={200}
                valueStyle={{ color: '#cf1322' }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    <ArrowDownOutlined />
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
                title={<span style={{ color: 'black' }}> فعالية (شهر)</span>}
                value={200}
                valueStyle={{ color: '#cf1322' }}
                prefix={<UserOutlined />}
                suffix={
                  <>
                    <ArrowDownOutlined />
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <AppointmentsPieChart />
      </Col>
    </>
  );
}
export default TimedStatistics;
