import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './PieChartComponent.css';
import DummyData from './DummyData';

const getCategoryData = (dataKey) => {
  const categoryMap = {};

  DummyData.forEach((item) => {
    const { category, income, transCount } = item;

    if (!categoryMap[category]) {
      categoryMap[category] = { income: 0, transCount: 0 };
    }

    categoryMap[category].income += income;
    categoryMap[category].transCount += transCount;
  });

  return Object.keys(categoryMap).map((category) => ({
    name: category,
    value: categoryMap[category][dataKey],
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D9D9D9'];

const PieChartComponent = () => {
  const [dataKey, setDataKey] = useState('income');
  const data = getCategoryData(dataKey);
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0); // 총 합계 계산

  const title =
    dataKey === 'income' ? '카테고리별 누적 수익' : '카테고리별 거래 수';

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="admin-piechart-container">
      <h3 className="admin-piechart-title">{title}</h3>
      <div className="admin-piechart-control">
        <label className="admin-piechart-label">조회할 데이터: </label>
        <select
          className="admin-piechart-select"
          onChange={(e) => setDataKey(e.target.value)}
          value={dataKey}
        >
          <option value="income">수익</option>
          <option value="transCount">거래 수</option>
        </select>
      </div>
      <PieChart className="admin-piechart" width={400} height={400}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          labelLine={false} // 레이블을 표시하지 않음
          outerRadius={120}
          paddingAngle={0}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.value === 0
                  ? COLORS[COLORS.length - 1]
                  : COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => {
            const percent = ((value / totalValue) * 100).toFixed(0); // 퍼센트 계산
            const formattedValue =
              dataKey === 'income'
                ? `\\${formatNumber(Math.floor(value))} (${percent}%)`
                : `${formatNumber(Math.floor(value))} 건 (${percent}%)`;
            return [formattedValue, name];
          }}
          labelFormatter={(name) => `${name}`}
        />
        <Legend
          className="admin-piechart-legend"
          layout="vertical"
          verticalAlign="middle" // 범례를 가운데 정렬
          align="right" // 범례를 오른쪽으로 정렬
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
