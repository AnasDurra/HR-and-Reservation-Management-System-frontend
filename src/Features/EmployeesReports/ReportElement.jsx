import { Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";

export default function ReportElement({ title, dates, setStartDate, setEndDate, checked, setChecked }) {

    const onChange = (e) => {
        setChecked(e.target.checked);
        if (dates) {
            setStartDate(null);
            setEndDate(null);
        }
    }

    const handleDateChange = (d) => {
        setStartDate(dayjs(d[0].$d).format('YYYY-MM-DD'));
        setEndDate(dayjs(d[1].$d).format('YYYY-MM-DD'));

        console.log(d);
    }

    return (
        <div className="reportElement">
            <Checkbox checked={checked} onChange={onChange}>{title}</Checkbox>
            {dates && checked ?
                <DatePicker.RangePicker onChange={(d) => handleDateChange(d)} placeholder={['تاريخ النهاية', 'تاريخ البداية']} />
                : null
            }
        </div>
    );
}