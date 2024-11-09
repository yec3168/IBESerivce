import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInquiryOrder.css';

const AdminInquiryOrder = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});

  // 카테고리 맵핑 객체
  const categoryMap = {
    POINT_CHARGE: '포인트 결제',
    POINT_PAYBACK: '포인트 환급',
    DELIVERY: '배송 지연/누락',
    PRODUCT_DEFECT: '물품 하자',
    INQ_MISC: '기타',
  };

  const fetchInquiries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/inquiry');
      const fetchedInquiries = response.data.map((inquiry) => ({
        inquiryId: inquiry.inquiryId,
        category:
          categoryMap[inquiry.inquiryCategory] || inquiry.inquiryCategory,
        title: inquiry.inquiryTitle,
        nickname: inquiry.memberNickName,
        date: `${new Date(inquiry.inquiryCreatedAt).getFullYear()}. ${String(
          new Date(inquiry.inquiryCreatedAt).getMonth() + 1
        ).padStart(2, '0')}. ${String(
          new Date(inquiry.inquiryCreatedAt).getDate()
        ).padStart(2, '0')}. ${String(
          new Date(inquiry.inquiryCreatedAt).getHours()
        ).padStart(2, '0')}:${String(
          new Date(inquiry.inquiryCreatedAt).getMinutes()
        ).padStart(2, '0')}`,
        content: inquiry.inquiryContent,
        memberId: inquiry.memberId,
      }));

      setInquiries(fetchedInquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      alert('문의 목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleExpand = (inquiryId) => {
    setExpandedId(expandedId === inquiryId ? null : inquiryId);
    setErrors({});
  };

  const handleResponseChange = (inquiryId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [inquiryId]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [inquiryId]: '',
    }));
  };

  const handleResponseSubmit = async (inquiryId, memberId) => {
    const inquiryAnswerContent = responses[inquiryId];
    if (!inquiryAnswerContent) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inquiryId]: '답변을 입력해 주세요',
      }));
      return;
    }

    try {
      await axios.post('http://localhost:8080/admin/inquiry/answer', {
        inquiryId,
        memberId,
        inquiryAnswerContent,
      });

      alert('답변이 제출되었습니다.');
      setResponses((prevResponses) => ({
        ...prevResponses,
        [inquiryId]: '',
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inquiryId]: '',
      }));

      // 리스트 갱신
      fetchInquiries();
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('답변 제출에 실패했습니다.');
    }
  };

  const sortedInquiries = [...inquiries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <h2 className="admin-io-h2">문의 관리 - 처리해야할 문의 목록</h2>
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
            <div
              key={inquiry.inquiryId}
              className="admin-io-inquiry-order-item"
            >
              <div
                className="admin-io-inquiry-order-header"
                onClick={() => toggleExpand(inquiry.inquiryId)}
              >
                <div className="admin-io-column admin-io-id">
                  {inquiry.inquiryId}
                </div>
                <div className="admin-io-column admin-io-category">
                  {inquiry.category}
                </div>
                <div className="admin-io-column admin-io-title">
                  {inquiry.title}
                </div>
                <div className="admin-io-column admin-io-nickname">
                  {inquiry.nickname}
                </div>
                <div className="admin-io-column admin-io-date">
                  {inquiry.date}
                </div>
              </div>
              {expandedId === inquiry.inquiryId && (
                <div className="admin-io-inquiry-order-content">
                  <p>{inquiry.content}</p>
                  <textarea
                    placeholder="답변을 입력하세요. (최대 250자)"
                    value={responses[inquiry.inquiryId] || ''}
                    onChange={(e) =>
                      handleResponseChange(inquiry.inquiryId, e.target.value)
                    }
                    onInput={(e) => {
                      e.target.style.height = 'auto'; // 높이를 초기화
                      e.target.style.height = `${e.target.scrollHeight}px`; // 컨텐츠 높이에 맞춰 자동 확장
                    }}
                    rows="3" // 최소 높이를 지정하여 초기 렌더링 시 크기가 설정되도록
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      resize: 'none', // 크기 조절을 비활성화
                      overflow: 'hidden', // 자동 높이에 맞춰 스크롤을 숨김
                    }}
                  />
                  {errors[inquiry.inquiryId] && (
                    <p style={{ color: 'red' }}>{errors[inquiry.inquiryId]}</p>
                  )}
                  <div className="admin-io-button-container">
                    <button
                      className="admin-io-action-button"
                      onClick={() =>
                        handleResponseSubmit(
                          inquiry.inquiryId,
                          inquiry.memberId
                        )
                      }
                    >
                      답변
                    </button>
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
