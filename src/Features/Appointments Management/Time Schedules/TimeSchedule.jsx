import { Button, Card, Col, Grid, Popover, Row, Steps, Typography } from 'antd';
import Title from 'antd/es/skeleton/Title';

const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index} status: {status}
            </span>
        }
    >
        {dot}
    </Popover>
);

/* const items = [
  {
    title: <h3 style={{ direction: 'ltr' }}>11:00 pm</h3>,
    status: 'finish',
  },
  {
    title: <h3 style={{ direction: 'ltr' }}>11:40 pm</h3>,
    status: 'process',
  },
  {
    title: <h3 style={{ direction: 'ltr' }}>12:00 pm</h3>,
    status: 'finish',
  },
  {
    title: <h3 style={{ direction: 'ltr' }}>12:30 pm</h3>,
    status: 'process',
  },
  {
    title: <h3 style={{ direction: 'ltr' }}>4:00 pm</h3>,
    status: 'finish',
  },
  {
    title: <h3 style={{ direction: 'ltr' }}>5:00 pm</h3>,
    status: 'process',
  },
]; */

function TimeSchedule({ periods } = {}) {
    return (
        <>
            <>
                <Row>
                    <Col>
                        <Steps
                            progressDot={customDot}
                            size='small'
                            items={
                                periods && periods?.length
                                    ? periods
                                    : [
                                          {
                                              title: (
                                                  <h3
                                                      style={{
                                                          direction: 'ltr',
                                                      }}
                                                  >
                                                      12 am
                                                  </h3>
                                              ),
                                              status: 'process',
                                          },
                                          {
                                              title: (
                                                  <h3
                                                      style={{
                                                          direction: 'ltr',
                                                      }}
                                                  >
                                                      12 pm
                                                  </h3>
                                              ),
                                              status: 'process',
                                          },
                                      ]
                            }
                        />
                    </Col>
                </Row>
            </>
        </>
    );
}

export default TimeSchedule;
