import React, { useState, useEffect } from 'react';
import './AdminViewPost.css'; // CSS 파일 경로를 확인하세요
import dummyData from './DummyData'; // 더미 데이터 import

const AdminViewPostInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // 기본 검색 타입 설정
  const [selectedNotes, setSelectedNotes] = useState(''); // 비고 선택
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 검색 조건에 따른 필터링
  const filteredItems = dummyData.filter(item => {
    const valueToSearch = item[searchType]?.toLowerCase() || '';
    const matchesSearchTerm = valueToSearch.includes(searchTerm.toLowerCase());
    const matchesNotes = selectedNotes ? item.notes === selectedNotes : true; // 비고 필터
    return matchesSearchTerm && matchesNotes;
  });

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

  // 검색 버튼 클릭 시 currentPage를 1로 리셋
  const handleSearch = () => {
    setCurrentPage(1); // 검색할 때는 첫 페이지로 리셋
  };

  // 콤보박스 선택 변경 시 currentPage를 1로 리셋하고 결과 즉시 업데이트
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedNotes]);

  return (
    <div className="admin-vp-info-list">
      <h3>정보 게시글 목록</h3>
      <div className="admin-vp-search-container">
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchTerm(''); // 검색 타입이 변경될 때는 검색어 초기화
          }}
        >
          <option value="title">제목</option>
          <option value="author">작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // 엔터 키를 눌렀을 때 검색
            }
          }}
        />
        <select
          value={selectedNotes}
          onChange={(e) => setSelectedNotes(e.target.value)}
        >
          <option value="">비고 선택</option>
          <option value="삭제되지 않음">삭제되지 않음</option>
          <option value="삭제됨">삭제됨</option>
        </select>
        <button onClick={handleSearch}>조회</button>
      </div>
      <div className="admin-vp-info-table">
        <div className="admin-vp-info-row header">
          <div className="admin-vp-column id">ID</div>
          <div className="admin-vp-column category">카테고리</div>
          <div className="admin-vp-column title">제목</div>
          <div className="admin-vp-column author">작성자</div>
          <div className="admin-vp-column notes">비고</div>
          <div className="admin-vp-column uploadDate">업로드 날짜</div>
        </div>
        {currentItems.map((item) => (
          <div className="admin-vp-info-row" key={item.id}>
            <div className="admin-vp-column id">{item.id}</div>
            <div className="admin-vp-column category">{item.category}</div>
            <div className="admin-vp-column title">{item.title}</div>
            <div className="admin-vp-column author">{item.author}</div>
            <div className="admin-vp-column notes">{item.notes}</div>
            <div className="admin-vp-column uploadDate">{item.uploadDate}</div>
          </div>
        ))}
      </div>
      <div className="admin-vp-pagination">
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
  );
};

export default AdminViewPostInfo;
