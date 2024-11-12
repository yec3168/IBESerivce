import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminViewPost.css';

const AdminViewPostSale = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSearchTerm, setFilteredSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedNotes, setSelectedNotes] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [modalContent, setModalContent] = useState(null); // Updated state to store modal content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const tradeStateMap = {
    TRADING_AVAILABLE: '거래 가능',
    TRADE_COMPLETED: '거래 완료',
  };

  const statusMap = {
    STATUS_WAIT: '등록중',
    STATUS_APPROVE: '등록됨',
    STATUS_REJECT: '반려됨',
    STATUS_DELETE: '삭제됨',
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/viewpost/sale'
        );
        const sortedData = response.data.sort(
          (a, b) => b.productId - a.productId
        );
        setSalesData(sortedData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = salesData.filter((item) => {
    const matchesSearchTerm = () => {
      const lowerSearchTerm = filteredSearchTerm.toLowerCase();
      if (searchCategory === 'title') {
        return item.productTitle.toLowerCase().includes(lowerSearchTerm);
      } else if (searchCategory === 'buyer') {
        return item.memberNickName.toLowerCase().includes(lowerSearchTerm);
      } else if (searchCategory === 'seller') {
        return item.memberNickName.toLowerCase().includes(lowerSearchTerm);
      }
      return true;
    };

    const matchesStatus = selectedStatus
      ? item.productTradeState === selectedStatus
      : true;

    const matchesNotes = selectedNotes
      ? item.productUploadStatus === selectedNotes
      : true;

    return (
      matchesSearchTerm() &&
      matchesStatus &&
      matchesNotes &&
      item.productUploadStatus !== 'STATUS_WAIT'
    );
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

  const pageLimit = 10;
  const startIndex = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  const endIndex = Math.min(startIndex + pageLimit, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  const goToNextPage = () => {
    const newPage = startIndex + pageLimit + 1;
    if (newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const goToPreviousPage = () => {
    const newPage = startIndex - pageLimit + pageLimit;
    if (newPage >= 1) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSearch = () => {
    setFilteredSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const openModal = (item) => {
    // Passing full item to modal so we can display title, seller, rejection reason, etc.
    const modalData = {
      title: item.productTitle,
      seller: item.memberNickName,
      content: item.productContent || '내용이 없습니다.',
      rejectionText: item.rejectionText,
    };
    setModalContent(modalData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="admin-vp-search-container">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">거래상태 선택</option>
          <option value="TRADING_AVAILABLE">거래 가능</option>
          <option value="TRADE_COMPLETED">거래 완료</option>
        </select>
        <select
          value={selectedNotes}
          onChange={(e) => {
            setSelectedNotes(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">등록상태 선택</option>
          <option value="STATUS_APPROVE">등록됨</option>
          <option value="STATUS_REJECT">반려됨</option>
          <option value="STATUS_DELETE">삭제됨</option>
        </select>
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="seller">판매자</option>
          <option value="buyer">구매자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button onClick={handleSearch}>조회</button>
      </div>
      <div className="admin-vp-sale-table">
        <div className="admin-vp-sale-row admin-vp-header">
          <div className="admin-vp-column id">ID</div>
          <div className="admin-vp-column title">제목</div>
          <div className="admin-vp-column status">거래상태</div>
          <div className="admin-vp-column point">가격</div>
          <div className="admin-vp-column buyer">구매자</div>
          <div className="admin-vp-column seller">판매자</div>
          <div className="admin-vp-column notes">등록상태</div>
          <div className="admin-vp-column uploadDate">업로드 날짜</div>
        </div>
        {currentItems.length === 0 ? (
          <div className="admin-vp-no-results">검색결과가 없습니다.</div>
        ) : (
          currentItems.map((item) => (
            <div
              className="admin-vp-sale-row"
              key={item.productId}
              onClick={() => {
                if (item.productUploadStatus === 'STATUS_REJECT') {
                  openModal(item); // Pass the entire item to the modal
                } else if (item.productUploadStatus === 'STATUS_APPROVE') {
                  window.open(
                    `http://localhost:3000/products/detail/${item.productId}`,
                    '_blank'
                  );
                }
              }}
              style={{
                cursor:
                  item.productUploadStatus === 'STATUS_REJECT'
                    ? 'pointer'
                    : item.productUploadStatus === 'STATUS_APPROVE'
                    ? 'pointer'
                    : 'default',
              }}
            >
              <div className="admin-vp-column id">{item.productId}</div>
              <div className="admin-vp-column title">{item.productTitle}</div>
              <div className="admin-vp-column status">
                {tradeStateMap[item.productTradeState]}
              </div>
              <div className="admin-vp-column point">
                {item.productPoint.toLocaleString()}P
              </div>
              <div className="admin-vp-column buyer">{item.buyerNickName}</div>
              <div className="admin-vp-column seller">
                {item.memberNickName}
              </div>
              <div className="admin-vp-column notes">
                {statusMap[item.productUploadStatus]}
              </div>
              <div className="admin-vp-column uploadDate">
                {item.productListedAt
                  ? new Date(item.productListedAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })
                  : ''}
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && modalContent && (
        <div className="admin-vp-modal">
          <div className="admin-vp-modal-content">
            <p>
              <strong>제목:</strong> {modalContent.title}
            </p>
            <p>
              <strong>판매자:</strong> {modalContent.seller}
            </p>
            <p>
              <strong>내용:</strong> {modalContent.content}
            </p>
            <p>
              <strong>반려사유:</strong> {modalContent.rejectionText}
            </p>
            <button className="admin-vp-close-btn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
      {/* 페이지 버튼 표시 조건 추가 */}
      {filteredItems.length > itemsPerPage && (
        <div className="admin-vp-pagination">
          <button
            className="admin-vp-pagination-btn"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            {'<<'}
          </button>
          <button
            className="admin-vp-pagination-btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {visiblePageNumbers.map((number) => (
            <button
              key={number}
              className={`admin-vp-pagination-btn ${
                currentPage === number ? 'active' : ''
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="admin-vp-pagination-btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
          <button
            className="admin-vp-pagination-btn"
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            {'>>'}
          </button>
        </div>
      )}
    </>
  );
};

export default AdminViewPostSale;
