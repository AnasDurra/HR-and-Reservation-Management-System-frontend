import {
    AccountBookOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Tag, Timeline } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState } from 'react';

function EventCard({
    onCancel,
    customerName,
    startTime,
    endTime,
    eventStatus,
    onCustomerTagClick,
}) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card
            // style={isHovered ? { minWidth:"80vh"} : {}}
            style={{ width: '100%', margin: '1rem 0.1rem' }}
            bodyStyle={{}}
            actions={[
                //  <SettingOutlined key='setting' />,
                //  <EditOutlined key='edit' />,
                //<EllipsisOutlined key='ellipsis' />,
                <CloseCircleOutlined
                    style={{ color: 'red' }}
                    onClick={onCancel}
                />,
            ]}
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
            headStyle={{ backgroundColor: '#d9f7be' }}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            <Meta
                description={
                    <>
                        <div style={{}}>
                            <Tag
                                icon={<UserOutlined />}
                                color='default'
                                onClick={onCustomerTagClick}
                            >
                                {customerName}
                            </Tag>
                        </div>
                    </>
                }
            />
        </Card>
    );
}
export default EventCard;
