import React, { useState } from 'react';
import './AdminPage.css';
import BarChartComponent from './dashboard/BarChartComponent';
import PieChartComponent from './dashboard/PieChartComponent';

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedData, setSelectedData] = useState('defaultData'); // 기본 데이터 선택

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    alert('로그아웃되었습니다.'); // 예시
  };

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
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>IBE 관리자</h2>
        <nav>
          <ul>
            <li>
              <a
                href="#dashboard"
                onClick={() => handleMenuClick('dashboard')}
                className={activeMenu === 'dashboard' ? 'active' : ''}
              >
                대시보드
              </a>
            </li>
            <li>
              <a
                href="#board"
                onClick={() => handleMenuClick('board')}
                className={activeMenu === 'board' ? 'active' : ''}
              >
                게시판 관리
              </a>
            </li>
            <li>
              <a
                href="#users"
                onClick={() => handleMenuClick('users')}
                className={activeMenu === 'users' ? 'active' : ''}
              >
                사용자 관리
              </a>
            </li>
            <li>
              <a
                href="#settings"
                onClick={() => handleMenuClick('settings')}
                className={activeMenu === 'settings' ? 'active' : ''}
              >
                문의 관리
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header className="admin-header">
          <div className="account-info">
            <span>관리자계정id</span>
            <button className="admin-button" onClick={handleLogout}>
              로그아웃
            </button>
            <button className="admin-button" href="/">
              홈 화면으로 돌아가기
            </button>
          </div>
        </header>
        <h2 className="content-h2">대시보드</h2>
        <div className="stats-container">
          <div className="stat-box box-1">
            <div className="stat-item">접속횟수: {stats.loginCount}</div>
          </div>
          <div className="stat-box box-2">
            <div className="stat-item">거래횟수: {stats.transactionCount}</div>
          </div>
          <div className="stat-box box-3">
            <div className="stat-item">수입: {stats.income} 원</div>
          </div>
          <div className="stat-box box-4">
            <div className="stat-item">게시물 등록 수: {stats.postCount}</div>
          </div>
        </div>
        <section id="dashboard">
          <div className="dashboard-container">
            <div className="chart-box bar-chart">
              <h3>막대 그래프</h3>
              <select onChange={handleDataChange}>
                <option value="defaultData">기본 데이터</option>
                <option value="alternativeData">대체 데이터</option>
                {/* 다른 데이터 타입 추가 가능 */}
              </select>
              <BarChartComponent dataKey={selectedData} />
            </div>
            <div className="chart-box pie-chart">
              <h3>원형 그래프</h3>
              <PieChartComponent />
            </div>
          </div>
        </section>
        <div className="stats-summary">
          <h3>누계 정보</h3>
          <div className="summary-item">
            <span>접속횟수:</span>
            <span>{stats.loginCount}</span>
          </div>
          <div className="summary-item">
            <span>거래횟수:</span>
            <span>{stats.transactionCount}</span>
          </div>
          <div className="summary-item">
            <span>수익:</span>
            <span>{stats.income} 원</span>
          </div>
          <div className="summary-item">
            <span>게시물 등록 수:</span>
            <span>{stats.postCount}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
