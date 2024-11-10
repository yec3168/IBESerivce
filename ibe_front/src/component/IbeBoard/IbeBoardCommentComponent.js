import React, { useState, useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import './IbeBoardComment.css';
import { jwtDecode } from 'jwt-decode';

const IbeBoardCommentComponent = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState({});
  const [isRestrictedUser, setIsRestrictedUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        // 제한된 역할 확인
        if (['ROLE_DEFAULT', 'ROLE_BANNED_CLIENT'].includes(userRole)) {
          setIsRestrictedUser(true);
        }
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    } else {
      setIsRestrictedUser(true); // 토큰이 없는 경우 제한된 사용자로 설정
    }
  }, []);

  useEffect(() => {
    fetchCommentsData();
  }, [boardId]);

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
      const newCommentData = { boardId, boardCommentContent: newComment };
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
          }
        })
        .catch((error) => console.error('Error posting comment:', error));
    }
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
        }
      })
      .catch((error) => console.error('Error posting reply:', error));
  };

  const handleReplyButtonClick = (commentId) => {
    setShowReplyInput((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div>
      <Row>
        <Form.Group controlId="newComment">
          <hr className="board-comment-hr" />
          {!isRestrictedUser && (
            <>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="댓글을 입력하세요. (최대 200자)"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={200}
                style={{ resize: 'none' }}
                spellCheck={false}
              />
              <Button
                variant="primary"
                onClick={handleCommentSubmit}
                className="board-submit-btn"
              >
                등록
              </Button>
            </>
          )}
          <br />
          <br />
          {comments.map((comment) => (
            <div key={comment.id} className="comment mb-3">
              <div className="comment-content">
                <div className="comment-header">
                  <strong>{comment.nickname} </strong>
                  <span className="comment-date">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="comment-body">{comment.content}</p>
                {!isRestrictedUser && (
                  <Button
                    variant="primary"
                    onClick={() => handleReplyButtonClick(comment.id)}
                    className="reply-btn"
                  >
                    답글
                  </Button>
                )}
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="replies mt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="board-reply-head">
                      <div className="reply-header">
                        └ <strong>{reply.nickname} </strong>
                        <span className="board-reply-date">
                          {formatDate(reply.createdAt)}
                        </span>
                      </div>
                      <p className="reply-body">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {showReplyInput[comment.id] && !isRestrictedUser && (
                <div className="reply-input mt-2">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="답글을 입력하세요 (최대 200자)"
                    maxLength={200}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => handleReplySubmit(comment.id)}
                    className="reply-btn"
                  >
                    답글 등록
                  </Button>
                </div>
              )}
              <hr />
            </div>
          ))}
        </Form.Group>
      </Row>
    </div>
  );
};

export default IbeBoardCommentComponent;
