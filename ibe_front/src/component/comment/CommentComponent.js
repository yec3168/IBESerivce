import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRegCommentDots } from "react-icons/fa6";
import { saveProductComment, getProductCommentList } from "../service/ProductService";
import {useParams} from "react-router-dom";

import "./Comment.css";
const CommentComponent = () => {
    const [comments, setComments] = useState([
        { id: 1, name: "익명", text: "비밀댓글입니다.", createAt: "2024-10-12", replies: [] },
        { id: 2, name: "판매자", text: "비밀댓글입니다.", createAt: "2024-10-12", replies: [] },
        { id: 3, name: "홍길동", text: "서로이웃 추가 부탁드려요!", createAt: "2024-10-12", replies: [] },
    ]);

    const [newComment, setNewComment] = useState(""); // 새로운 댓글 내용
    const [replyText, setReplyText] = useState({}); // 대댓글 내용
    const [showReplyForm, setShowReplyForm] = useState({}); // 대댓글 입력 폼 표시 여부
    const [isEmpty, setIsEmpty] = useState(false); // 오류 상태 관리
    const {id} = useParams();

    //댓글 목록 출력.
    useEffect(() => {
        getProductCommentList({ productId: id })
            .then(response => {
                console.log(response.data);
                if (response.data.code === "200") {
                    // 댓글 목록 업데이트
                    const data = response.data.data;
                    // comments에 필요한 형식으로 매핑
                    const formattedComments = data.map(comment => ({
                        id: comment.productCommentId,
                        name: comment.member ? comment.member.memberNickName : "익명",
                        text: comment.productCommentContent,
                        createAt: comment.productCommentCreatedAt,
                        replies: [] // 대댓글 부분은 필요에 따라 추가
                    }));
                setComments(formattedComments);
                }
            })
            .catch(error => {
                console.error("댓글 목록 조회 중 오류 발생:", error);
            });
    }, [id]);
    




    // 댓글 제출 핸들러
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const productCommentFormRequest = {
                productId : id,
                productCommentContent: newComment // 댓글 내용
            };

            // 댓글을 백엔드로 전송
            await saveProductComment(productCommentFormRequest)
                .then(response => {
                    console.log(response.data);
                    if (response.data.code === "200") {
                        alert("댓글이 성공적으로 등록되었습니다!");
                        // 댓글 목록 업데이트
                        const data =response.data.data;
                        setComments([...comments, {
                            id: data.productCommentId,
                            name: "익명", // 나중에 MemberNickName으로 수정.
                            text: data.productCommentContent,
                            createAt: data.productCommentCreatedAt, // 현재 날짜
                            replies: []
                        }]);
                        setNewComment(""); // 입력 필드 초기화
                        setIsEmpty(false); // 오류 상태 초기화
                    } else {
                        console.error("댓글 등록 실패");
                        setIsEmpty(true); // 오류 상태 업데이트
                    }
                })
                .catch(error => {
                    console.error("댓글 등록 중 오류 발생:", error);
                    setIsEmpty(true); // 오류 상태 업데이트
                });
        }
    };

    // 대댓글 제출 핸들러
    const handleReplySubmit = async (commentId) => {
        if (replyText[commentId]?.trim()) {
            const newReplyData = {
                content: replyText[commentId], // 대댓글 내용
            };

            // 대댓글을 백엔드로 전송
            // await saveReply(commentId, newReplyData)
            //     .then(response => {
            //         console.log(response.data);
            //         if (response.data.code === "200") {
            //             alert("답글이 성공적으로 등록되었습니다!");
            //             // 댓글 목록 업데이트
            //             const updatedComments = comments.map((comment) =>
            //                 comment.id === commentId
            //                     ? { ...comment, replies: [...comment.replies, {
            //                         id: Date.now(),
            //                         name: "익명",
            //                         text: replyText[commentId],
            //                         createAt: new Date().toLocaleString() // 현재 날짜
            //                     }] }
            //                     : comment
            //             );
            //             setComments(updatedComments);
            //             setReplyText({ ...replyText, [commentId]: "" }); // 입력 필드 초기화
            //             setShowReplyForm({ ...showReplyForm, [commentId]: false }); // 입력 폼 닫기
            //         } else {
            //             console.error("답글 등록 실패");
            //             setIsEmpty(true); // 오류 상태 업데이트
            //         }
            //     })
            //     .catch(error => {
            //         console.error("답글 등록 중 오류 발생:", error);
            //         setIsEmpty(true); // 오류 상태 업데이트
            //     });
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
