import { DeleteOutlined, SmileOutlined, UserAddOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';

function EventCard({
  eventStatus,
  customerName,
  startTime,
  endTime,
  onCustomerTagClick,
  editable,
  onAddUserClick,
  onRemoveUserClick,
  onRemoveClick,
}) {
  return (
    <Card
      actions={[
        <UserAddOutlined
          onClick={onAddUserClick}
          style={{ fontSize: '135%' }}
        />,
        <UserDeleteOutlined
          onClick={onRemoveUserClick}
          style={{ fontSize: '135%' }}
        />,
        <DeleteOutlined
          onClick={onRemoveClick}
          style={{ fontSize: '135%' }}
        />,
      ].filter((_, index) => {
        switch (index) {
          case 0:
            return editable && !customerName ? true : false;
          case 1:
            return editable && customerName ? true : false;
          case 2:
            return true;
          default:
            return false;
        }
      })}
      title={
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {eventStatus}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {` ${startTime} - ${endTime}`}
          </div>
        </>
      }
      style={{ width: '100%', margin: '1rem 0.1rem' }}
      headStyle={{ backgroundColor: '#d9f7be' }}
    >
      <Meta
        description={
          <div style={{}}>
            {customerName && (
              <Tag
                className='user-tag'
                icon={<UserOutlined />}
                color='default'
                onClick={onCustomerTagClick}
              >
                {customerName}
              </Tag>
            )}
          </div>
        }
      />
    </Card>
  );
}
export default EventCard;
