import React, { useState, useEffect } from 'react';
import './Board.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';

const IbeBoardDetailsComponent = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 게시물 데이터 가져오기
  useEffect(() => {
    // 예시 데이터, 실제 API 호출은 fetch 또는 axios로 대체
    const mockPostData = {
      category: '공지',
      title: '게시물 제목',
      nickname: '작성자 닉네임',
      createdAt: '2024-11-06',
      views: 100,
      content: '이것은 게시물의 내용입니다.',
      commentCount: 3,
    };
    setPost(mockPostData);

    // 댓글 데이터 예시
    const mockComments = [
      { id: 1, nickname: '댓글 작성자 1', content: '댓글 내용 1' },
      { id: 2, nickname: '댓글 작성자 2', content: '댓글 내용 2' },
    ];
    setComments(mockComments);
  }, [postId]);

  // 댓글 입력 처리
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, nickname: '나', content: newComment }]);
      setNewComment('');
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
                <p><strong>닉네임:</strong> {post.nickname}</p>
                <p><strong>등록 시간:</strong> {post.createdAt}</p>
                <p><strong>조회수:</strong> {post.views}</p>
                <p><strong>내용:</strong> {post.content}</p>
                <p><strong>댓글 수:</strong> {post.commentCount}</p>
              </Col>
            </Row>

            <hr />

            {/* 댓글 리스트 */}
            <Row>
              <h5>댓글</h5>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.nickname}</strong>: {comment.content}</p>
                </div>
              ))}
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
                <Button variant="primary" onClick={handleCommentSubmit} className="mt-2">
                  댓글 입력
                </Button>
              </Form.Group>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default IbeBoardDetailsComponent;
