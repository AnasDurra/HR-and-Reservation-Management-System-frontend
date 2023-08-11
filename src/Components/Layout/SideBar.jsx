import { Typography } from 'antd';
import './Layout.css';
import SideBarItem from './SideBarItem';
import { items } from './items';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function SideBar() {
    const permissionsReducer = useSelector(state => state.userReducer.permissions);
    const stringified = Cookies.get('perms');
    const permissions = stringified ? JSON.parse(stringified) : permissionsReducer;

    const isAllowed = (access) => {
        if (access) {
            return permissions.some(role => access.includes(role));
        }
        return true;
    }

    return (
        <div className='SideBar'>
            <div style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ color: 'rgb(12, 62, 237)', fontSize: '20px' }}>Qiam Center</Typography>
            </div>
            <ul className='SideBarList'>
                {items.map((item, key) => {
                    return (
                        (isAllowed(item?.access) ?
                            <SideBarItem key={key} item={item} />
                            : null)
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;