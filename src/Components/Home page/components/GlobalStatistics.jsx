import { SolutionOutlined, MobileOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { Card, Carousel, Col, Row, Statistic } from 'antd';

function GlobalStatistics({
  customers,
  appCustomers,
  employees,
  verifiedCustomers,
  verifiedAppCustomers,
  activeEmployees,
}) {
  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fff1f0' }}
          >
            <Statistic
              title={<span style={{ color: 'black' }}>المستفيدين</span>}
              value={customers}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fcffe6' }}
          >
            <Statistic
              title={<span style={{ color: 'black' }}>مستخدمي التطبيق</span>}
              value={appCustomers}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<MobileOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#e6f4ff' }}
          >
            <Statistic
              title={<span style={{ color: 'black' }}>الموظفين</span>}
              value={employees}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<SolutionOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <br />

      <Row gutter={24}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fff1f0' }}
          >
            <Statistic
              title={
                <span style={{ color: 'black' }}>
                  {'المستفيدين الموثقين '} <CheckCircleOutlined style={{ color: 'green' }} />
                </span>
              }
              value={verifiedCustomers}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fcffe6' }}
          >
            <Statistic
              title={
                <span style={{ color: 'black' }}>
                  مستخدمي التطبيق الموثقين <CheckCircleOutlined style={{ color: 'green' }} />
                </span>
              }
              value={verifiedAppCustomers}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<MobileOutlined />}
              uffix={<CheckCircleOutlined style={{ color: 'green' }} />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#e6f4ff' }}
          >
            <Statistic
              title={<span style={{ color: 'black' }}>الموظفين النشطين</span>}
              value={activeEmployees}
              valueStyle={{ color: '#5c73c7' }}
              prefix={<SolutionOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default GlobalStatistics;
