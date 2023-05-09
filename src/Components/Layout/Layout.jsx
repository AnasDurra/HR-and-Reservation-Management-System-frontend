import AppBar from './AppBar';
import Content from './Content';
import './Layout.css';
import ShowLayout from './ShowLayout';
import SideBar from './SideBar';

function Layout(props) {
    return (
        <ShowLayout child={props.children}>
            <div className='container'>
                <AppBar />
                <SideBar />
                <Content children={props.children} />
            </div>
        </ShowLayout>
    );
}

export default Layout;