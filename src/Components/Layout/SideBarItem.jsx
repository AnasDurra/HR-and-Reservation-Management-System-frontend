import { useEffect, useState } from 'react';
import './Layout.css';
import SubItems from './SubItems';

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from 'react-router-dom';

export default function SideBarItem({ item }) {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (item.items) {
            item.items.map(i => {
                if (location.pathname === i.path) {
                    setOpen(true);
                }
            })
        }
    }, []);

    const handleClick = () => {
        if (item?.items) {
            setOpen(!open);
        } else {
            navigate(item.path);
        }
    }

    return (
        <>
            <li className={((item.path && location.pathname === item.path) || open) ? "SideBarItem activeItem" : "SideBarItem"} onClick={handleClick}>
                <div id='icon'>
                    {item.icon}
                </div>

                <div id='text'>
                    {item.text}
                </div>

                {item?.items ?
                    <div id='expand'>
                        {open ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    </div> : null}
            </li>
            <SubItems open={open} subItems={item.items} />
        </>
    );
}