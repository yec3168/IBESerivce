import React, { useState } from 'react';
import BarChartComponent from './dashboard/BarChartComponent'; // 실제 파일 경로에 맞게 수정하세요
import PieChartComponent from './dashboard/PieChartComponent'; // 실제 파일 경로에 맞게 수정하세요

const AdminMainboard = () => {
  const [selectedData, setSelectedData] = useState('defaultData'); // 기본 데이터 선택

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  // 예시 데이터
  const stats = {
    loginCount: 120,
    transactionCount: 45,
    income: 350000,
    postCount: 10,
  };

  return (
    <div>
      <h2 className="admin-main-content-h2">대시보드</h2>
      <div className="admin-main-stats-container">
        <div className="admin-main-stat-box admin-main-box-1">
          <div className="admin-main-stat-item">접속횟수: {stats.loginCount}</div>
        </div>
        <div className="admin-main-stat-box admin-main-box-2">
          <div className="admin-main-stat-item">거래횟수: {stats.transactionCount}</div>
        </div>
        <div className="admin-main-stat-box admin-main-box-3">
          <div className="admin-main-stat-item">수입: {stats.income} 원</div>
        </div>
        <div className="admin-main-stat-box admin-main-box-4">
          <div className="admin-main-stat-item">게시물 등록 수: {stats.postCount}</div>
        </div>
      </div>
      <section id="dashboard">
        <div className="admin-main-dashboard-container">
          <div className="admin-main-chart-box admin-main-bar-chart">
            <h3>막대 그래프</h3>
            <select onChange={handleDataChange}>
              <option value="defaultData">기본 데이터</option>
              <option value="alternativeData">대체 데이터</option>
              {/* 다른 데이터 타입 추가 가능 */}
            </select>
            <BarChartComponent dataKey={selectedData} />
          </div>
          <div className="admin-main-chart-box admin-main-pie-chart">
            <h3>원형 그래프</h3>
            <PieChartComponent />
          </div>
        </div>
      </section>
      <div className="admin-main-stats-summary">
        <h3>누계 정보</h3>
        <div className="admin-main-summary-item">
          <span>접속횟수:</span>
          <span>{stats.loginCount}</span>
        </div>
        <div className="admin-main-summary-item">
          <span>거래횟수:</span>
          <span>{stats.transactionCount}</span>
        </div>
        <div className="admin-main-summary-item">
          <span>수익:</span>
          <span>{stats.income} 원</span>
        </div>
        <div className="admin-main-summary-item">
          <span>게시물 등록 수:</span>
          <span>{stats.postCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminMainboard;
