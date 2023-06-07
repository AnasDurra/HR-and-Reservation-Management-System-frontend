import { Checkbox } from "antd";
import { useEffect, useState } from "react";

export default function DayComponent({ id, name, status, handleDayUpdate }) {
    const [checked, setChecked] = useState(status);

    const handleChange = (e) => {
        handleDayUpdate({id: id, status: e.target.checked});
    };

    return (
        <Checkbox onChange={(e) => handleChange(e)} onClick={() => setChecked(!checked)} checked={checked}>
            {name}
        </Checkbox>
    );
}