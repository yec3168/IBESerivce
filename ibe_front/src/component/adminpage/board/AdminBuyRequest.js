import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBuyRequest.css';

const AdminBuyRequest = () => {
  const [buyRequests, setBuyRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10); // 페이지당 10개의 리스트
  const [searchTerm, setSearchTerm] = useState(''); // 검색 상태
  const [selectedState, setSelectedState] = useState(''); // 구매상태 선택
  const [filteredRequests, setFilteredRequests] = useState([]); // 필터된 요청 상태

  useEffect(() => {
    const fetchBuyRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/buyrequest'
        );
        setBuyRequests(response.data);
        setFilteredRequests(response.data); // 페이지 로딩 시 필터된 데이터를 전체로 설정
      } catch (error) {
        console.error('Error fetching buy requests:', error);
      }
    };

    fetchBuyRequests();
  }, []);

  // Function to format date as YYYY. MM. DD. HH:mm
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(
      new Date(dateString)
    );
  };

  // Function to map order state to Korean labels
  const mapOrderState = (state) => {
    const stateMapping = {
      AVAILABLE: '거래 가능',
      COMPLETED: '거래 완료',
      SHIPPING: '배송 중',
      DELIVERED: '배송 완료',
      REJECTED: '구매 거부',
    };
    return stateMapping[state] || state;
  };

  // Get current requests for the current page
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // Filter buy requests based on productId or selectedState (triggered by search button or Enter key)
  const handleSearch = () => {
    // 검색 시 첫 페이지로 리셋
    setCurrentPage(1);

    const filtered = buyRequests.filter((request) => {
      const matchesState =
        selectedState === '' || request.orderState === selectedState;
      const matchesProductId = request.productId
        .toString()
        .includes(searchTerm);

      return matchesState && matchesProductId;
    });

    setFilteredRequests(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle state change in dropdown
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setCurrentPage(1); // 상태 선택 시 첫 페이지로 리셋
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="admin-buy-request">
      <h2>게시판 관리 - 구매신청 목록</h2>

      <div className="admin-buy-request-list">
        {/* Search Input and State Filter */}
        <div className="admin-buy-request-search-container">
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">모든 상태</option>
            <option value="AVAILABLE">거래 가능</option>
            <option value="COMPLETED">거래 완료</option>
            <option value="SHIPPING">배송 중</option>
            <option value="DELIVERED">배송 완료</option>
            <option value="REJECTED">구매 거부</option>
          </select>

          <input
            type="text"
            placeholder="물품ID로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>조회</button>
        </div>

        <div className="admin-buy-request-header">
          <span>구매ID</span>
          <span>물품ID</span>
          <span>구매상태</span>
          <span>구매신청일</span>
          <span>배송일</span>
          <span>구매자 이메일</span>
          <span>판매자 이메일</span>
          <span>운송장 번호</span>
        </div>
        
        {/* Display filtered results or a message if no results */}
        {filteredRequests.length === 0 ? (
          <div className="admin-buy-request-no-results">검색결과가 없습니다.</div>
        ) : (
          currentRequests.map((request) => (
            <div key={request.orderId} className="admin-buy-request-row">
              <span>{request.orderId}</span>
              <span>{request.productId}</span>
              <span>{mapOrderState(request.orderState)}</span>
              <span>{formatDate(request.orderDate)}</span>
              <span>
                {request.orderDeliveryDate
                  ? formatDate(request.orderDeliveryDate)
                  : 'N/A'}
              </span>
              <span>{request.orderMemberEmail}</span>
              <span>{request.sellerMemberEmail}</span>
              <span>{request.orderWayBill || 'N/A'}</span>
            </div>
          ))
        )}

        {/* Only show pagination buttons if there are more than 10 requests */}
        {filteredRequests.length > 10 && (
          <div className="admin-buy-request-pagination">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              맨 처음
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>

            {/* Page Numbers */}
            {[...Array(10)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              맨 끝
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBuyRequest;
