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

function convertTimeToAMPM(array) {
  const convertedArray = array
    .map((item) => {
      const { start_time, end_time } = item;

      if (!start_time || !end_time) return null;

      const startHour = parseInt(start_time.split(':')[0], 10);
      const startMinute = parseInt(start_time.split(':')[1], 10);
      const startTimeAMPM = startHour >= 12 ? 'PM' : 'AM';
      const startHourAMPM = startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour;

      const endHour = parseInt(end_time.split(':')[0], 10);
      const endMinute = parseInt(end_time.split(':')[1], 10);
      const endTimeAMPM = endHour >= 12 ? 'PM' : 'AM';
      const endHourAMPM = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;

      const convertedItem = {
        start_time: `${startHourAMPM}:${startMinute.toString().padStart(2, '0')} ${startTimeAMPM}`,
        end_time: `${endHourAMPM}:${endMinute.toString().padStart(2, '0')} ${endTimeAMPM}`,
      };

      return convertedItem;
    })
    .filter((item) => item != null);

  return convertedArray;
}

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
                  ? convertTimeToAMPM(periods).flatMap((item) => {
                      return [
                        {
                          title: (
                            <h3
                              style={{
                                direction: 'ltr',
                              }}
                            >
                              {item.start_time}
                            </h3>
                          ),
                          status: 'finish',
                        },
                        {
                          title: (
                            <h3
                              style={{
                                direction: 'ltr',
                              }}
                            >
                              {item.end_time}
                            </h3>
                          ),
                          status: 'process',
                        },
                      ];
                    })
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
