import { Dropdown } from 'antd';
import './Layout.css';
import { LogoutOutlined, MoreOutlined } from "@ant-design/icons";


function AppBar() {
    const items = [
        {
            key: '1',
            label: (
                <a>
                    طلب إجازة
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a>
                    طلب إزاحة دوام
                </a>
            ),
        },
    ];

    return (
        <div className="AppBar">
            <div className='AppBarItem'>
                <LogoutOutlined onClick={() => console.log('hey')} />
                <Dropdown
                    menu={{
                        items
                    }}
                >
                    <MoreOutlined />
                </Dropdown>
            </div>
        </div>
    );
}

export default AppBar;