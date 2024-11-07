import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import {
  Table,
  Button,
  Pagination,
  Container,
  Row,
  Col,
  FormSelect,
} from 'react-bootstrap';
import axios from 'axios'; // axios 추가
import './Board.css';

const IbeBoardListComponent = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate(); // useNavigate 훅 사용
  // 데이터 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/boards')
      .then((response) => {
        const data = response.data.data; // API 응답에서 데이터 추출

        // boardCreatedAt을 yyyy-MM-dd HH:mm 형식으로 변환
        const formattedData = data.map((post) => ({
          id: post.boardId,
          category: post.boardCategory,
          title: post.boardTitle,
          author: post.memberNickName,
          date: post.boardCreatedAt,
          views: post.boardHit,
          comments: post.boardCommentCnt,
        }));

        // boardId 기준 내림차순 정렬
        const sortedData = formattedData.sort((a, b) => b.id - a.id);

        // 데이터를 상태에 저장
        setPosts(sortedData);
      })
      .catch((error) => {
        console.error('게시글을 가져오는 데 실패했습니다:', error);
      });
  }, []);

  // 카테고리 맵핑 함수
  const mapCategory = (category) => {
    switch (category) {
      case 'NOTICE':
        return '[공지]';
      case 'REQUEST':
        return '[요청]';
      case 'QUESTION':
        return '[질문]';
      case 'INFORMATION':
        return '[정보]';
      case 'GENERAL':
        return '[일반]';
      default:
        return category;
    }
  };

  // Utility to check if a post is new (posted today)
  const isToday = (dateString) => {
    const postDate = new Date(dateString);
    const today = new Date();
    return (
      postDate.getDate() === today.getDate() &&
      postDate.getMonth() === today.getMonth() &&
      postDate.getFullYear() === today.getFullYear()
    );
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const normalPosts = posts.filter((post) => post.category !== 'NOTICE'); // Regular posts
  const paginatedPosts = normalPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle pagination click
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle 글쓰기 button click
  const handleWriteClick = () => {
    navigate('/boards/write'); // /boards/write 경로로 이동
    window.scrollTo(0, 0);
  };

  // Get all 공지 posts to display them on top
  const noticePosts = posts.filter((post) => post.category === 'NOTICE');

  // Handle click on a post
  const handlePostClick = (postId) => {
    navigate(`/boards/details/${postId}`); // /boards/details/{boardId} 경로로 이동
  };

  // 검색 내용 전송
  const handleSearch =() =>{
    let category = document.getElementById('searchCategory').value;
    let type = document.getElementById('searchType').value;
    let value = document.getElementById('searchValue').value;
    axios
      .get(`http://localhost:8080/api/boards/search?category=${category}&type=${type}&value=${value}`)
      .then((response) => {
        const data = response.data.data; // API 응답에서 데이터 추출

        // boardCreatedAt을 yyyy-MM-dd HH:mm 형식으로 변환
        const formattedData = data.map((post) => ({
          id: post.boardId,
          category: post.boardCategory,
          title: post.boardTitle,
          author: post.memberNickName,
          date: post.boardCreatedAt,
          views: post.boardHit,
          comments: post.boardCommentCnt,
        }));

        // boardId 기준 내림차순 정렬
        const sortedData = formattedData.sort((a, b) => b.id - a.id);

        // 데이터를 상태에 저장
        setPosts(sortedData);
      })
      .catch((error) => {
        console.error('게시글을 가져오는 데 실패했습니다:', error);
      })
  }
  return (
    <div id="board_content">
      <Container className="board-container">
        <Row>
          <Col className="mb-4">
            <p className="h2 board-title">아이비 게시판</p>
          </Col>
        </Row>
        <Table hover className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {/* Display 공지 posts */}
            
            {
            noticePosts.map((post) => (
                <>
                {currentPage === 1 ? 
                <>
                <tr key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer'}}>
                  <td style={{ fontWeight: 'bold' ,backgroundColor:'#FFFAFA'}}></td> {/* No ID displayed */}
                  <td style={{backgroundColor:'#FFFAFA'}}>
                <span className={`board-category-${post.category}`}>
                  {mapCategory(post.category)}&emsp;
                </span>
                <strong>{post.title}</strong>
                {post.comments !== 0 && (
                  <span
                    className="board-comment-count"
                    style={{ color: 'blue', fontWeight: '700' }}
                  >
                    {' '}
                    {post.comments}
                  </span>
                )}
                {isToday(post.date) && <span className="board-new-tag">New</span>}
              </td>
              <td style={{backgroundColor:'#FFFAFA'}}>
                <strong >{post.author}</strong>
              </td>
              <td style={{backgroundColor:'#FFFAFA'}}>
                <strong>{post.date}</strong>
              </td>
              <td style={{backgroundColor:'#FFFAFA'}}>
                <strong>{post.views}</strong>
              </td>
              </tr>
                </>
                : null }
                
              </>
              )
            )
          }
            
            {/* Display paginated normal posts */}
            {paginatedPosts.map((post) => (
              <tr key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                <td>{post.id}</td> {/* ID displayed for normal posts */}
                <td>
                  <span className={`board-category-${post.category}`}>
                    {mapCategory(post.category)}&emsp;
                  </span>
                  {post.title}
                  {post.comments !== 0 && (
                    <span
                      className="board-comment-count"
                      style={{ color: 'blue', fontWeight: '700' }}
                    >
                      {' '}
                      {post.comments}
                    </span>
                  )}
                  {isToday(post.date) && <span className="board-new-tag">New</span>}
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{textAlign:'center'}}>
        <select id='searchCategory' style={{ width:'90px', height:'40px'}}>
            <option value={'ALL'}>전체</option>
            <option value={'NOTICE'}>공지</option>
            <option value={'REQUEST'}>요청</option>
            <option value={'QUESTION'}>질문</option>
            <option value={'INFORMATION'}>정보</option>
            <option value={'GENERAL'}>일반</option>
          </select>
          <select id='searchType' style={{ width:'90px', height:'40px'}}>
            <option value={'title'}>제목</option>
            <option value={'name'}>작성자</option>
          </select>
          <input id='searchValue' placeholder='검색어를 입력해주세요'style={{ width:'400px', height:'40px'}}></input>
          <button className="board-add-post-btn" onClick={handleSearch} style={{ height:'40px'}}>
            검색
          </button>
        </div>
        <div className="text-end">
          <Button className="board-add-post-btn" onClick={handleWriteClick}>
            글쓰기
          </Button>
          
        </div>
        <Pagination className="board-pagination justify-content-center">
          {[...Array(Math.ceil(normalPosts.length / itemsPerPage)).keys()].map(
            (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Container>
    </div>
  );
};

export default IbeBoardListComponent;
