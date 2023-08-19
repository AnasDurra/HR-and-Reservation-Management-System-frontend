import { ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row, Statistic } from 'antd';
import { useState } from 'react';

const carouselContentStyle = {
  height: '240px',
  color: '#fff',
  lineHeight: '180px',
  textAlign: 'center',
  background: '#364d79',
};

function EventsCarousel({ events }) {
  const emptyEvents = [1, 2, 3];

  return (
    <Carousel autoplay={2}>
      {events?.length > 0
        ? events.map((event) => (
            <div>
              <h3 style={carouselContentStyle}>{event.title}</h3>
            </div>
          ))
        : emptyEvents.map((event) => (
            <div>
              <h3 style={carouselContentStyle}>لا يوجد فعّاليات</h3>
            </div>
          ))}
    </Carousel>
  );
}
export default EventsCarousel;
