import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = {
  defaultData: [
    { name: 'January', value: 4000 },
    { name: 'February', value: 3000 },
    { name: 'March', value: 2000 },
    { name: 'April', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'June', value: 2390 },
    { name: 'July', value: 3490 },
  ],
  alternativeData: [
    { name: 'January', value: 2400 },
    { name: 'February', value: 1398 },
    { name: 'March', value: 9800 },
    { name: 'April', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'June', value: 3800 },
    { name: 'July', value: 4300 },
  ],
};

const BarChartComponent = ({ dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data[dataKey]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
