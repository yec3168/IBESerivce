import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import IbeBoardCommentComponent from './IbeBoardCommentComponent';
import { FaRegCommentDots } from 'react-icons/fa6';

const IbeBoardDetailsComponent = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [hasDeletePermission, setHasDeletePermission] = useState(false);

  const categoryMap = {
    NOTICE: '공지',
    REQUEST: '요청',
    QUESTION: '질문',
    INFORMATION: '정보',
    GENERAL: '일반',
  };

  useEffect(() => {
    fetchPostData();
  }, [boardId]);

  const fetchPostData = () => {
    fetch(`http://localhost:8080/api/boards/${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 'SUCCESS') {
          const postStatus = data.data.boardStatus; // 게시글 상태 가져오기
  
          if (postStatus) {
            // boardStatus가 true인 경우, postData를 null로 설정
            setPost(null);
            alert('존재하지 않거나 삭제된 게시글 입니다.');
            navigate('/boards'); // 게시글이 삭제된 상태이면 /boards로 리다이렉트
          } else {
            const postData = {
              category:
                categoryMap[data.data.boardCategory] || data.data.boardCategory,
              title: data.data.boardTitle,
              nickname: data.data.member.memberNickName,
              email: data.data.member.memberEmail,
              createdAt: data.data.boardCreatedAt,
              views: data.data.boardHit,
              content: data.data.boardContent,
              commentCount: data.data.boardCommentCnt,
            };
            setPost(postData);
  
            const token = localStorage.getItem('accessToken');
            if (token) {
              const decodedToken = jwtDecode(token);
              const userEmail = decodedToken.sub;
              const userRoles = decodedToken.role || [];
  
              if (userEmail === postData.email) {
                setIsAuthor(true);
              }
  
              if (
                userRoles.includes('ROLE_ADMIN') ||
                userRoles.includes('ROLE_BOARD_MANAGER')
              ) {
                setHasDeletePermission(true);
              }
            }
          }
        } else {
          alert('존재하지 않거나 삭제된 게시글 입니다.');
          navigate('/boards'); // 게시글을 찾을 수 없을 경우 /boards로 리다이렉트
        }
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
        alert('게시글을 가져오는 데 실패했습니다.');
        navigate('/boards'); // 오류 발생 시 /boards로 리다이렉트
      });
  };
  

  const handleDeletePost = () => {
    const isConfirmed = window.confirm('게시글을 정말 삭제하시겠습니까?');
    if (isConfirmed) {
      const token = localStorage.getItem('accessToken');
      fetch('http://localhost:8080/api/boards/delete', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ boardId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.responseCode === 'SUCCESS') {
            alert('게시글이 삭제되었습니다.');
            navigate('/boards');
          } else {
            console.error('게시글 삭제 실패:', data.message);
          }
        })
        .catch((error) => console.error('Error deleting post:', error));
    }
  };

  return (
    <div id="board_content">
      <Container className="board-container">
        <Row>
          <h2 className="board-title">
            [{post?.category}] {post?.title}
          </h2>
        </Row>

        {post && (
          <>
            <Row>
              <Col>
                <p>{post.nickname}</p>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                  <strong>등록 시간:</strong> {post.createdAt}
                </div>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                  <strong>조회수:</strong> {post.views}
                </div>
                {(isAuthor || hasDeletePermission) && (
                  <Button
                    variant="danger"
                    onClick={handleDeletePost}
                    className="ml-auto"
                  >
                    삭제
                  </Button>
                )}
                <hr />
                <p>{post.content}</p>
                <br />
                <br />
                <p className="board-comment-top">
                  <FaRegCommentDots /> 댓글 {post.commentCount}
                </p>
              </Col>
            </Row>
            {/* 댓글 컴포넌트 포함 */}
            <IbeBoardCommentComponent boardId={boardId} />
          </>
        )}
      </Container>
    </div>
  );
};

export default IbeBoardDetailsComponent;
