import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Board.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';

const IbeBoardDetailsComponent = () => {
  const { boardId } = useParams(); // URL에서 boardId 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState({});

  // 게시물 데이터 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/api/boards/${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseCode === 'SUCCESS') {
          const postData = {
            category: data.data.boardCategory,
            title: data.data.boardTitle,
            nickname: data.data.member.memberNickName,
            createdAt: data.data.boardCreatedAt,
            views: data.data.boardHit,
            content: data.data.boardContent,
            commentCount: data.data.boardCommentCnt,
          };
          setPost(postData);

          // 댓글 데이터를 받아오는 로직 추가 (예시)
          setComments([]); // 예시로 댓글은 빈 배열로 설정
        }
      })
      .catch((error) => console.error('Error fetching post data:', error));
  }, [boardId]);

  // 댓글 입력 처리
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        boardId,
        boardCommentContent: newComment,
      };
      // JWT 토큰 가져오기
      const token = localStorage.getItem('accessToken'); // localStorage에서 JWT 토큰 가져오기

      // 서버에 댓글 전송
      fetch('http://localhost:8080/api/boards/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
        },
        body: JSON.stringify(newCommentData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.responseCode === 'SUCCESS') {
            // 댓글이 성공적으로 추가되면, 댓글 목록에 추가
            setComments([
              ...comments,
              {
                id: comments.length + 1,
                nickname: '나',
                content: newComment,
                replies: [],
              },
            ]);
            setNewComment(''); // 입력 필드 비우기
          } else {
            console.error('댓글 추가 실패:', data.message);
          }
        })
        .catch((error) => console.error('Error posting comment:', error));
    }
  };

  // 답글 입력창 토글
  const handleReplyButtonClick = (commentId) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // 답글 등록 처리
  const handleReplySubmit = (commentId) => {
    if (!replyContent.trim()) return;

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), content: replyContent },
              ],
            }
          : comment
      )
    );

    setReplyContent(''); // Clear the input
    setShowReplyInput((prev) => ({ ...prev, [commentId]: false })); // Hide input after submitting
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
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
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
                        <div
                          key={reply.id}
                          className="reply ml-4 pl-3 border-left"
                        >
                          <small>{reply.content}</small>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 답글 입력창 */}
                  {showReplyInput[comment.id] && (
                    <div className="mt-2">
                      <Form.Control
                        as="textarea"
                        rows={1}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답글을 입력하세요."
                        className="reply-input"
                      />
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => handleReplySubmit(comment.id)}
                      >
                        등록
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
