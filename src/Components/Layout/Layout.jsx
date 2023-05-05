import AppBar from './AppBar';
import Content from './Content';
import './Layout.css';
import SideBar from './SideBar';

function Layout(props) {
    return (
        <div className='container'>
            <AppBar />
            <SideBar />
            <Content children={props.children} />
        </div>
    );
}

export default Layout;