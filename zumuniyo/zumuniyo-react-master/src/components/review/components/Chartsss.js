import React, { useCallback, useState, useEffect } from "react";
// import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";

import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
  Area
} from 'recharts';


const data = [
  { name: 'Group A', value: 300 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Chartsss(props) {

  // const [data, setData] = useState([props.data]);
  const UsageAndBill = ({ tabButtonKey }) => {
    const [usageStatus, setUsageStatus] = useState([]);
  
    useEffect(() => {
      axios.get('/data/SmartView/usageAndBill.json')
        .then((res) => {
        const dataTemp = res.data[tabButtonKey].map((data) => {
          return {
            xAxis: data.MR_HHMI,
            usage: data.F_AP_QT,
            usageLast: data.LYEAR_F_AP_QT,
            bill: data.KWH_BILL,
          };
        });
        setUsageStatus([{}, ...dataTemp, {}]);
      });
    }, [tabButtonKey]);

  return (
    <ResponsiveContainer>
    <ComposedChart
      width={600}
      height={400}
      data={usageStatus}
      margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="xAxis" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="bill" barSize={30} fill="#7ac4c0" />
      <Line yAxisId="right" type="monotone" dataKey="usage" stroke="#ff7300" />
      <Line yAxisId="right" type="monotone" dataKey="usageLast" stroke="#8884d8" />
    </ComposedChart>
  </ResponsiveContainer>







    // <div>
    //   <PieChart width={700} height={700} style={{margin:"0 auto"}}>
    //   <Pie
    //     data={data}
    //     cx={200}
    //     cy={200}
    //     labelLine={false}
    //     label={renderCustomizedLabel}
    //     outerRadius={200}
    //     fill="#8884d8"
    //     dataKey="value"
    //   >
    //     {data.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //   </Pie>
    // </PieChart>
    // </div>
  )
}}
