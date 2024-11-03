import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRegCommentDots } from "react-icons/fa6";
import { saveProductComment, getProductCommentList, saveProductReply } from "../service/ProductService";
import { useParams } from "react-router-dom";

import "./Comment.css";

const CommentComponent = () => {
    // 댓글 상태 관리
    const [comments, setComments] = useState([
        { id: 1, name: "익명", text: "비밀댓글입니다.", createAt: "2024-10-12", replies: [] },
        { id: 2, name: "판매자", text: "비밀댓글입니다.", createAt: "2024-10-12", replies: [] },
        { id: 3, name: "홍길동", text: "서로이웃 추가 부탁드려요!", createAt: "2024-10-12", replies: [] },
    ]);

    const [newComment, setNewComment] = useState(""); // 새 댓글 내용 상태
    const [replyText, setReplyText] = useState({}); // 대댓글 내용 상태
    const [showReplyForm, setShowReplyForm] = useState({}); // 대댓글 입력 폼 표시 여부 상태
    const [isEmpty, setIsEmpty] = useState(false); // 오류 상태 관리
    const { id } = useParams(); // URL에서 상품 ID 가져오기

    // 댓글 목록 조회 - 페이지 로드 시 서버에서 댓글 목록을 가져옴
    useEffect(() => {
        getProductCommentList({ productId: id })
            .then(response => {
                if (response.data.code === "200") {
                    const data = response.data.data;
                    console.log(data)
                    // 댓글 데이터 형식을 변환하여 comments 상태에 저장
                    const formattedComments = data.map(comment => ({
                        id: comment.productCommentId,
                        name: comment.member ? comment.member.memberNickName : "익명",
                        text: comment.productCommentContent,
                        createAt: comment.productCommentCreatedAt,
                         // 대댓글 형식 변환
                        replies: comment.productReplyResponseList.map(reply => ({
                            id: reply.productReplyId,
                            name: reply.member ? reply.member.memberNickName : "익명",
                            text: reply.productReplyContent,
                            createAt: reply.productReplyCreatedAt
                        }))
                    }));
                    setComments(formattedComments);
                } else {
                    setComments([]);
                }
            })
            .catch(error => {
                console.error("댓글 목록 조회 중 오류 발생:", error);
                setComments([]);
            });
    }, [id]);

    // 댓글 제출 핸들러 - 댓글을 작성하여 서버에 저장하는 함수
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const productCommentFormRequest = {
                productId: id,
                productCommentContent: newComment // 작성된 댓글 내용
            };

            // 서버에 댓글 저장 요청
            await saveProductComment(productCommentFormRequest)
                .then(response => {
                    if (response.data.code === "200") {
                        alert("댓글이 성공적으로 등록되었습니다!");
                        const data = response.data.data;
                        // 새로 등록한 댓글을 comments 상태에 추가
                        setComments([...comments, {
                            id: data.productCommentId,
                            name: data.member ? data.member.memberNickName : "익명",
                            text: data.productCommentContent,
                            createAt: data.productCommentCreatedAt,
                            replies: []
                        }]);
                        setNewComment(""); // 입력 필드 초기화
                        setIsEmpty(false); // 오류 상태 초기화
                    } else {
                        console.error("댓글 등록 실패");
                        setIsEmpty(true); // 오류 상태 설정
                    }
                })
                .catch(error => {
                    alert("잠시후 다시 시도해주세요.")
                    console.error("댓글 등록 중 오류 발생:", error);
                    setIsEmpty(true); // 오류 상태 설정
                });
        }
    };

    // 대댓글 제출 핸들러 - 대댓글을 작성하여 서버에 저장하는 함수
    const handleReplySubmit = async (commentId) => {
        if (replyText[commentId]?.trim()) {
            const productReplyRequest = {
                productId: id,
                productCommentId: commentId,
                productReplyContent: replyText[commentId]
            };
    
            try {
                const response = await saveProductReply(productReplyRequest);
                if (response.data.code === "200") {
                    const data = response.data.data;
                    alert("대댓글이 성공적으로 등록되었습니다!");
    
                    // Update comments state with the new reply
                    const updatedComments = comments.map(comment => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                replies: [
                                    ...comment.replies,
                                    {
                                        id: data.productReplyId,
                                        name: data.member ? data.member.memberNickName : "익명",
                                        text: data.productReplyContent,
                                        createAt: data.productReplyCreatedAt
                                    }
                                ]
                            };
                        }
                        return comment;
                    });
    
                    setComments(updatedComments); // Update the comments state
                    setReplyText({ ...replyText, [commentId]: "" }); // Clear the input field
                    setShowReplyForm({ ...showReplyForm, [commentId]: false }); // Hide the reply form
                } else {
                    console.error("대댓글 등록 실패");
                    setIsEmpty(true);
                }
            } catch (error) {
                alert("잠시후 다시 시도해주세요.");
                console.error("대댓글 등록 중 오류 발생:", error);
                setIsEmpty(true);
            }
        }
    };

    // 대댓글 입력 폼 표시/숨김 토글 함수
    const toggleReplyForm = (commentId) => {
        setShowReplyForm((prevState) => ({ ...prevState, [commentId]: !prevState[commentId] }));
    };

     // Function to calculate total comment count including replies
     const getTotalCommentsCount = () => {
        return comments.length + comments.reduce((acc, comment) => acc + comment.replies.length, 0);
    };

    return (
        <div id="comment">
            {/* 상단 댓글 수 및 신고 */}
            <div id="comment_info">
                <span className="comment_top"><FaRegCommentDots /> 댓글 {getTotalCommentsCount()}</span>
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
                    <Button type="submit" className="submit-btn">등록</Button>
                </Form>
            </div>

            {/* 댓글 목록 */}
            <div id="comment_list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-profile">👤</div>
                        <div className="comment-content">
                            <div>
                                <span className="comment-name">{comment.name}</span>
                                <span className="comment-createdAt mx-2">{comment.createAt}</span>
                            </div>
                            
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
                                    <Button type="submit" className="submit-reply-btn">등록</Button>
                                </Form>
                            )}

                            {/* 답글 목록 */}
                            <div className="reply-list">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="reply-item">
                                        <div className="reply-profile">└ 👤</div>
                                        <div className="reply-content">
                                            <div>
                                                <span className="reply-name">{reply.name}</span>
                                                <span className="reply-createdAt mx-2">{reply.createAt}</span>
                                            </div>
                                            
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
