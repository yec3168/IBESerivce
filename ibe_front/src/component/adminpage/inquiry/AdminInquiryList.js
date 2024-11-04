import React, { useState } from 'react';
import './AdminInquiryList.css';

const AdminInquiryList = () => {
  const [expandedId, setExpandedId] = useState(null);

  const inquiries = [
    {
      id: 1,
      category: '상품 A',
      title: '문의 A',
      nickname: '홍길동',
      date: '2024-11-01',
      content: '문의 A의 상세 내용입니다.',
      responder: '관리자 A',
      responseDate: '2024-11-02',
      responseContent: '문의에 대한 답변 A입니다.',
    },
    {
      id: 2,
      category: '상품 B',
      title: '문의 B',
      nickname: '김철수',
      date: '2024-11-02',
      content: '문의 B의 상세 내용입니다.',
      responder: '관리자 B',
      responseDate: '2024-11-03',
      responseContent: '문의에 대한 답변 B입니다.',
    },
    {
      id: 3,
      category: '상품 C',
      title: '문의 C',
      nickname: '이영희',
      date: '2024-11-03',
      content: '문의 C의 상세 내용입니다.',
      responder: '관리자 C',
      responseDate: '2024-11-04',
      responseContent: '문의에 대한 답변 C입니다.',
    },
    {
      id: 4,
      category: '상품 D',
      title: '문의 D',
      nickname: '박민수',
      date: '2024-11-04',
      content: '문의 D의 상세 내용입니다.',
      responder: '관리자 D',
      responseDate: '2024-11-05',
      responseContent: '문의에 대한 답변 D입니다.',
    },
  ];

  // 날짜 기준 내림차순 정렬
  const sortedInquiries = [...inquiries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <h2>처리된 문의 목록</h2>
      <div className="admin-il-inquiry-list-container">
        <div className="admin-il-inquiry-list-column">
          <div className="admin-il-column admin-il-id">ID</div>
          <div className="admin-il-column admin-il-category">카테고리</div>
          <div className="admin-il-column admin-il-title">제목</div>
          <div className="admin-il-column admin-il-nickname">닉네임</div>
          <div className="admin-il-column admin-il-date">신청일</div>
          <div className="admin-il-column admin-il-responder">답변자</div>
          <div className="admin-il-column admin-il-responseDate">답변일</div>
        </div>
        <div className="admin-il-inquiry-list">
          {sortedInquiries.map((inquiry) => (
            <div key={inquiry.id} className="admin-il-inquiry-list-item">
              <div
                className="admin-il-inquiry-list-header"
                onClick={() => toggleExpand(inquiry.id)}
              >
                <div className="admin-il-column admin-il-id">{inquiry.id}</div>
                <div className="admin-il-column admin-il-category">{inquiry.category}</div>
                <div className="admin-il-column admin-il-title">{inquiry.title}</div>
                <div className="admin-il-column admin-il-nickname">{inquiry.nickname}</div>
                <div className="admin-il-column admin-il-date">{inquiry.date}</div>
                <div className="admin-il-column admin-il-responder">{inquiry.responder}</div>
                <div className="admin-il-column admin-il-responseDate">{inquiry.responseDate}</div>
              </div>
              {expandedId === inquiry.id && (
                <div className="admin-il-inquiry-list-content">
                  <p>{inquiry.content}</p>
                  <p><strong>답변 내용:</strong> {inquiry.responseContent}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminInquiryList;
