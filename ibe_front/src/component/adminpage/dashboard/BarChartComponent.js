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

    // 데이터 유형에 따라 툴팁에 표시할 값을 설정
    switch (dataKey) {
      case 'income':
        formattedValue = new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        }).format(payload[0].value);
        label = '수익';
        break;
      case 'connCount':
        formattedValue = `${payload[0].value}회`; // 연결 수는 회 단위로 표시
        label = '접속 횟수';
        break;
      case 'transCount':
        formattedValue = `${payload[0].value}건`; // 거래 수는 건 단위로 표시
        label = '거래 횟수';
        break;
      case 'uploadCount':
        formattedValue = `${payload[0].value}개`; // 업로드 수는 개 단위로 표시
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

  // 어제부터 7일간의 데이터 필터링
  const filteredData = DummyData.filter((item) => {
    const itemDate = new Date(item.daily);
    return itemDate >= lastWeek && itemDate <= yesterday;
  });

  // 필터링된 데이터 변환
  const transformedData = filteredData.map((item) => ({
    name: item.daily,
    value: item[dataKey],
  }));

  // 선택된 기간에 따른 데이터 집계
  const getAggregatedData = (timeFrame) => {
    if (timeFrame === 'daily') {
      return transformedData;
    } else if (timeFrame === 'monthly') {
      const monthlyData = [];
      for (let i = 0; i < 7; i++) {
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() - (i + 1));
        const month = targetDate.toLocaleString('default', { month: '2-digit' });
        const year = targetDate.getFullYear().toString().slice(-2); // 마지막 두 자릿수만 사용
  
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
  
        // 월간 데이터 포맷을 'YY년 MM월'로 변경
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
        // 년간 데이터 포맷을 'YYYY년'로 변경
        yearlyData.push({ name: `${targetYear}년`, value: incomeSum });
      }
      return yearlyData.reverse();
    }
    return [];
  };
  

  // 집계된 데이터 가져오기
  const aggregatedData = getAggregatedData(timeFrame);

  // 데이터 키에 따른 막대 색상 지정
  const barColor = {
    income: '#8884d8',
    connCount: '#82ca9d',
    transCount: '#ffc658',
    uploadCount: '#ff8042',
  };

  // 기간과 데이터 유형에 따른 타이틀 설정
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

  // Y축 눈금 포맷터 함수
  const yAxisTickFormatter = (value) => {
    if (value === 0) {
      return value; // 0인 경우에는 만 단위를 표시하지 않음
    }
    if (dataKey === 'income') {
      return `${value / 10000}만`; // 만 단위로 표시 및 단위 추가
    }
    return value;
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
          <XAxis dataKey="name" reversed={timeFrame === 'daily'} />
          <YAxis tickFormatter={yAxisTickFormatter} /> {/* Y축 포맷팅 추가 */}
          <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
          <Bar dataKey="value" fill={barColor[dataKey]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
