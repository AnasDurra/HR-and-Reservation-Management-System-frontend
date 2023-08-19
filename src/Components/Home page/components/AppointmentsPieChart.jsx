import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

/* const data = [
  { name: 'مكتمل', value: 400 },
  { name: 'غياب مستفيد', value: 300 },
  { name: 'غياب مستشار', value: 200 },
  { name: 'ملغى (مستفيد)', value: 200 },
  { name: 'ملغى (مستشار)', value: 300 },
]; */

const COLORS = ['#0088FE', '#00C49F', '#005994', '#FFBB28', '#FF8042','#d9d9d9'];

const renderActiveShape = ({ props, count }) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } =
    props;
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
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
      >
        {'مواعيد عيادة الأسرة'}
        <br />
      </text>
      <text
        x={cx}
        y={cy + cy * 0.15}
        dy={8}
        textAnchor='middle'
      >
        {`(${count ? count : 0})`}
        <br />
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      {/*   <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke='none'
      /> */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 90}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`${name} (${value})`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 90}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function AppointmentsPieChart({ data, count }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape({ props, count })}
          data={data}
          cx={'45%'}
          cy={122}
          innerRadius={60}
          outerRadius={86}
          fill='#8884d8'
          dataKey='value'
          onMouseEnter={onPieEnter}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
export default AppointmentsPieChart;
