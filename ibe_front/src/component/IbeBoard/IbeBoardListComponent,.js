import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import {
  Table,
  Button,
  Pagination,
  Container,
  Row,
  Col,
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
  const normalPosts = posts.filter((post) => post.category !== '공지'); // Regular posts
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
  const noticePosts = posts.filter((post) => post.category === '공지');

  // Handle click on a post
  const handlePostClick = (postId) => {
    navigate(`/boards/details/${postId}`); // /boards/details/{boardId} 경로로 이동
  };

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
            {noticePosts.map((post) => (
              <tr key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 'bold' }}></td> {/* No ID displayed */}
                <td>
                  <span className={`category-${post.category}`}>
                    {mapCategory(post.category)}&emsp;
                  </span>
                  <strong>{post.title}</strong>
                  {post.comments !== 0 && (
                    <span
                      className="comment-count"
                      style={{ color: 'blue', fontWeight: '700' }}
                    >
                      {' '}
                      {post.comments}
                    </span>
                  )}
                  {isToday(post.date) && <span className="new-tag">New</span>}
                </td>
                <td>
                  <strong>{post.author}</strong>
                </td>
                <td>
                  <strong>{post.date}</strong>
                </td>
                <td>
                  <strong>{post.views}</strong>
                </td>
              </tr>
            ))}
            {/* Display paginated normal posts */}
            {paginatedPosts.map((post) => (
              <tr key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                <td>{post.id}</td> {/* ID displayed for normal posts */}
                <td>
                  <span className={`category-${post.category}`}>
                    {mapCategory(post.category)}&emsp;
                  </span>
                  {post.title}
                  {post.comments !== 0 && (
                    <span
                      className="comment-count"
                      style={{ color: 'blue', fontWeight: '700' }}
                    >
                      {' '}
                      {post.comments}
                    </span>
                  )}
                  {isToday(post.date) && <span className="new-tag">New</span>}
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end">
          <Button className="add-post-btn" onClick={handleWriteClick}>
            글쓰기
          </Button>
        </div>
        <Pagination className="justify-content-center">
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
