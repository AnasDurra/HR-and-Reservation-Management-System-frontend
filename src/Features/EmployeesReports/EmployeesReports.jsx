import { Button, Select, Typography } from "antd";
import './EmployeesReports.css';
import { useEffect, useState } from "react";
import ReportElement from "./ReportElement";
import AxiosInstance from "../../redux/utils/axiosInstance";
import { handleError, handleResponse } from "../../redux/utils/helpers";
import { getIndexedEmployees } from "../../redux/Features/Employee Profile/Employee/slice";
import { useDispatch, useSelector } from "react-redux";

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

    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeesSlice.indexedEmployees);
    const loading = useSelector(state => state.employeesSlice.loading);

    useEffect(() => {
        dispatch(getIndexedEmployees());
    }, [dispatch]);

    const getReport = () => {
        if (selectedEmployee) {
            const params = new URLSearchParams();

            params.append('emp_id', selectedEmployee);

            if (checkedAbsenceReport) {
                params.append('absence_report', true);

                if (absenceStartDate) {
                    params.append('absence_start_date', absenceStartDate);
                }

                if (absenceEndDate) {
                    params.append('absence_end_date', absenceEndDate);
                }
            }

            if (checkedAttendanceReport) {
                params.append('attendance_report', true);

                if (attendanceStartDate) {
                    params.append('attendance_start_date', attendanceStartDate);
                }

                if (attendanceEndDate) {
                    params.append('attendance_end_date', attendanceEndDate);
                }
            }

            if (checkedEmployeeLifeReport) {
                params.append('staffing_report', true);
            }

            AxiosInstance().get(`pdf?${params.toString()}`).then((response) => {
                handleResponse('تم تجهيز التقرير بنجاح');
            });
        } else {
            handleError('الرجاء اختيار موظف');
        }

    }

    const handleSearch = (data) => {
        console.log(data);
        dispatch(getIndexedEmployees({ name: data }));
    }


    return (
        <div className="employeesReportsContainer">
            <Typography.Title level={3}>إصدار تقرير خاص بموظف</Typography.Title>

            <Select
                loading={loading}
                onSearch={handleSearch}
                onSelect={(id) => setSelectedEmployee(id)}
                showSearch
                placeholder="اختيار الموظف"
                filterOption={false}
            >
                {employees.map((e) => <Option value={e.emp_id} key={e.emp_id}>{e.full_name}</Option>)}
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