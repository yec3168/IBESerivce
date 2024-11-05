import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSalesRequest.css';

const AdminSalesRequest = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [salesRequests, setSalesRequests] = useState([]);
  const [rejectionReason, setRejectionReason] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태

  const categoryMapping = {
    KIDS_CLOTHING: '아동 의류',
    KIDS_TOYS: '아동 완구',
    KIDS_BOOKS: '아동 도서',
    OUTDOOR_SUPPLIES: '외출 용품',
    MISC: '기타',
  };

  const mapCategory = (category) => categoryMapping[category] || category;

  useEffect(() => {
    const fetchSalesRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/board/salesrequest');
        const requests = response.data.map((request) => ({
          id: request.productId,
          category: mapCategory(request.productCategory),
          title: request.productTitle,
          nickname: request.memberNickName,
          date: request.productCreatedAt.split('T')[0],
          content: request.productContent,
          // images: request.productImages || [], // 이미지는 나중에 가져옴
        }));
        setSalesRequests(requests);
      } catch (error) {
        console.error('Error fetching sales requests:', error);
      }
    };

    fetchSalesRequests();
  }, []);

  const sortedRequests = [...salesRequests].sort((a, b) => new Date(b.date) - new Date(a.date));

  const toggleExpand = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    // 새로운 요청에 대해 이미지 URL을 요청
    const request = salesRequests.find((request) => request.id === id);
    if (request) {
      try {
        const response = await axios.post('http://localhost:8080/admin/board/salesrequest/img', { productId: request.id });
        setImages((prevImages) => ({
          ...prevImages,
          [id]: response.data.imagePath, // 받아온 이미지 경로 저장
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    setExpandedId(id);
  };

  const handleApproval = async (productId) => {
    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/yes`, { productId });
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
      alert('판매 요청이 승인되었습니다.');
    } catch (error) {
      console.error('Error approving sales request:', error);
    }
  };

  const handleRejectionClick = async (productId) => {
    const rejectionText = rejectionReason[productId] || '';
    if (!rejectionText) {
      setErrorMessage({
        ...errorMessage,
        [productId]: '거절 사유를 입력해주세요.',
      });
      return;
    }

    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/no`, {
        productId,
        rejectionText,
      });
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
      setErrorMessage({ ...errorMessage, [productId]: '' });
      alert('판매 요청이 거절되었습니다.');
    } catch (error) {
      console.error('Error rejecting sales request:', error);
    }
  };

  // 텍스트박스 자동 리사이징 함수
  const handleInputResize = (e, productId) => {
    e.target.style.height = 'auto'; // 높이 초기화
    e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞춰 높이 재설정
    setRejectionReason({
      ...rejectionReason,
      [productId]: e.target.value,
    });
  };

  return (
    <>
      <h2 className="admin-sr-title">게시판 관리 - 판매신청 목록</h2>
      <div className="admin-sr-sales-request-container">
        <div className="admin-sr-sales-request-column">
          <div className="admin-sr-column admin-sr-id">ID</div>
          <div className="admin-sr-column admin-sr-category">카테고리</div>
          <div className="admin-sr-column admin-sr-title">제목</div>
          <div className="admin-sr-column admin-sr-nickname">닉네임</div>
          <div className="admin-sr-column admin-sr-date">신청일</div>
        </div>
        {sortedRequests.map((request) => (
          <div key={request.id} className="admin-sr-sales-request-item">
            <div className="admin-sr-sales-request-header" onClick={() => toggleExpand(request.id)}>
              <div className="admin-sr-column admin-sr-id">{request.id}</div>
              <div className="admin-sr-column admin-sr-category">{request.category}</div>
              <div className="admin-sr-column admin-sr-title">{request.title}</div>
              <div className="admin-sr-column admin-sr-nickname">{request.nickname}</div>
              <div className="admin-sr-column admin-sr-date">
                {new Date(request.date).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            </div>
            {expandedId === request.id && (
              <div className="admin-sr-sales-request-content">
                {request.content}
                <div className="admin-sr-images-container">
                  {images[request.id] ? (
                    <img src={images[request.id]} alt={`상품 이미지 ${request.id}`} className="admin-sr-image" />
                  ) : (
                    <p>이미지가 없습니다.</p>
                  )}
                </div>
                <div className="admin-sr-button-container">
                  <button
                    className="admin-sr-action-button-yes"
                    onClick={() => handleApproval(request.id)}
                  >
                    승인
                  </button>
                  <button
                    className="admin-sr-action-button-no"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleRejectionClick(request.id)}
                  >
                    거절
                  </button>
                </div>
                <div className="admin-sr-textarea-container">
                  <textarea
                    placeholder="거절 사유 입력"
                    className="admin-sr-textarea"
                    value={rejectionReason[request.id] || ''}
                    onChange={(e) => handleInputResize(e, request.id)}
                    style={{ overflowY: 'hidden' }}
                  />
                </div>
                {errorMessage[request.id] && (
                  <div className="admin-sr-error-message-container">
                    <span className="admin-sr-error-message">{errorMessage[request.id]}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminSalesRequest;
