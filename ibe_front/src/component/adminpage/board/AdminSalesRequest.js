import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSalesRequest.css';

const AdminSalesRequest = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [salesRequests, setSalesRequests] = useState([]);
  const [rejectionReason, setRejectionReason] = useState({}); // 거절 사유 저장용 상태
  const [errorMessage, setErrorMessage] = useState({}); // 에러 메시지 저장용 상태

  // 카테고리 매핑 함수
  const categoryMapping = {
    KIDS_CLOTHING: '아동 의류',
    KIDS_TOYS: '아동 완구',
    KIDS_BOOKS: '아동 도서',
    OUTDOOR_SUPPLIES: '외출 용품',
    MISC: '기타',
  };

  const mapCategory = (category) => categoryMapping[category] || category; // 매핑된 카테고리 반환

  useEffect(() => {
    const fetchSalesRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/salesrequest'
        );
        const requests = response.data.map((request) => ({
          id: request.productId, // Assuming productId is unique
          category: mapCategory(request.productCategory), // 매핑된 카테고리 사용
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

  const handleApproval = async (productId) => {
    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/yes`, {
        productId,
      });
      // 요청 승인 후 상태 업데이트, 예: 목록 새로고침
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
    } catch (error) {
      console.error('Error approving sales request:', error);
    }
  };

  const handleRejectionClick = async (productId) => {
    const rejectionText = rejectionReason[productId] || '';
    if (!rejectionText) {
      setErrorMessage({
        ...errorMessage,
        [productId]: '거절 사유를 입력해주세요.', // 에러 메시지 설정
      });
      return;
    }

    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/no`, {
        productId,
        rejectionText,
      });
      // 성공적으로 거절한 후 상태 업데이트
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
      setErrorMessage({ ...errorMessage, [productId]: '' }); // 에러 메시지 초기화
    } catch (error) {
      console.error('Error rejecting sales request:', error);
    }
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
                    <button
                      className="action-button"
                      onClick={() => handleApproval(request.id)} // 승인 버튼 클릭 시 호출
                    >
                      승인
                    </button>
                    <button
                      className="action-button"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleRejectionClick(request.id)} // 거절 버튼 클릭 시 호출
                    >
                      거절
                    </button>
                  </div>
                  <textarea
                    placeholder="거절 사유 입력"
                    style={{ marginLeft: '10px', marginRight: '5px', width: '200px', height: '60px', marginTop: '10px' }} // textarea 스타일
                    value={rejectionReason[request.id] || ''}
                    onChange={(e) =>
                      setRejectionReason({
                        ...rejectionReason,
                        [request.id]: e.target.value,
                      })
                    }
                  />
                  {/* 거절 사유 입력 안내 메시지 */}
                  {errorMessage[request.id] && (
                    <span style={{ marginLeft: '10px', color: 'red' }}>
                      {errorMessage[request.id]}
                    </span>
                  )}
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
