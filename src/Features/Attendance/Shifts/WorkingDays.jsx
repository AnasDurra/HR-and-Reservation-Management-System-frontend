import { Button, Checkbox, Dropdown } from "antd";
import { useEffect, useState } from "react";
import DayComponent from "./DayComponent";

export default function WorkingDays({ workingDays, confirmUpdateWorkingDays }) {

    const [openDropDown, setOpenDropDown] = useState(false);
    const [items, setItems] = useState([]);
    const [newDays, setNewDays] = useState([]);

    useEffect(() => {
        console.log(newDays);
    }, [newDays]);

    const handleDayUpdate = (data) => {
        confirmUpdateWorkingDays(data);
    }

    useEffect(() => {
        let itms = [];
        workingDays.map(d => {
            itms = itms.concat({
                key: String(d.working_day_id),
                label: (
                    <DayComponent
                        id={d.working_day_id}
                        name={d.name}
                        status={d.status}
                        handleDayUpdate={handleDayUpdate}
                    />
                )
            });
        })
        itms = itms.concat({
            key: 99,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <Button onClick={() => confirmUpdateWorkingDays(newDays)} style={{ margin: '0 10px' }} type="primary" size="small">
                        تأكيد
                    </Button> */}
                    <Button onClick={() => setOpenDropDown(false)} size="small">
                        إغلاق
                    </Button>
                </div>
            ),
        })
        setItems(itms);
    }, [workingDays]);

    return (
        <Dropdown open={openDropDown} menu={{ items }}>
            <Button onClick={() => setOpenDropDown(!openDropDown)} style={{ margin: '10px' }}>
                أيام الدوام
            </Button>
        </Dropdown>
    );
}