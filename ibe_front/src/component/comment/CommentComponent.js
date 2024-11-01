import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRegCommentDots } from "react-icons/fa6";
import "./Comment.css";

const CommentComponent = () => {
    const [comments, setComments] = useState([
        { id: 1, name: "익명", text: "비밀댓글입니다.", replies: [] },
        { id: 2, name: "판매자", text: "비밀댓글입니다.", replies: [] },
        { id: 3, name: "홍길동", text: "서로이웃 추가 부탁드려요!", replies: [] },
    ]);

    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState({});
    const [showReplyForm, setShowReplyForm] = useState({});

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, { id: Date.now(), name: "익명", text: newComment, replies: [] }]);
            setNewComment("");
        }
    };

    const handleReplySubmit = (commentId) => {
        if (replyText[commentId]?.trim()) {
            const updatedComments = comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, { id: Date.now(), name: "익명", text: replyText[commentId] }] }
                    : comment
            );
            setComments(updatedComments);
            setReplyText({ ...replyText, [commentId]: "" });
            setShowReplyForm({ ...showReplyForm, [commentId]: false });
        }
    };

    const toggleReplyForm = (commentId) => {
        setShowReplyForm((prevState) => ({ ...prevState, [commentId]: !prevState[commentId] }));
    };

    return (
        <div id="comment">
            {/* 상단 댓글 수 및 신고 */}
            <div id="comment_info">
                <span className="comment_top"><FaRegCommentDots /> 댓글 {comments.length}</span>
                {/* <span className="comment_report">신고</span> */}
            </div>
            
            {/* 댓글 입력 폼 */}
            <div id="comment_inputs">
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Control
                        as="textarea"
                        placeholder="댓글을 입력해주세요."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ height: "100px" }}
                    />
                    <Button type="submit" className="submit-btn">
                        등록
                    </Button>
                </Form>
            </div>

            {/* 댓글 목록 */}
            <div id="comment_list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-profile">👤</div>
                        <div className="comment-content">
                            <span className="comment-name">{comment.name}</span>
                            <p className="comment-text">{comment.text}</p>

                            {/* 답글 버튼 */}
                            <Button
                                variant="warning"
                                className="reply-btn"
                                onClick={() => toggleReplyForm(comment.id)}
                            >
                                답글
                            </Button>

                            {/* 답글 입력 폼 */}
                            {showReplyForm[comment.id] && (
                                <Form className="reply-form" onSubmit={(e) => { e.preventDefault(); handleReplySubmit(comment.id); }}>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="답글을 입력해주세요."
                                        value={replyText[comment.id] || ""}
                                        onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                                        style={{ height: "80px" }}
                                    />
                                    <Button type="submit"  className="submit-reply-btn">등록</Button>
                                </Form>
                            )}

                            {/* 답글 목록 */}
                            <div className="reply-list">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="reply-item">
                                        <div className="reply-profile">└👤</div>
                                        <div className="reply-content">
                                            <span className="reply-name">{reply.name}</span>
                                            <p className="reply-text">{reply.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentComponent;