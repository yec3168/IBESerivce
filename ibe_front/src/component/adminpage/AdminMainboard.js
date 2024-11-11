import React, { useState, useEffect } from 'react';
import BarChartComponent from './dashboard/BarChartComponent'; // 실제 파일 경로에 맞게 수정하세요
import PieChartComponent from './dashboard/PieChartComponent'; // 실제 파일 경로에 맞게 수정하세요
import DummyData from './dashboard/DummyData'; // DummyData를 import 합니다.

const AdminMainboard = () => {
  const [selectedData, setSelectedData] = useState('defaultData'); // 기본 데이터 선택
  const [stats, setStats] = useState(null); // 첫 번째 항목을 저장할 상태
  const [totalStats, setTotalStats] = useState(null); // 누계 정보를 저장할 상태

  // DummyData의 첫 번째 항목과 누계 정보를 컴포넌트 최초 로드시 한 번만 설정합니다.
  useEffect(() => {
    setStats(DummyData[0]);
    const calculatedTotals = DummyData.reduce(
      (totals, item) => {
        totals.connCount += item.connCount;
        totals.transCount += item.transCount;
        totals.income += item.income;
        totals.uploadCount += item.uploadCount;
        return totals;
      },
      { connCount: 0, transCount: 0, income: 0, uploadCount: 0 }
    );
    setTotalStats(calculatedTotals);
  }, []); // 빈 배열로 의존성을 설정하여 최초 1회만 실행되도록 함

  // 3자리마다 ,를 추가하는 함수
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <h2 className="admin-main-content-h2">대시보드</h2>
      {stats && (
        <div className="admin-main-stats-container">
          <div className="admin-main-stat-box admin-main-box-1">
            <div className="admin-main-stat-item">일일접속횟수: {formatNumber(stats.connCount)} 회</div>
          </div>
          <div className="admin-main-stat-box admin-main-box-2">
            <div className="admin-main-stat-item">일일거래횟수: {formatNumber(stats.transCount)} 건</div>
          </div>
          <div className="admin-main-stat-box admin-main-box-3">
            <div className="admin-main-stat-item">일일수익: {formatNumber(stats.income)} 원</div>
          </div>
          <div className="admin-main-stat-box admin-main-box-4">
            <div className="admin-main-stat-item">일일 게시물 등록 수: {formatNumber(stats.uploadCount)} 개</div>
          </div>
        </div>
      )}
      <section id="dashboard">
        <div className="admin-main-dashboard-container">
          <div className="admin-main-chart-box admin-main-bar-chart">
            <BarChartComponent />
          </div>
          <div className="admin-main-chart-box admin-main-pie-chart">
            <PieChartComponent />
          </div>
        </div>
      </section>
      {totalStats && (
        <div className="admin-main-stats-summary">
          <h3>누계 정보</h3>
          <div className="admin-main-summary-item">
            <span>누적 접속 횟수</span>
            <span>{formatNumber(totalStats.connCount)} 회</span>
          </div>
          <div className="admin-main-summary-item">
            <span>누적 거래 횟수</span>
            <span>{formatNumber(totalStats.transCount)} 건</span>
          </div>
          <div className="admin-main-summary-item">
            <span>누적 수익</span>
            <span>{formatNumber(totalStats.income)} 원</span>
          </div>
          <div className="admin-main-summary-item">
            <span>누적 게시물 등록 수</span>
            <span>{formatNumber(totalStats.uploadCount)} 개</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMainboard;
