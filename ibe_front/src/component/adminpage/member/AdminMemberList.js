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

  // 서버에서 회원 목록을 가져오는 함수
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/member/memberlist'
      );

      // ROLE_CLIENT, ROLE_BANNED_CLIENT, ROLE_DEFAULT인 회원만 필터링
      const filteredMembers = response.data.filter(
        (member) =>
          member.role === 'ROLE_CLIENT' ||
          member.role === 'ROLE_BANNED_CLIENT' ||
          member.role === 'ROLE_DEFAULT'
      );

      setMembers(filteredMembers); // 필터링된 데이터 상태 업데이트
      setFilteredMembers(filteredMembers); // 초기 필터링된 목록을 필터링된 회원 목록으로 설정
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('회원 목록을 불러오는 데 실패했습니다.');
    }
  };

  // 컴포넌트가 마운트될 때 회원 목록을 가져옵니다.
  useEffect(() => {
    fetchMembers();
  }, []);

  // 검색 버튼 클릭 시 필터링된 회원 목록을 설정
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

    setFilteredMembers(result); // 필터링된 결과를 상태에 저장
    setCurrentPage(1); // 조회 시 항상 첫 페이지로 이동
  };

  // 엔터 키로 검색을 트리거하는 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 현재 페이지에 해당하는 회원 데이터
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <>
      <h2 className="admin-member-h2">사용자 관리 - 회원 목록</h2>
      <div className="admin-member-member-list">
        {/* 검색 옵션 및 검색 입력 필드 추가 */}
        <div className="admin-member-search-container">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)} // 검색 타입 업데이트
          >
            <option value="이메일">이메일로 검색</option>
            <option value="닉네임으">닉네임으로 검색</option>
          </select>
          <input
            type="text"
            placeholder={`${searchType}로 검색`}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)} // 검색어 업데이트
            onKeyDown={handleKeyDown} // 엔터 키 눌림 이벤트 핸들러 추가
          />
          <button className="admin-member-search-button" onClick={handleSearch}>
            조회
          </button>{' '}
          {/* 조회 버튼 추가 */}
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
          {currentMembers.map((member, index) => (
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
                {new Date(member.entryDate).toLocaleDateString()}
              </div>
              <div className="admin-member-column admin-member-modifiedDate">
                {member.UpdateDate}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지 네비게이션 */}
        <div className="admin-member-pagination">
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
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            마지막 페이지
          </button>
        </div>

        {isModalOpen && selectedMember && (
          <AdminMemberListDetails
            member={selectedMember}
            onClose={closeModal}
            fetchMembers={fetchMembers} // 목록 갱신을 위해 전달
          />
        )}
      </div>
    </>
  );
};

export default AdminMemberList;
