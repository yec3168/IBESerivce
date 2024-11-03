import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSalesRequest.css';

const AdminSalesRequest = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [salesRequests, setSalesRequests] = useState([]);

  useEffect(() => {
    const fetchSalesRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/salesrequest'
        );
        const requests = response.data.map((request) => ({
          id: request.productId, // Assuming productId is unique
          category: request.productCategory, // Adjust if needed
          title: request.productTitle,
          nickname: request.memberNickName,
          date: request.productCreatedAt.split('T')[0], // Format date if necessary
          content: request.productContent,
        }));
        setSalesRequests(requests);
      } catch (error) {
        console.error('Error fetching sales requests:', error);
      }
    };

    fetchSalesRequests();
  }, []);

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
