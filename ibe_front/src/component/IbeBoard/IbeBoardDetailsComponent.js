import React, { useState, useEffect } from 'react';
import './Board.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';

const IbeBoardDetailsComponent = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState({});

  // 게시물 데이터 가져오기
  useEffect(() => {
    // 예시 데이터, 실제 API 호출은 fetch 또는 axios로 대체
    const mockPostData = {
      category: '공지',
      title: '게시물 제목',
      nickname: '길동',
      createdAt: '24.11.06 21:22:41',
      views: 100,
      content: '이것은 게시물의 내용입니다.',
      commentCount: 3,
    };
    setPost(mockPostData);

    // 댓글 데이터 예시
    const mockComments = [
      { id: 1, nickname: '댓글 작성자 1', content: '댓글 내용 1', replies: [] },
      { id: 2, nickname: '댓글 작성자 2', content: '댓글 내용 2', replies: [] },
    ];
    setComments(mockComments);
  }, [postId]);

  // 댓글 입력 처리
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          nickname: '나',
          content: newComment,
          replies: [],
        },
      ]);
      setNewComment('');
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
                <p>
                  <strong></strong> {post.content}
                </p>
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
                  {/* 댓글 */}
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
