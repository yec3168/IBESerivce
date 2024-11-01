import React, { useState } from 'react';
import './AdminMemberList.css'; // 스타일 시트 import
import dummyMembers from './DummyMembers'; // 더미 회원 데이터 import
import AdminMemberListDetails from './modal/AdminMemberListDetails'; // 모달 컴포넌트 import

const AdminMemberList = () => {
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [searchEmail, setSearchEmail] = useState(''); // 이메일 검색어 상태
  const [searchType, setSearchType] = useState('이메일'); // 검색 타입 상태
  const membersPerPage = 10; // 페이지당 회원 수

  // 사용자 권한만 필터링
  const usersOnly = dummyMembers.filter(member => member.role === '사용자');

  // 이메일 또는 닉네임으로 필터링
  const filteredMembers = usersOnly.filter(member => {
    const searchValue = searchEmail.toLowerCase();
    if (searchType === '이메일') {
      return member.email.toLowerCase().includes(searchValue);
    } else if (searchType === '닉네임') {
      return member.nickname.toLowerCase().includes(searchValue);
    }
    return true; // 기본적으로 모든 회원을 보여줌
  });

  // 현재 페이지에 해당하는 회원 데이터
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member); // 클릭된 회원을 상태에 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMember(null); // 선택된 회원 초기화
  };

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage); // 총 페이지 수

  // 페이지 번호 그룹 설정
  const groupSize = 10; // 한 그룹의 페이지 수
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 페이지 변경 핸들러
  const handlePreviousGroup = () => {
    const newGroup = currentGroup - 1;
    if (newGroup >= 1) {
      const newPage = (newGroup - 1) * groupSize + groupSize; // 이전 그룹의 마지막 페이지
      setCurrentPage(newPage);
    }
  };

  const handleNextGroup = () => {
    const newGroup = currentGroup + 1;
    if (newGroup <= Math.ceil(totalPages / groupSize)) {
      const newPage = (newGroup - 1) * groupSize + 1; // 다음 그룹의 첫 번째 페이지
      setCurrentPage(newPage);
    }
  };

  // 처음 페이지로 가는 핸들러
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // 마지막 페이지로 가는 핸들러
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="member-list">
      <h2>회원 목록</h2>

      {/* 검색 옵션 및 검색 입력 필드 추가 */}
      <div className="search-container">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)} // 검색 타입 업데이트
        >
          <option value="이메일">이메일로 검색</option>
          <option value="닉네임">닉네임으로 검색</option>
        </select>
        <input
          type="text"
          placeholder={`${searchType}으로 검색`}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)} // 검색어 업데이트
        />
      </div>

      <div className="member-table">
        <div className="member-row header">
          <div className="column nickname">닉네임</div>
          <div className="column email">이메일</div>
          <div className="column role">권한</div>
          <div className="column phone">전화번호</div>
          <div className="column joinedDate">가입일</div>
          <div className="column modifiedDate">수정일</div>
        </div>
        {currentMembers.map((member, index) => (
          <div
            key={index}
            className="member-row clickable" // 클릭 가능한 스타일 추가
            onClick={() => handleMemberClick(member)} // 클릭 핸들러
          >
            <div className="column nickname">{member.nickname}</div>
            <div className="column email">{member.email}</div>
            <div className="column role">{member.role}</div>
            <div className="column phone">{member.phone}</div>
            <div className="column joinedDate">{member.joinedDate}</div>
            <div className="column modifiedDate">{member.modifiedDate}</div>
          </div>
        ))}
      </div>

      {/* 페이지 네비게이션 */}
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          처음 페이지
        </button>
        {currentGroup > 1 && (
          <button onClick={handlePreviousGroup}>이전 페이지</button>
        )}
        {[...Array(endPage - startPage + 1).keys()].map((offset) => {
          const pageNumber = startPage + offset;
          if (pageNumber > totalPages) return null; // 총 페이지 수를 초과하지 않도록 함
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentGroup < Math.ceil(totalPages / groupSize) && (
          <button onClick={handleNextGroup}>다음 페이지</button>
        )}
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          마지막 페이지
        </button>
      </div>

      {isModalOpen && selectedMember && (
        <AdminMemberListDetails
          member={selectedMember}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default AdminMemberList;
