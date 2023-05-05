import './Layout.css';
import { LogoutOutlined } from "@ant-design/icons";


function AppBar() {
    return (
        <div className="AppBar">
            <div className='AppBarItem'>
                <LogoutOutlined onClick={() => console.log('hey')} />
            </div>
        </div>
    );
}

export default AppBar;