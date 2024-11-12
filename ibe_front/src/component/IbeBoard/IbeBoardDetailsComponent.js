import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import IbeBoardCommentComponent from './IbeBoardCommentComponent';
import { FaRegCommentDots } from 'react-icons/fa6';

const IbeBoardDetailsComponent = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [hasDeletePermission, setHasDeletePermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);  // Result modal state
  const [resultMessage, setResultMessage] = useState("");  // Result message state

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
              category: categoryMap[data.data.boardCategory] || data.data.boardCategory,
              title: data.data.boardTitle,
              nickname: data.data.member.memberNickName,
              email: data.data.member.memberEmail,
              createdAt: data.data.boardCreatedAt,
              views: data.data.boardHit,
              content: data.data.boardContent,
              commentCount: data.data.boardCommentCnt,
              categoryEng: data.data.boardCategory, // 해당 값을
            };
            
            setPost(postData);
            console.log(postData)
  
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
    // const isConfirmed = window.confirm('게시글을 정말 삭제하시겠습니까?');
    // if (isConfirmed) {
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
            // alert('게시글이 삭제되었습니다.');
            // navigate('/boards');
            setResultMessage('게시글이 삭제되었습니다.')
            handleCloseModal()
            setShowResultModal(true);
          } else {
            setResultMessage('게시글 삭제를 실패했습니다.')
            setShowResultModal(true);
            console.error('게시글 삭제 실패:', data.message);
          }
        })
        .catch((error) => console.error('Error deleting post:', error));
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    navigate('/boards');
  };
  const handleUpdateBtn=()=>{
    navigate(`/boards/details/update/${boardId}`);
  }
  return (
    <div id="board_content">
      <Container className="board-container">
        <Row style={{fontFamily:"Paperlogy-4Regular"}}>   
        <p className='h3'>
          {post ? (
            <>
              <span className={`board-category-${post.categoryEng}`}>[{post.category}]</span> {post.title}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </p>
        </Row>

        {post && (
          <>
            <Row style={{fontFamily:"Pretendard-Regular"}}>
              <Col>
                <div style={{ display: 'inline-block', marginRight: '20px', fontSize:"12px" }}>
                  <strong>작성자:</strong> {post.nickname}
                </div>
                <div style={{ display: 'inline-block', marginRight: '20px', fontSize:"12px"}}>
                  <strong>등록 시간:</strong> {post.createdAt}
                </div>
                <div style={{ display: 'inline-block', marginRight: '20px', fontSize:"12px"}}>
                  <strong>조회수:</strong> {post.views}
                </div>
                <div style={{display:'inline',float:"right"}}>
                  {
                    (isAuthor) && (
                      <Button variant="warning"
                         style={{ marginRight: '10px', borderRadius:"10px", fontSize:"14px"}}
                        onClick={()=>handleUpdateBtn()}
                        // className="ml-auto"
                      >
                        수정
                      </Button>)
                  }
                  {(isAuthor || hasDeletePermission) && (
                  <Button variant="danger" 
                     style={{borderRadius:"10px", fontSize:"14px" }}
                    onClick={()=>setShowModal(true)}
                    // className="ml-auto"
                  >
                    삭제
                  </Button>
                )}
                </div>
                
                <hr style={{marginBottom:"30px", marginTop:"30px"}}/>
                <p className='board-text' style={{fontSize:"14px"}}>{post.content}</p>
                <br />
                <br />
                {/* <div className="board-comment-top">
                  <FaRegCommentDots /> 댓글 {post.commentCount}
                </div> */}
              </Col>
            </Row>
            {/* 댓글 컴포넌트 포함 */}
            <IbeBoardCommentComponent boardId={boardId} />
          </>
        )}

            <Modal className="board-molal" show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>게시글 삭제 확인</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <h3>게시글을 <span style={{color:'red'}}>삭제</span>하시겠습니까?</h3>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className='board-cancle-btn'  onClick={handleCloseModal}>취소</Button> */}
                    <Button className='board-add-post-btn' onClick={handleDeletePost}>확인</Button>
                </Modal.Footer>
            </Modal>

            {/* 결과 모달 */}
            <Modal  className="board-molal"  show={showResultModal} onHide={handleCloseResultModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>결과</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h3>{resultMessage}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='board-add-post-btn' onClick={handleCloseResultModal}>확인</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </div>
  );
};

export default IbeBoardDetailsComponent;
