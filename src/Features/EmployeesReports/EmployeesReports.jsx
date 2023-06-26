import { Button, Select, Typography } from "antd";
import './EmployeesReports.css';
import { useState } from "react";
import ReportElement from "./ReportElement";
import AxiosInstance from "../../redux/utils/axiosInstance";
import { handleError, handleResponse } from "../../redux/utils/helpers";

function EmployeesReports() {

    const { Option } = Select;

    const [selectedEmployee, setSelectedEmployee] = useState();

    const [checkedEmployeeProfileReport, setCheckedEmployeeProfileReport] = useState(false);

    const [checkedAbsenceReport, setCheckedAbsenceReport] = useState(false);
    const [absenceStartDate, setAbsenceStartDate] = useState(null);
    const [absenceEndDate, setAbsenceEndDate] = useState(null);

    const [checkedAttendanceReport, setCheckedAttendanceReport] = useState(false);
    const [attendanceStartDate, setAttendanceStartDate] = useState(null);
    const [attendanceEndDate, setAttendanceEndDate] = useState(null);

    const [checkedEmployeeLifeReport, setCheckedEmployeeLifeReport] = useState(false);

    const exmployees = [
        {
            id: 1,
            name: 'hadi',
            permissions: [1, 2],
        },
        {
            id: 2,
            name: 'anas',
            permissions: [2, 3],
        }
    ];

    const getReport = () => {
        if (selectedEmployee) {
            const params = new URLSearchParams();

            params.append('emp_id', 1);

            if(checkedAbsenceReport) {
                params.append('absence_report', true);

                if(absenceStartDate) {
                    params.append('absence_start_date', absenceStartDate);
                }

                if(absenceEndDate) {
                    params.append('absence_end_date', absenceEndDate);
                }

            }

            console.log(params.toString());

            AxiosInstance().post(`pdf?${params.toString()}`).then((response) => {
                handleResponse('تم تجهيز التقرير بنجاح');
            });
        } else {
            handleError('الرجاء اختيار موظف');
        }

    }


    return (
        <div className="employeesReportsContainer">
            <Typography.Title level={3}>إصدار تقرير خاص بموظف</Typography.Title>

            <Select
                onSelect={(id) => setSelectedEmployee(id)}
                showSearch
                placeholder="اختيار الموظف"
                filterOption={(input, option) => {
                    return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                }

                }
            >
                {exmployees.map((e) => <Option value={e.id} key={e.id}>{e.name}</Option>)}
            </Select>

            <ReportElement
                title={'تقرير الملف الشخصي للموظف'}
                checked={checkedEmployeeProfileReport}
                setChecked={setCheckedEmployeeProfileReport}
            />

            <ReportElement
                title={'تقرير الغياب'}
                dates
                checked={checkedAbsenceReport}
                setChecked={setCheckedAbsenceReport}
                setStartDate={setAbsenceStartDate}
                setEndDate={setAbsenceEndDate}
            />

            <ReportElement
                title={'تقرير الحضور'}
                dates
                checked={checkedAttendanceReport}
                setChecked={setCheckedAttendanceReport}
                setStartDate={setAttendanceStartDate}
                setEndDate={setAttendanceEndDate}
            />

            <ReportElement
                title={'تقرير تنقلات الموظف داخل المركز'}
                checked={checkedEmployeeLifeReport}
                setChecked={setCheckedEmployeeLifeReport}
            />

            <Button
                type="primary"
                onClick={getReport}
            >
                إصدار التقرير
            </Button>
        </div>
    );
}

export default EmployeesReports;