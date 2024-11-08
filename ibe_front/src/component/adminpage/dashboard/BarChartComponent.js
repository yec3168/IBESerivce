import React, { useState } from 'react';
import './BarChartComponent.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DummyData from './DummyData';

const CustomTooltip = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    let formattedValue;
    let label;

    switch (dataKey) {
      case 'income':
        formattedValue = new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        }).format(payload[0].value);
        label = '수익';
        break;
      case 'connCount':
        formattedValue = `${payload[0].value}회`;
        label = '접속 횟수';
        break;
      case 'transCount':
        formattedValue = `${payload[0].value}건`;
        label = '거래 횟수';
        break;
      case 'uploadCount':
        formattedValue = `${payload[0].value}개`;
        label = '판매게시글 등록 수';
        break;
      default:
        formattedValue = payload[0].value;
        label = '';
    }

    return (
      <div
        className="admin-barchart-custom-tooltip"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        <p>{`${label}: ${formattedValue}`}</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = () => {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [dataKey, setDataKey] = useState('income');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(yesterday);
  lastWeek.setDate(yesterday.getDate() - 7);

  const filteredData = DummyData.filter((item) => {
    const itemDate = new Date(item.daily);
    return itemDate >= lastWeek && itemDate <= yesterday;
  });

  const transformedData = filteredData.map((item) => ({
    name: item.daily,
    value: item[dataKey],
  }));

  const getAggregatedData = (timeFrame) => {
    if (timeFrame === 'daily') {
      return transformedData;
    } else if (timeFrame === 'monthly') {
      const monthlyData = [];
      for (let i = 0; i < 7; i++) {
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() - (i + 1));
        const month = targetDate.toLocaleString('default', { month: '2-digit' });
        const year = targetDate.getFullYear().toString().slice(-2);

        const incomeSum = DummyData.reduce((sum, item) => {
          const itemDate = new Date(item.daily);
          if (
            itemDate.getFullYear() === targetDate.getFullYear() &&
            itemDate.getMonth() === targetDate.getMonth()
          ) {
            return sum + item[dataKey];
          }
          return sum;
        }, 0);

        monthlyData.push({ name: `${year}년 ${month}`, value: incomeSum });
      }
      return monthlyData.reverse();
    } else if (timeFrame === 'yearly') {
      const yearlyData = [];
      for (let i = 0; i < 7; i++) {
        const targetYear = today.getFullYear() - i;
        const incomeSum = DummyData.reduce((sum, item) => {
          const itemDate = new Date(item.daily);
          if (itemDate.getFullYear() === targetYear) {
            return sum + item[dataKey];
          }
          return sum;
        }, 0);
        yearlyData.push({ name: `${targetYear}년`, value: incomeSum });
      }
      return yearlyData.reverse();
    }
    return [];
  };

  const aggregatedData = getAggregatedData(timeFrame);

  const barColor = {
    income: '#8884d8',
    connCount: '#82ca9d',
    transCount: '#ffc658',
    uploadCount: '#ff8042',
  };

  const titleMap = {
    daily: '일간',
    monthly: '월간',
    yearly: '년간',
  };

  const dataTypeMap = {
    income: '수익',
    connCount: '접속 횟수',
    transCount: '거래 횟수',
    uploadCount: '판매게시글 등록 수',
  };

  const yAxisTickFormatter = (value) => {
    if (value === 0) {
      return value;
    }
    if (dataKey === 'income') {
      return `${value / 10000}만`;
    }
    return value;
  };

  // 날짜 형식을 MM월 DD일로 변경하는 함수
  const formatDailyDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}월 ${day}일`;
  };

  return (
    <div>
      <h2 className="admin-barchart-h2">{`${titleMap[timeFrame]} ${dataTypeMap[dataKey]}`}</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div>
          <label>조회할 기간</label>
          <select
            onChange={(e) => setTimeFrame(e.target.value)}
            value={timeFrame}
          >
            <option value="daily">일간</option>
            <option value="monthly">월간</option>
            <option value="yearly">년간</option>
          </select>
        </div>

        <div>
          <label>조회할 데이터</label>
          <select onChange={(e) => setDataKey(e.target.value)} value={dataKey}>
            <option value="income">수익</option>
            <option value="connCount">접속 횟수</option>
            <option value="transCount">거래 횟수</option>
            <option value="uploadCount">판매게시글 등록 수</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tickFormatter={timeFrame === 'daily' ? formatDailyDate : null} // daily일 때만 날짜 형식 변경
            reversed={timeFrame === 'daily'} 
          />
          <YAxis tickFormatter={yAxisTickFormatter} />
          <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
          <Bar dataKey="value" fill={barColor[dataKey]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
