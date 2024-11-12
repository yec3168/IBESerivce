import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminMemberList.css'; // 스타일 시트 import
import AdminMemberListDetails from './modal/AdminMemberListDetails'; // 모달 컴포넌트 import

const AdminMemberList = () => {
  const [members, setMembers] = useState([]); // 서버에서 가져올 회원 목록 상태
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [searchEmail, setSearchEmail] = useState(''); // 이메일 검색어 상태
  const [searchType, setSearchType] = useState('이메일'); // 검색 타입 상태
  const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 회원 목록 상태
  const membersPerPage = 10; // 페이지당 회원 수

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/member/memberlist'
      );

      const filteredMembers = response.data.filter(
        (member) =>
          member.role === 'ROLE_CLIENT' ||
          member.role === 'ROLE_BANNED_CLIENT' ||
          member.role === 'ROLE_DEFAULT'
      );

      setMembers(filteredMembers);
      setFilteredMembers(filteredMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('회원 목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = () => {
    const result = members.filter((member) => {
      const searchValue = searchEmail.toLowerCase();
      if (searchType === '이메일') {
        return (
          member.memberEmail &&
          member.memberEmail.toLowerCase().includes(searchValue)
        );
      } else if (searchType === '닉네임으') {
        return (
          member.memberNickName &&
          member.memberNickName.toLowerCase().includes(searchValue)
        );
      }
      return true;
    });

    setFilteredMembers(result);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const groupSize = 10;
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousGroup = () => {
    const newGroup = currentGroup - 1;
    if (newGroup >= 1) {
      const newPage = (newGroup - 1) * groupSize + groupSize;
      setCurrentPage(newPage);
    }
  };

  const handleNextGroup = () => {
    const newGroup = currentGroup + 1;
    if (newGroup <= Math.ceil(totalPages / groupSize)) {
      const newPage = (newGroup - 1) * groupSize + 1;
      setCurrentPage(newPage);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      if (currentPage + 1 > 10) {
        setCurrentPage(Math.min(startPage + groupSize - 1, totalPages)); // 다음 페이지 세트의 첫 번째 페이지로 이동
      } else {
        setCurrentPage(currentPage + 1); // 현재 그룹의 마지막 페이지로 이동
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      if (currentPage - 1 > 10) {
        setCurrentPage(Math.max(startPage, 1)); // 이전 페이지 세트의 마지막 페이지로 이동
      } else {
        setCurrentPage(currentPage - 1); // 현재 그룹의 첫 번째 페이지로 이동
      }
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <>
      <h2 className="admin-member-h2">사용자 관리 - 회원 목록</h2>
      <div className="admin-member-member-list">
        <div className="admin-member-search-container">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="이메일">이메일로 검색</option>
            <option value="닉네임으">닉네임으로 검색</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="admin-member-search-button" onClick={handleSearch}>
            조회
          </button>
        </div>
        <div className="admin-member-member-table">
          <div className="admin-member-member-row admin-member-header">
            <div className="admin-member-column admin-member-nickname">
              닉네임
            </div>
            <div className="admin-member-column admin-member-email">이메일</div>
            <div className="admin-member-column admin-member-role">권한</div>
            <div className="admin-member-column admin-member-phone">
              전화번호
            </div>
            <div className="admin-member-column admin-member-joinedDate">
              가입일
            </div>
            <div className="admin-member-column admin-member-modifiedDate">
              수정일
            </div>
          </div>
          {filteredMembers.length === 0 ? (
            <div className="admin-member-no-results">검색결과가 없습니다.</div>
          ) : (
            currentMembers.map((member, index) => (
              <div
                key={index}
                className="admin-member-member-row admin-member-clickable"
                onClick={() => handleMemberClick(member)}
              >
                <div className="admin-member-column admin-member-nickname">
                  {member.memberNickName}
                </div>
                <div className="admin-member-column admin-member-email">
                  {member.memberEmail}
                </div>
                <div className="admin-member-column admin-member-role">
                  {member.role === 'ROLE_CLIENT'
                    ? '회원'
                    : member.role === 'ROLE_DEFAULT'
                    ? '회원(탈퇴)'
                    : member.role === 'ROLE_BANNED_CLIENT'
                    ? '회원(정지됨)'
                    : ''}
                </div>
                <div className="admin-member-column admin-member-phone">
                  {member.memberPhone}
                </div>
                <div className="admin-member-column admin-member-joinedDate">
                  {formatDateTime(member.entryDate)}
                </div>
                <div className="admin-member-column admin-member-modifiedDate">
                  {formatDateTime(member.updateDate)}
                </div>
              </div>
            ))
          )}
        </div>
        {filteredMembers.length > membersPerPage && (
          <div className="admin-member-pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              {'<<'}
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              {'<'}
            </button>
            {currentGroup > 1 && (
              <button onClick={handlePreviousGroup}>이전 페이지 세트</button>
            )}
            {[...Array(endPage - startPage + 1).keys()].map((offset) => {
              const pageNumber = startPage + offset;
              if (pageNumber > totalPages) return null;
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
              <button onClick={handleNextGroup}>다음 페이지 세트</button>
            )}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              {'>>'}
            </button>
          </div>
        )}

        {isModalOpen && selectedMember && (
          <AdminMemberListDetails
            member={selectedMember}
            onClose={closeModal}
            fetchMembers={fetchMembers}
          />
        )}
      </div>
    </>
  );
};

export default AdminMemberList;
