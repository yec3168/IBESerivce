// src/dashboard/PieChartComponent.js
import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: '접속횟수', value: 12 },
  { name: '거래횟수', value: 45 },
  { name: '수익', value: 35 },
  { name: '게시물 등록 수', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = () => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        labelLine={false}
        label={({ name, percent }) =>
          `${name} (${(percent * 100).toFixed(0)}%)`
        }
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
