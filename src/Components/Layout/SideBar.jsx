import { Typography } from 'antd';
import './Layout.css';
import SideBarItem from './SideBarItem';
import { items } from './items';

function SideBar() {
    return (
        <div className='SideBar'>
            <div style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <img style={{userSelect: 'none'}} width='150px' src='./kisspng-real-madrid-c-f-campus-experience-football-fundac-estadio1-5b70c060912815.1429986415341159365946.jpg' /> */}
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