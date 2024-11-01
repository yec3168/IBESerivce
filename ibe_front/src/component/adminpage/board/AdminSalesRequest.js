import React, { useState } from 'react';
import './AdminSalesRequest.css';

const AdminSalesRequest = () => {
  const [expandedId, setExpandedId] = useState(null);

  const salesRequests = [
    {
      id: 1,
      category: '상품 A',
      title: '판매신청 A',
      nickname: '홍길동',
      date: '2024-11-01',
      content: '판매신청 A의 상세 내용입니다.',
    },
    {
      id: 2,
      category: '상품 B',
      title: '판매신청 B',
      nickname: '김철수',
      date: '2024-11-02',
      content: '판매신청 B의 상세 내용입니다.',
    },
    {
      id: 3,
      category: '상품 C',
      title: '판매신청 C',
      nickname: '이영희',
      date: '2024-11-03',
      content: '판매신청 C의 상세 내용입니다.',
    },
    {
      id: 4,
      category: '상품 D',
      title: '판매신청 D',
      nickname: '박민수',
      date: '2024-11-04',
      content: '판매신청 D의 상세 내용입니다.',
    },
  ];

  // 날짜 기준 내림차순 정렬
  const sortedRequests = [...salesRequests].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <h2>판매신청 목록</h2>
      <div className="sales-request-container">
        <div className="sales-request-column">
          <div className="column id">ID</div>
          <div className="column category">카테고리</div>
          <div className="column title">제목</div>
          <div className="column nickname">닉네임</div>
          <div className="column date">신청일</div>
        </div>
        <div className="sales-request-list">
          {sortedRequests.map((request) => (
            <div key={request.id} className="sales-request-item">
              <div
                className="sales-request-header"
                onClick={() => toggleExpand(request.id)}
              >
                <div className="column id">{request.id}</div>
                <div className="column category">{request.category}</div>
                <div className="column title">{request.title}</div>
                <div className="column nickname">{request.nickname}</div>
                <div className="column date">{request.date}</div>
              </div>
              {expandedId === request.id && (
                <div className="sales-request-content">
                  {request.content}
                  <div className="button-container">
                    <button className="action-button">승인</button>
                    <button className="action-button">거절</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSalesRequest;
