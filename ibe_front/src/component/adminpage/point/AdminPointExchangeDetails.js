import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPointExchangeDetails.css';

const AdminPointExchangeDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nickname'); // 기본 검색 타입 설정
  const [selectedStatus, setSelectedStatus] = useState(''); // 거래상태 선택
  const [selectedNotes, setSelectedNotes] = useState(''); // 비고 선택
  const [filteredItems, setFilteredItems] = useState([]); // 필터링된 항목 저장
  const itemsPerPage = 10;

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/point');
        const sortedData = response.data.sort(
          (a, b) => new Date(b.entryDate) - new Date(a.entryDate)
        ); // 지급일(entryDate) 기준으로 내림차순 정렬
        setFilteredItems(sortedData);
      } catch (error) {
        console.error('Error fetching point exchange data:', error);
      }
    };

    fetchPointData();
  }, []);

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 버튼 생성
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

  // 현재 페이지의 인덱스를 계산하여 페이지 버튼 범위를 결정합니다.
  const pageLimit = 10; // 최대 페이지 버튼 개수
  const startIndex = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  const endIndex = Math.min(startIndex + pageLimit, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  // 다음 페이지로 이동
  const goToNextPage = () => {
    const newPage = startIndex + pageLimit + 1; // 다음 페이지 그룹의 첫 페이지
    if (newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(totalPages);
    }
  };

  // 이전 페이지로 이동
  const goToPreviousPage = () => {
    const newPage = startIndex - pageLimit + pageLimit; // 이전 페이지 그룹의 마지막 페이지
    if (newPage >= 1) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(1); // 첫 페이지 그룹이라면 첫 번째 페이지로 이동
    }
  };

  // 맨 처음 페이지로 이동
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // 맨 끝 페이지로 이동
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // 조회 버튼 클릭 시 필터링
  const handleSearch = () => {
    const newFilteredItems = filteredItems.filter((item) => {
      const valueToSearch = item[searchType]; // searchType에 따른 값 가져오기
      const matchesSearchTerm =
        valueToSearch &&
        valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus
        ? item.pointPayBackResult === selectedStatus
        : true; // 거래상태 필터
      const matchesNotes = selectedNotes ? item.notes === selectedNotes : true; // 비고 필터
      return matchesSearchTerm && matchesStatus && matchesNotes;
    });

    setFilteredItems(newFilteredItems);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  return (
    <>
      <h2 className="admin-ped-h2">포인트 관리 - 포인트 환전 내역</h2>

      <div className="admin-ped-content-box">
        <div className="admin-ped-search-container">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchTerm(''); // 검색어 초기화
              setCurrentPage(1); // 페이지 초기화
            }}
          >
            <option value="memberName">이름</option>
            <option value="memberEmail">이메일</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력 시 검색어 업데이트
          />
          <button onClick={handleSearch}>조회</button>
        </div>
        <div className="admin-ped-point-exchange-table">
          <div className="admin-ped-point-exchange-row header">
            <div className="admin-ped-column nickname">이름</div>
            <div className="admin-ped-column email">이메일</div>
            <div className="admin-ped-column exchangePoints">환전포인트</div>
            <div className="admin-ped-column paymentAmount">지급금액</div>
            <div className="admin-ped-column bankInfo">은행정보</div>
            <div className="admin-ped-column paymentDate">지급일</div>
          </div>
          {currentItems.map((item) => (
            <div
              className="admin-ped-point-exchange-row"
              key={item.pointPayBackId}
            >
              <div className="admin-ped-column nickname">{item.memberName}</div>
              <div className="admin-ped-column email">{item.memberEmail}</div>
              <div className="admin-ped-column exchangePoints">
                {item.pointPayBackPoint.toLocaleString()}P
              </div>
              <div className="admin-ped-column paymentAmount">
                {item.pointPayBackPrice.toLocaleString()}원
              </div>
              <div className="admin-ped-column bankInfo">
                {item.bankName} ({item.bankAccountNumber})
              </div>
              <div className="admin-ped-column paymentDate">
                {(() => {
                  const date = new Date(item.entryDate);
                  const formattedDate = `${date.getFullYear()}. ${String(
                    date.getMonth() + 1
                  ).padStart(2, '0')}. ${String(date.getDate()).padStart(
                    2,
                    '0'
                  )}. ${String(date.getHours()).padStart(2, '0')}:${String(
                    date.getMinutes()
                  ).padStart(2, '0')}`;
                  return formattedDate;
                })()}
              </div>
            </div>
          ))}
        </div>
        <div className="admin-ped-pagination">
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
      </div>
    </>
  );
};

export default AdminPointExchangeDetails;
