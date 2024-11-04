import React, { useState } from 'react';
import './AdminPointExchangeDetails.css'; // CSS 파일 경로를 확인하세요
import dummyData from './DummyData'; // 더미 데이터 import

const AdminPointExchangeDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nickname'); // 기본 검색 타입 설정
  const [selectedStatus, setSelectedStatus] = useState(''); // 거래상태 선택
  const [selectedNotes, setSelectedNotes] = useState(''); // 비고 선택
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = dummyData.filter(item => {
    const valueToSearch = item[searchType]; // searchType에 따른 값 가져오기
    const matchesSearchTerm = valueToSearch && valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true; // 거래상태 필터
    const matchesNotes = selectedNotes ? item.notes === selectedNotes : true; // 비고 필터
    return matchesSearchTerm && matchesStatus && matchesNotes;
  });

  // 초기 로드 시 filteredItems가 비어있지 않으면 현재 페이지의 항목을 설정합니다.
  const currentItems = currentPage === 1 && searchTerm === '' ? filteredItems.slice(0, itemsPerPage) : filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="admin-ped-point-exchange-list">
      <h3>포인트 환전 내역</h3>
      <div className="admin-ped-content-box">
        <div className="admin-ped-search-container">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchTerm('');
              setCurrentPage(1);
            }}
          >
            <option value="nickname">닉네임</option>
            <option value="email">이메일</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentPage(1);
              }
            }}
          />
          <button onClick={() => setCurrentPage(1)}>조회</button>
        </div>
        <div className="admin-ped-point-exchange-table">
          <div className="admin-ped-point-exchange-row header">
            <div className="admin-ped-column id">아이디</div>
            <div className="admin-ped-column nickname">닉네임</div>
            <div className="admin-ped-column email">이메일</div>
            <div className="admin-ped-column exchangePoints">환전포인트</div>
            <div className="admin-ped-column paymentAmount">지급금액</div>
            <div className="admin-ped-column paymentDate">지급일</div>
          </div>
          {currentItems.map((item) => (
            <div className="admin-ped-point-exchange-row" key={item.id}>
              <div className="admin-ped-column id">{item.id}</div>
              <div className="admin-ped-column nickname">{item.nickname}</div>
              <div className="admin-ped-column email">{item.email}</div>
              <div className="admin-ped-column exchangePoints">{item.exchangePoints}</div>
              <div className="admin-ped-column paymentAmount">{item.paymentAmount}</div>
              <div className="admin-ped-column paymentDate">{item.paymentDate}</div>
            </div>
          ))}
        </div>
        <div className="admin-ped-pagination">
          <button 
            onClick={goToFirstPage} 
            disabled={currentPage === 1}
          >
            맨 처음
          </button>
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
          >
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
          <button 
            onClick={goToNextPage} 
            disabled={currentPage >= totalPages}
          >
            다음 &gt;
          </button>
          <button 
            onClick={goToLastPage} 
            disabled={currentPage === totalPages}
          >
            맨 끝
          </button>
        </div>
      </div>
    </div>
  );
}  

export default AdminPointExchangeDetails;
