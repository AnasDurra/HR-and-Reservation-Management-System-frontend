import { Typography } from 'antd';
import './Layout.css';
import SideBarItem from './SideBarItem';
import { items } from './items';

function SideBar() {
    return (
        <div className='SideBar'>
            <div style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ color: '#E4D39E', fontSize: '20px' }}>Qiam Center</Typography>
            </div>
            <ul className='SideBarList'>
                {items.map((item, key) => {
                    return (
                        <SideBarItem key={key} item={item} />
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;