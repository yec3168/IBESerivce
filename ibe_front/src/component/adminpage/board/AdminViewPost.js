import React, { useState } from 'react';
import './AdminViewPost.css';
import AdminViewPostInfo from './AdminViewPostInfo'; // 경로를 실제 위치에 맞게 수정하세요
import AdminViewPostSale from './AdminViewPostSale'; // 경로를 실제 위치에 맞게 수정하세요

const AdminViewPost = () => {
  const [view, setView] = useState('sale'); // 기본적으로 'sale'을 표시하도록 설정

  const handleInfoClick = () => {
    setView('info'); // Info 컴포넌트를 보여주기 위해 상태 업데이트
  };

  const handleSaleClick = () => {
    setView('sale'); // Sale 컴포넌트를 보여주기 위해 상태 업데이트
  };

  return (
    <>
      <h2 className="admin-vp-h2">게시판 관리 - 게시글 조회</h2>
      <div className="admin-vp-post-box">
        <div className="admin-vp-button-group">
          <button
            className={`admin-vp-sale-button ${view === 'sale' ? 'active' : ''}`}
            onClick={handleSaleClick}
          >
            판매 게시글 조회
          </button>
          <button
            className={`admin-vp-info-button ${view === 'info' ? 'active' : ''}`}
            onClick={handleInfoClick}
          >
            정보 게시글 조회
          </button>
        </div>

        {/* 기본적으로 Sale 컴포넌트를 출력 */}
        {view === 'sale' && <AdminViewPostSale />}
        {view === 'info' && <AdminViewPostInfo />}
      </div>
    </>
  );
};

export default AdminViewPost;
