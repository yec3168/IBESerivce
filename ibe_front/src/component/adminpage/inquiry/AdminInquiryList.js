import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInquiryList.css';

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수

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
      const response = await axios.get(
        'http://localhost:8080/admin/inquiry/answeredlist'
      );
      const fetchedInquiries = response.data.map((inquiry) => ({
        id: inquiry.inquiryId,
        category: categoryMap[inquiry.inquiryCategory] || inquiry.inquiryCategory,
        title: inquiry.inquiryTitle,
        content: inquiry.inquiryContent,
        nickname: inquiry.memberNickName,
        date: new Date(inquiry.inquiryCreatedAt).toLocaleDateString(),
      }));
      setInquiries(fetchedInquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      alert('문의 목록을 불러오는 데 실패했습니다.');
    }
  };

  const fetchAnswer = async (inquiryId) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/inquiry/getinquiryanswer',
        {
          inquiryId: inquiryId,
        }
      );
      const { inquiryAnswerContent, inquiryAnswerCreatedAt } = response.data;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [inquiryId]: {
          responseContent: inquiryAnswerContent.replace(/\n/g, '<br />'),
          responseDate: new Date(inquiryAnswerCreatedAt).toLocaleDateString(),
        },
      }));
    } catch (error) {
      console.error('Error fetching answer:', error);
      alert('답변을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const sortedInquiries = [...inquiries].sort((a, b) => b.id - a.id);

  // 현재 페이지에 해당하는 항목들만 보여주기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedInquiries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedInquiries.length / itemsPerPage);

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!answers[id]) {
        fetchAnswer(id);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPageSet = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 10, totalPages));
  };

  const handlePreviousPageSet = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 10, 1));
  };

  return (
    <>
      <h2 className="admin-il-h2">문의 관리 - 처리된 문의 목록</h2>
      <div className="admin-il-inquiry-list-container">
        <div className="admin-il-inquiry-list-column">
          <div className="admin-il-column admin-il-id">ID</div>
          <div className="admin-il-column admin-il-category">카테고리</div>
          <div className="admin-il-column admin-il-title">제목</div>
          <div className="admin-il-column admin-il-nickname">닉네임</div>
          <div className="admin-il-column admin-il-date">신청일</div>
        </div>
        <div className="admin-il-inquiry-list">
          {currentItems.map((inquiry) => (
            <div key={inquiry.id} className="admin-il-inquiry-list-item">
              <div
                className="admin-il-inquiry-list-header"
                onClick={() => toggleExpand(inquiry.id)}
              >
                <div className="admin-il-column admin-il-id">{inquiry.id}</div>
                <div className="admin-il-column admin-il-category">
                  {inquiry.category}
                </div>
                <div className="admin-il-column admin-il-title">
                  {inquiry.title}
                </div>
                <div className="admin-il-column admin-il-nickname">
                  {inquiry.nickname}
                </div>
                <div className="admin-il-column admin-il-date">
                  {inquiry.date}
                </div>
              </div>
              {expandedId === inquiry.id && (
                <div className="admin-il-inquiry-list-content">
                  <p>{inquiry.content}</p>
                  {answers[inquiry.id] ? (
                    <>
                      <p>
                        <strong>답변일:</strong> {answers[inquiry.id].responseDate}
                      </p>
                      <p>
                        <strong>답변 내용</strong>
                        <br />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: answers[inquiry.id].responseContent,
                          }}
                        />
                      </p>
                    </>
                  ) : (
                    <p>답변을 불러오는 중입니다...</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="admin-il-pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="admin-il-pagination-button"
          >
            맨 처음
          </button>
          <button
            onClick={handlePreviousPageSet}
            disabled={currentPage <= 10}
            className="admin-il-pagination-button"
          >
            이전
          </button>
          {Array.from({ length: Math.min(10, totalPages - Math.floor((currentPage - 1) / 10) * 10) }, (_, i) => {
            const pageNumber = Math.floor((currentPage - 1) / 10) * 10 + i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`admin-il-pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={handleNextPageSet}
            disabled={currentPage + 10 > totalPages}
            className="admin-il-pagination-button"
          >
            다음
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="admin-il-pagination-button"
          >
            맨 끝
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminInquiryList;
