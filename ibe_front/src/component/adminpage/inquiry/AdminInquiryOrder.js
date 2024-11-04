import React, { useState } from 'react';
import './AdminInquiryOrder.css';

const AdminInquiryOrder = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [responses, setResponses] = useState({}); // 응답 저장을 위한 상태

  const inquiries = [
    {
      id: 1,
      category: '상품 A',
      title: '문의 A',
      nickname: '홍길동',
      date: '2024-11-01',
      content: '문의 A의 상세 내용입니다.',
    },
    {
      id: 2,
      category: '상품 B',
      title: '문의 B',
      nickname: '김철수',
      date: '2024-11-02',
      content: '문의 B의 상세 내용입니다.',
    },
    {
      id: 3,
      category: '상품 C',
      title: '문의 C',
      nickname: '이영희',
      date: '2024-11-03',
      content: '문의 C의 상세 내용입니다.',
    },
    {
      id: 4,
      category: '상품 D',
      title: '문의 D',
      nickname: '박민수',
      date: '2024-11-04',
      content: '문의 D의 상세 내용입니다.',
    },
  ];

  // 날짜 기준 내림차순 정렬
  const sortedInquiries = [...inquiries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleResponseChange = (id, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: value,
    }));
  };

  return (
    <>
      <h2>처리해야할 문의 목록</h2>
      <div className="admin-io-inquiry-order-container">
        <div className="admin-io-inquiry-order-column">
          <div className="admin-io-column admin-io-id">ID</div>
          <div className="admin-io-column admin-io-category">카테고리</div>
          <div className="admin-io-column admin-io-title">제목</div>
          <div className="admin-io-column admin-io-nickname">닉네임</div>
          <div className="admin-io-column admin-io-date">신청일</div>
        </div>
        <div className="admin-io-inquiry-order-list">
          {sortedInquiries.map((inquiry) => (
            <div key={inquiry.id} className="admin-io-inquiry-order-item">
              <div
                className="admin-io-inquiry-order-header"
                onClick={() => toggleExpand(inquiry.id)}
              >
                <div className="admin-io-column admin-io-id">{inquiry.id}</div>
                <div className="admin-io-column admin-io-category">{inquiry.category}</div>
                <div className="admin-io-column admin-io-title">{inquiry.title}</div>
                <div className="admin-io-column admin-io-nickname">{inquiry.nickname}</div>
                <div className="admin-io-column admin-io-date">{inquiry.date}</div>
              </div>
              {expandedId === inquiry.id && (
                <div className="admin-io-inquiry-order-content">
                  {inquiry.content}
                  <textarea
                    placeholder="답변을 입력하세요..."
                    value={responses[inquiry.id] || ''}
                    onChange={(e) =>
                      handleResponseChange(inquiry.id, e.target.value)
                    }
                    rows="4"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                  <div className="admin-io-button-container">
                    <button className="admin-io-action-button">답변</button>
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

export default AdminInquiryOrder;
