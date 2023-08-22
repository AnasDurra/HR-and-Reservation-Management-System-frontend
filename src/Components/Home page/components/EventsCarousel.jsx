import { ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row, Statistic } from 'antd';
import { useState } from 'react';
import { IMAGE_URL } from '../../../redux/utils/constants';

const carouselContentStyle = {
  height: '240px',
  color: '#fff',
  lineHeight: '180px',
  textAlign: 'center',
  background: '#364d79',
};

function EventsCarousel({ events }) {
  const emptyEvents = [1, 2, 3];

  const carouselContentStyle = {
    position: 'absolute',
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(12, 62, 237, 0.7)',
    padding: '10px',
    borderRadius: '12px'
  };

  return (
    <Carousel autoplay={2}>
      {events?.length > 0
        ? events.map((event) => (
          <div key={event.id}>
            <div style={{ position: 'relative' }}>
              <img
                src={IMAGE_URL.concat(event.image)}
                alt={event.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3 style={carouselContentStyle}>{event.title}</h3>
            </div>
          </div>
        ))
        :
        <div>
          <h3 style={carouselContentStyle}>لا يوجد فعّاليات</h3>
        </div>
      }
    </Carousel>
  );
}
export default EventsCarousel;
