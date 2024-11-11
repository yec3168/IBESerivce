import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInquiryList.css';

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('title'); // 검색 필드 상태
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 필터링 상태
  const itemsPerPage = 10;

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
        category:
          categoryMap[inquiry.inquiryCategory] || inquiry.inquiryCategory,
        title: inquiry.inquiryTitle,
        content: inquiry.inquiryContent,
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
        { inquiryId }
      );
      const { inquiryAnswerContent, inquiryAnswerCreatedAt } = response.data;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [inquiryId]: {
          responseContent: inquiryAnswerContent.replace(/\n/g, '<br />'),
          responseDate: `${new Date(
            inquiryAnswerCreatedAt
          ).getFullYear()}. ${String(
            new Date(inquiryAnswerCreatedAt).getMonth() + 1
          ).padStart(2, '0')}. ${String(
            new Date(inquiryAnswerCreatedAt).getDate()
          ).padStart(2, '0')}. ${String(
            new Date(inquiryAnswerCreatedAt).getHours()
          ).padStart(2, '0')}:${String(
            new Date(inquiryAnswerCreatedAt).getMinutes()
          ).padStart(2, '0')}`,
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

  const sortedInquiries = [...inquiries]
    .filter((inquiry) => {
      // 카테고리 필터링
      if (selectedCategory && inquiry.category !== selectedCategory) {
        return false;
      }
      // 검색어 필터링
      if (!submittedSearchTerm.trim()) {
        return true;
      }
      return selectedField === 'title'
        ? inquiry.title
            .toLowerCase()
            .includes(submittedSearchTerm.toLowerCase())
        : inquiry.nickname === submittedSearchTerm;
    })
    .sort((a, b) => b.id - a.id);

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
    // 총 페이지 수가 10개 이상일 경우
    if (totalPages > 10) {
      // 현재 페이지가 마지막 페이지 세트에 있을 경우, 첫 번째 페이지로 이동
      if (currentPage + 9 <= totalPages) {
        setCurrentPage(currentPage + 10);
      } else {
        setCurrentPage(totalPages);
      }
    } else {
      // 10개 이하일 경우, 마지막 페이지로 이동
      setCurrentPage(totalPages);
    }
  };

  const handlePreviousPageSet = () => {
    // 총 페이지 수가 10개 이상일 경우
    if (totalPages > 10) {
      // 현재 페이지가 첫 번째 페이지 세트에 있을 경우, 마지막 페이지 세트의 마지막 페이지로 이동
      if (currentPage - 10 > 0) {
        setCurrentPage(currentPage - 10);
      } else {
        setCurrentPage(1); // 첫 번째 세트의 첫 페이지로 이동
      }
    } else {
      // 10개 이하일 경우, 첫 번째 페이지로 이동
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm); // 조회 버튼 클릭 시 검색어 업데이트
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <h2 className="admin-il-h2">문의 관리 - 처리된 문의 목록</h2>

      <div className="admin-il-inquiry-list-container">
        <div className="admin-il-search-container">
          {/* 카테고리 필터링 콤보박스 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-il-category-select"
          >
            <option value="">전체 카테고리</option>
            <option value="포인트 결제">포인트 결제</option>
            <option value="포인트 환급">포인트 환급</option>
            <option value="배송 지연/누락">배송 지연/누락</option>
            <option value="물품 하자">물품 하자</option>
            <option value="기타">기타</option>
          </select>
          {/* 검색 필드 선택 콤보박스 */}
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="admin-il-search-select"
          >
            <option value="title">제목으로 검색</option>
            <option value="nickname">닉네임으로 검색</option>
          </select>

          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="admin-il-search-input"
          />
          <button onClick={handleSearch} className="admin-il-search-button">
            조회
          </button>
        </div>
        <div className="admin-il-inquiry-list-column">
          <div className="admin-il-column admin-il-id">ID</div>
          <div className="admin-il-column admin-il-category">카테고리</div>
          <div className="admin-il-column admin-il-title">제목</div>
          <div className="admin-il-column admin-il-nickname">닉네임</div>
          <div className="admin-il-column admin-il-date">신청일</div>
        </div>
        <div className="admin-il-inquiry-list">
          {currentItems.length === 0 ? (
            <div className="admin-il-no-results">검색 결과가 없습니다.</div>
          ) : (
            currentItems.map((inquiry) => (
              <div key={inquiry.id} className="admin-il-inquiry-list-item">
                <div
                  className="admin-il-inquiry-list-header"
                  onClick={() => toggleExpand(inquiry.id)}
                >
                  <div className="admin-il-column admin-il-id">
                    {inquiry.id}
                  </div>
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
                          <strong>답변일:</strong>{' '}
                          {answers[inquiry.id].responseDate}
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
            ))
          )}
        </div>

        <div className="admin-il-pagination">
          {totalPages > 1 && ( // 페이지가 2개 이상일 때만 버튼 표시
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="admin-il-pagination-button"
              >
                {'<<'}
              </button>
              <button
                onClick={handlePreviousPageSet}
                disabled={currentPage === 1}
                className="admin-il-pagination-button"
              >
                {'<'}
              </button>
              {Array.from(
                {
                  length: Math.min(
                    10,
                    totalPages - Math.floor((currentPage - 1) / 10) * 10
                  ),
                },
                (_, i) => {
                  const pageNumber =
                    Math.floor((currentPage - 1) / 10) * 10 + i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`admin-il-pagination-button ${
                        currentPage === pageNumber ? 'active' : ''
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}
              <button
                onClick={handleNextPageSet}
                disabled={currentPage === totalPages}
                className="admin-il-pagination-button"
              >
                {'>'}
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="admin-il-pagination-button"
              >
                {'>>'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminInquiryList;
