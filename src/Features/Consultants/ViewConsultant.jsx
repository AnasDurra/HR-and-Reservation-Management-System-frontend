import { Button, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getConsultant } from "../../redux/consultants/reducer";
import { getClinics } from "../../redux/clinics/reducer";
import Spinner from "../../Components/Spinner/Spinner";
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';


function ViewConsultant() {

    const consultant = useSelector(state => state.consultantsReducer.consultant);
    const loading = useSelector(state => state.consultantsReducer.loading);
    const clinics = useSelector(state => state.clinicsReducer.clinics);
    const dispatch = useDispatch();
    const { consID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getClinics());
        if (consID) {
            dispatch(getConsultant({ id: consID }));
        }
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        { name: 'المواعيد المكتملة', value: 500 },
        { name: 'المواعيد الملغية(الاستشاري)', value: 300 },
        { name: 'المواعيد الملغية(المستفيد)', value: 300 },
        { name: 'المواعيد غير المحجوزة', value: 200 },
    ];

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 100} y={ey} textAnchor={textAnchor} fill="#333">{`العدد ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 100} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(النسبة ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (consultant) {
            setTimeout(() => {
                setShow(true);
            }, 200);
        }
    }, [consultant]);

    return (
        <Spinner loading={loading}>
            <div>
                <Descriptions bordered column={2} title="بيانات الاستشاري">
                    <Descriptions.Item label="المعرّف الشخصي">{consultant?.id}</Descriptions.Item>
                    <Descriptions.Item label="الاسم">{consultant?.first_name}</Descriptions.Item>
                    <Descriptions.Item label="الكنية">{consultant?.last_name}</Descriptions.Item>
                    <Descriptions.Item label="تاريخ الميلاد">{consultant?.birth_date}</Descriptions.Item>
                    <Descriptions.Item label="رقم الهاتف">{consultant?.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="البريد الألكتروني">{consultant?.user?.user_email}</Descriptions.Item>
                    <Descriptions.Item label="العنوان">{consultant?.address}</Descriptions.Item>
                    <Descriptions.Item label="العيادة">{clinics.map(c => c.id === consultant?.clinic_id ? c.name : "")}</Descriptions.Item>
                </Descriptions>

                {show ?
                    <div>
                        <ResponsiveContainer width={"100%"} height={500}>
                            <PieChart width={800} height={500}>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={120}
                                    outerRadius={160}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <Button
                            onClick={() => navigate('/consultants')}
                        >
                            العودة
                        </Button>
                    </div>
                    : null}

            </div>
        </Spinner>
    );
}

export default ViewConsultant;