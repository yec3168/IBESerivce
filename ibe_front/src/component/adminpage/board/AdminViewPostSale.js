import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminViewPost.css';

const AdminViewPostSale = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 입력 상태
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(''); // 필터링에 사용할 검색어
  const [searchCategory, setSearchCategory] = useState('title'); // 검색 카테고리 상태
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedNotes, setSelectedNotes] = useState('');
  const [salesData, setSalesData] = useState([]); // 판매 데이터 상태
  const itemsPerPage = 10;

  // 거래 상태와 비고 상태 매핑
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
        setSalesData(response.data); // 가져온 데이터로 상태 업데이트
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
      : true; // 거래상태 필터
    const matchesNotes = selectedNotes
      ? item.productUploadStatus === selectedNotes
      : true; // 비고 필터
    return matchesSearchTerm() && matchesStatus && matchesNotes;
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
    setFilteredSearchTerm(searchTerm); // 검색어를 필터링에 사용할 상태로 설정
    setCurrentPage(1); // 페이지 초기화
  };

  return (
    <>

      <h3>판매 게시글 목록</h3>
      <div className="admin-vp-search-container">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1); // 페이지 초기화
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
            setCurrentPage(1); // 페이지 초기화
          }}
        >
          <option value="">등록상태 선택</option>
          <option value="STATUS_WAIT">등록중</option>
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
          <div className="admin-vp-column buyer">구매자</div>
          <div className="admin-vp-column seller">판매자</div>
          <div className="admin-vp-column notes">등록상태</div>
          <div className="admin-vp-column uploadDate">업로드 날짜</div>
        </div>
        {currentItems.map((item) => (
          <div className="admin-vp-sale-row" key={item.productId}>
            <div className="admin-vp-column id">{item.productId}</div>
            <div className="admin-vp-column title">{item.productTitle}</div>
            <div className="admin-vp-column status">
              {tradeStateMap[item.productTradeState]}
            </div>
            <div className="admin-vp-column buyer">{item.memberNickName}</div>
            <div className="admin-vp-column seller">{item.memberNickName}</div>
            <div className="admin-vp-column notes">
              {statusMap[item.productUploadStatus]}
            </div>
            <div className="admin-vp-column uploadDate">
              {new Date(item.productListedAt).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="admin-vp-pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          맨 처음
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &lt; 이전
        </button>
        {visiblePageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
          다음 &gt;
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          맨 끝
        </button>
      </div>

    </>
  );
};

export default AdminViewPostSale;
