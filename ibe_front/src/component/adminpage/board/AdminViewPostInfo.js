import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminViewPost.css';

const AdminViewPostInfo = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('boardTitle');
  const [selectedNotes, setSelectedNotes] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글
  const itemsPerPage = 10;

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/viewpost/info'
        );
        setData(response.data);
        setFilteredItems(response.data); // 초기값 설정
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  // 검색 버튼 클릭 시 필터링
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const valueToSearch = item[searchType]?.toString().toLowerCase() || '';
      const matchesSearchTerm = valueToSearch.includes(
        searchTerm.toLowerCase()
      );
      const matchesNotes = selectedNotes
        ? selectedNotes === '삭제되지 않음'
          ? !item.boardStatus
          : item.boardStatus
        : true;
      return matchesSearchTerm && matchesNotes;
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // 첫 페이지로 리셋
  };

  // 비고 콤보박스 변경 시 자동 필터링
  useEffect(() => {
    handleSearch();
  }, [selectedNotes]);

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 버튼 생성
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);
  const pageLimit = 10;
  const startIndex = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  const endIndex = Math.min(startIndex + pageLimit, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  // 페이지 이동 함수
  const goToNextPage = () =>
    setCurrentPage(Math.min(currentPage + pageLimit, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage(Math.max(currentPage - pageLimit, 1));
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  // 게시글 클릭 시 동작
  const handleRowClick = (item) => {
    if (item.boardStatus) {
      setSelectedPost(item); // 모달로 게시글 데이터 전달
    } else {
      window.open(
        `http://localhost:3000/boards/details/${item.boardId}`,
        '_blank'
      );
    }
  };

  // 모달 닫기
  const closeModal = () => setSelectedPost(null);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

  return (
    <div className="admin-vp-info-list">
      <div className="admin-vp-search-container">
        <select
          value={selectedNotes}
          onChange={(e) => setSelectedNotes(e.target.value)}
        >
          <option value="">삭제여부 선택</option>
          <option value="삭제되지 않음">삭제되지 않음</option>
          <option value="삭제됨">삭제됨</option>
        </select>
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchTerm('');
          }}
        >
          <option value="boardTitle">제목</option>
          <option value="memberNickName">작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>조회</button>
      </div>
      <div className="admin-vp-info-table">
        <div className="admin-vp-info-row header">
          <div className="admin-vp-column id">ID</div>
          <div className="admin-vp-column category">카테고리</div>
          <div className="admin-vp-column title">제목</div>
          <div className="admin-vp-column author">작성자</div>
          <div className="admin-vp-column notes">삭제여부</div>
          <div className="admin-vp-column uploadDate">업로드 날짜</div>
        </div>
        {currentItems.map((item) => (
          <div
            className="admin-vp-info-row"
            key={item.boardId}
            onClick={() => handleRowClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className="admin-vp-column id">{item.boardId}</div>
            <div className="admin-vp-column category">{item.boardCategory}</div>
            <div className="admin-vp-column title">{item.boardTitle}</div>
            <div className="admin-vp-column author">{item.memberNickName}</div>
            <div className="admin-vp-column notes">
              {item.boardStatus ? '삭제됨' : '삭제되지 않음'}
            </div>
            <div className="admin-vp-column uploadDate">
              {formatDate(item.boardCreatedAt)}
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

      {/* 모달 */}
      {selectedPost && (
        <div className="admin-vp-modal">
          <div className="admin-vp-modal-content">
            <h5>
              [{selectedPost.boardCategory}] {selectedPost.boardTitle}
            </h5>
            <p>
              <strong>작성자:</strong> {selectedPost.memberNickName}
            </p>
            <p>
              <strong>작성일자:</strong> {formatDate(selectedPost.boardCreatedAt)}
            </p>
            <p> {selectedPost.boardContent}</p>
            <button className="admin-vp-close-btn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewPostInfo;
