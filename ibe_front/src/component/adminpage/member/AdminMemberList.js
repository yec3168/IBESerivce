import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminMemberList.css'; // CSS 파일을 import 합니다.
import AdminMemberListDetails from './modal/AdminMemberListDetails'; // 모달 컴포넌트 import

const AdminMemberList = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10); // 페이지당 보여줄 회원 수
  const [totalMembers, setTotalMembers] = useState(0); // 총 회원 수
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [emailSearch, setEmailSearch] = useState(''); // 이메일 검색 상태
  const [selectedRole, setSelectedRole] = useState(''); // 선택된 권한 상태
  const [searchType, setSearchType] = useState('nickname'); // 검색 기준 상태

  useEffect(() => {
    fetchMembers();
  }, []);

  // 회원 목록을 가져오는 함수
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/member/memberlist'
      );
      setMembers(response.data);
      setTotalMembers(response.data.length); // 총 회원 수를 설정합니다.
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  // 역할에 따라 표시할 텍스트 변환 함수
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return '관리자';
      case 'ROLE_SERVICE_MANAGER':
        return '문의담당자';
      case 'ROLE_BOARD_MANAGER':
        return '게시판담당자';
      case 'ROLE_CLIENT':
        return '회원';
      case 'ROLE_BANNED_CLIENT':
        return '회원(정지됨)';
      case 'ROLE_DEFAULT':
        return '회원(탈퇴)';
      default:
        return '알 수 없음';
    }
  };

  // 검색 기준에 따라 회원 목록 필터링
  const filteredMembers = members.filter((member) => {
    const matchesEmail =
      searchType === 'email'
        ? member.memberEmail.toLowerCase().includes(emailSearch.toLowerCase())
        : member.memberNickName
            .toLowerCase()
            .includes(emailSearch.toLowerCase());

    const matchesRole = selectedRole ? member.role === selectedRole : true;

    // ROLE_CLIENT, ROLE_BANNED_CLIENT, ROLE_DEFAULT 권한만 출력
    const isAllowedRole = [
      'ROLE_CLIENT',
      'ROLE_BANNED_CLIENT',
      'ROLE_DEFAULT',
    ].includes(member.role);

    return matchesEmail && matchesRole && isAllowedRole;
  });

  // 현재 페이지에 따라 보여줄 회원 목록을 계산합니다.
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // 페이지 번호 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // 첫 페이지, 마지막 페이지, 이전 페이지, 다음 페이지 핸들러
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // 회원 상세보기 모달 열기
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    fetchMembers(); // 모달 닫을 때 회원 목록 갱신
  };

  return (
    <div className="member-list-container">
      <div className="member-list-box">
        <h3>회원 목록</h3> {/* 박스 상단에 제목 추가 */}
        {/* 검색 기준 선택, 검색 입력란, 권한 선택 콤보박스를 한 줄에 표시 */}
        <div className="search-container">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type"
          >
            <option value="nickname">닉네임</option>
            <option value="email">이메일</option>
          </select>

          <input
            type="text"
            placeholder="검색..."
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className="email-search"
          />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-filter"
          >
            <option value="">모든 권한</option>
            <option value="ROLE_CLIENT">회원</option>
            <option value="ROLE_BANNED_CLIENT">회원(정지됨)</option>
            <option value="ROLE_DEFAULT">회원(탈퇴)</option>
          </select>
        </div>
        <table className="member-list-table">
          <thead>
            <tr className="member-list-header">
              <th className="member-list-header-item">닉네임</th>
              <th className="member-list-header-item">휴대폰번호</th>
              <th className="member-list-header-item">이메일</th>
              <th className="member-list-header-item">권한</th>
              <th className="member-list-header-item">가입일</th>
              <th className="member-list-header-item">수정일</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr
                key={member.memberId}
                className="member-list-row"
                onClick={() => handleMemberClick(member)}
              >
                <td className="member-list-cell">{member.memberNickName}</td>
                <td className="member-list-cell">{member.memberPhone}</td>
                <td className="member-list-cell">{member.memberEmail}</td>
                <td className="member-list-cell">
                  {getRoleDisplayName(member.role)}
                </td>
                <td className="member-list-cell">
                  {new Date(member.entryDate).toLocaleDateString()}
                </td>
                <td className="member-list-cell">
                  {new Date(member.UpdateDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이지 번호 버튼 */}
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            처음
          </button>
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].slice(0, 10).map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
          <button
            className="pagination-button"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            끝
          </button>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <AdminMemberListDetails
          member={selectedMember}
          onClose={closeModal}
          fetchMembers={fetchMembers}
        />
      )}
    </div>
  );
};

export default AdminMemberList;
