import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode'; // JWT 디코딩 라이브러리

const IbeBoardDetailsComponent = () => {
  const { boardId } = useParams();
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState({});
  const [isAuthor, setIsAuthor] = useState(false); // 작성자 여부 상태
  const [hasDeletePermission, setHasDeletePermission] = useState(false); // 삭제 권한 여부

  // 카테고리 코드와 인간 친화적인 이름 맵핑
  const categoryMap = {
    NOTICE: '공지',
    REQUEST: '요청',
    QUESTION: '질문',
    INFORMATION: '정보',
    GENERAL: '일반',
  };

  useEffect(() => {
    fetchPostData();
    fetchCommentsData();
  }, [boardId]);

  const fetchPostData = () => {
    fetch(`http://localhost:8080/api/boards/${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 'SUCCESS') {
          const postData = {
            category:
              categoryMap[data.data.boardCategory] || data.data.boardCategory, // 카테고리 코드 매핑
            title: data.data.boardTitle,
            nickname: data.data.member.memberNickName,
            email: data.data.member.memberEmail, // 작성자 이메일
            createdAt: data.data.boardCreatedAt,
            views: data.data.boardHit,
            content: data.data.boardContent,
            commentCount: data.data.boardCommentCnt,
          };
          setPost(postData);

          // 사용자 이메일을 토큰에서 추출하여 비교
          const token = localStorage.getItem('accessToken');
          if (token) {
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub; // 토큰에서 이메일 추출
            const userRoles = decodedToken.role || []; // 역할 정보 추출

            if (userEmail === postData.email) {
              setIsAuthor(true); // 작성자일 경우 true 설정
            }

            // 관리자 또는 게시판 관리자일 경우 삭제 권한 부여
            if (
              userRoles.includes('ROLE_ADMIN') ||
              userRoles.includes('ROLE_BOARD_MANAGER')
            ) {
              setHasDeletePermission(true);
            }
          }
        }
      })
      .catch((error) => console.error('Error fetching post data:', error));
  };

  const fetchCommentsData = () => {
    fetch(`http://localhost:8080/api/boards/comments/${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 'SUCCESS') {
          const fetchedComments = data.data.map((comment) => ({
            id: comment.boardCommentId,
            content: comment.boardCommentContent,
            createdAt: comment.boardCommentCreatedAt,
            nickname: comment.member.memberNickName,
            replies: comment.boardReplyResponseList.map((reply) => ({
              id: reply.boardReplyId,
              content: reply.boardReplyContent,
              createdAt: reply.boardReplyCreatedAt,
              nickname: reply.member.memberNickName,
            })),
          }));
          setComments(fetchedComments);
        }
      })
      .catch((error) => console.error('Error fetching comments:', error));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        boardId,
        boardCommentContent: newComment,
      };
      const token = localStorage.getItem('accessToken');

      fetch('http://localhost:8080/api/boards/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCommentData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.responseCode === 'SUCCESS') {
            fetchCommentsData();
            setNewComment('');
          } else {
            console.error('댓글 추가 실패:', data.message);
          }
        })
        .catch((error) => console.error('Error posting comment:', error));
    }
  };

  const handleReplyButtonClick = (commentId) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplySubmit = (commentId) => {
    if (!replyContent.trim()) return;

    const replyData = {
      boardId,
      boardCommentId: commentId,
      boardReplyContent: replyContent,
    };
    const token = localStorage.getItem('accessToken');

    fetch('http://localhost:8080/api/boards/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(replyData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 'SUCCESS') {
          fetchCommentsData();
          setReplyContent('');
          setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
        } else {
          console.error('답글 추가 실패:', data.message);
        }
      })
      .catch((error) => console.error('Error posting reply:', error));
  };

  // 게시글 삭제 처리
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
            navigate('/boards'); // 삭제 후 게시판 목록으로 이동
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
                {/* 작성자 또는 관리자/게시판 관리자에게 삭제 버튼을 표시 */}
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
                <p>
                  <strong>댓글</strong> {post.commentCount}
                </p>
              </Col>
            </Row>
            <hr />

            {/* 댓글 입력 */}
            <Row>
              <Form.Group controlId="newComment">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="댓글을 입력하세요. (최대 200자)"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  maxLength={200} // 글자 수 200자 제한
                  style={{ resize: 'none' }} // 크기 조절 기능 없애기
                />
                <Button
                  variant="primary"
                  onClick={handleCommentSubmit}
                  className="mt-2"
                >
                  댓글 입력
                </Button>
              </Form.Group>
            </Row>
            <hr />

            {/* 댓글 리스트 */}
            <Row>
              <h5>댓글</h5>
              {comments.map((comment) => (
                <div key={comment.id} className="comment mb-3">
                  <div className="comment-content">
                    <p className="mb-1">
                      <strong>{comment.nickname}</strong>: {comment.content}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => handleReplyButtonClick(comment.id)}
                      className="reply-btn"
                    >
                      답글
                    </Button>
                  </div>

                  {/* 답글 리스트 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="replies mt-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="reply ml-4 mb-2">
                          <p>
                            <strong>{reply.nickname}</strong>: {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 답글 입력 */}
                  {showReplyInput[comment.id] && (
                    <div className="reply-input mt-2">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답글을 입력하세요"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => handleReplySubmit(comment.id)}
                        className="mt-2"
                      >
                        답글 제출
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default IbeBoardDetailsComponent;
