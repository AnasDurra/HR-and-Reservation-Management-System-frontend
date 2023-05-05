import { useLocation, useNavigate } from "react-router-dom";

function SubItem({ subItems, open }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <ul className={open ? 'SubItemsOpened' : 'SubItems'} >
            {subItems?.map((subItem, key) => {
                return (
                    <li
                        onClick={() => handleClick(subItem.path)}
                        className={location.pathname === subItem.path ? "SubItem activeSubItem" : "SubItem"}
                        key={key}
                    >
                        {subItem.text}
                    </li>
                );
            })}
        </ul>
    );
}

export default SubItem;