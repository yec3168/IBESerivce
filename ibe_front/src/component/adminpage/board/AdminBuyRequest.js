import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSalesRequest.css';

const AdminBuyRequest = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [salesRequests, setSalesRequests] = useState([]);
  const [rejectionReason, setRejectionReason] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [images, setImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 추가

  const categoryMapping = {
    KIDS_CLOTHING: '아동 의류',
    KIDS_TOYS: '아동 완구',
    KIDS_BOOKS: '아동 도서',
    OUTDOOR_SUPPLIES: '외출 용품',
    MISC: '기타',
  };

  const mapCategory = (category) => categoryMapping[category] || category;

  useEffect(() => {
    const fetchSalesRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/board/salesrequest'
        );
        const requests = response.data.map((request) => ({
          id: request.productId,
          category: mapCategory(request.productCategory),
          title: request.productTitle,
          nickname: request.memberNickName,
          date: request.productCreatedAt.split('T')[0],
          content: request.productContent,
        }));
        setSalesRequests(requests);
      } catch (error) {
        console.error('Error fetching sales requests:', error);
      }
    };

    fetchSalesRequests();
  }, []);

  const sortedRequests = [...salesRequests].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleExpand = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(id);
    // 클릭한 아이템의 productId로 이미지 가져오기
    fetchImages(id);
  };

  const fetchImages = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/board/salesrequest/img',
        { productId }
      );
      const imageList = response.data;

      // imageList가 배열인지 확인하고, 아니면 빈 배열로 설정
      setImages((prevImages) => ({
        ...prevImages,
        [productId]: Array.isArray(imageList) ? imageList : [],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages((prevImages) => ({
        ...prevImages,
        [productId]: [],
      }));
    }
  };

  const handleApproval = async (productId) => {
    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/yes`, {
        productId,
      });
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
      alert('판매 요청이 승인되었습니다.');
    } catch (error) {
      console.error('Error approving sales request:', error);
    }
  };

  const handleRejectionClick = async (productId) => {
    const rejectionText = rejectionReason[productId] || '';
    if (!rejectionText) {
      setErrorMessage({
        ...errorMessage,
        [productId]: '거절 사유를 입력해주세요.',
      });
      return;
    }

    try {
      await axios.post(`http://localhost:8080/admin/board/salesrequest/no`, {
        productId,
        rejectionText,
      });
      setSalesRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== productId)
      );
      setErrorMessage({ ...errorMessage, [productId]: '' });
      alert('판매 요청이 거절되었습니다.');
    } catch (error) {
      console.error('Error rejecting sales request:', error);
    }
  };

  const handleInputResize = (e, productId) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setRejectionReason({
      ...rejectionReason,
      [productId]: e.target.value,
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedImage(null); // 선택된 이미지 초기화
  };

  return (
    <>
      <h2 className="admin-sr-title">게시판 관리 - 판매신청 목록</h2>
      <div className="admin-sr-sales-request-container">
        <div className="admin-sr-sales-request-column">
          <div className="admin-sr-column admin-sr-id">ID</div>
          <div className="admin-sr-column admin-sr-category">카테고리</div>
          <div className="admin-sr-column admin-sr-title">제목</div>
          <div className="admin-sr-column admin-sr-nickname">닉네임</div>
          <div className="admin-sr-column admin-sr-date">신청일</div>
        </div>
        {sortedRequests.map((request) => (
          <div key={request.id} className="admin-sr-sales-request-item">
            <div
              className="admin-sr-sales-request-header"
              onClick={() => toggleExpand(request.id)}
            >
              <div className="admin-sr-column admin-sr-id">{request.id}</div>
              <div className="admin-sr-column admin-sr-category">
                {request.category}
              </div>
              <div className="admin-sr-column admin-sr-title">
                {request.title}
              </div>
              <div className="admin-sr-column admin-sr-nickname">
                {request.nickname}
              </div>
              <div className="admin-sr-column admin-sr-date">
                {new Date(request.date).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            </div>
            {expandedId === request.id && (
              <div className="admin-sr-sales-request-content">
                {request.content}
                <div className="admin-sr-images-container">
                  <br />
                  이미지를 클릭해서 확대하기
                  {images[request.id] && Array.isArray(images[request.id]) ? (
                    <table className="admin-sr-image-table">
                      <tbody>
                        <tr>
                          {images[request.id].map((image, index) => (
                            <td
                              key={image.productImgId}
                              className="admin-sr-image-td"
                            >
                              <img
                                src={`http://localhost:8080${image.imagePath}`}
                                alt={`상품 이미지 ${index + 1}`}
                                className="admin-sr-image"
                                onClick={() => openModal(image)} // 이미지 클릭 시 모달 열기
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <p>이미지가 없습니다.</p>
                  )}
                </div>

                <div className="admin-sr-button-container">
                  <button
                    className="admin-sr-action-button-yes"
                    onClick={() => handleApproval(request.id)}
                  >
                    승인
                  </button>
                  <button
                    className="admin-sr-action-button-no"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleRejectionClick(request.id)}
                  >
                    거절
                  </button>
                </div>
                <div className="admin-sr-textarea-container">
                  <textarea
                    placeholder="거절 사유 입력"
                    className="admin-sr-textarea"
                    value={rejectionReason[request.id] || ''}
                    onChange={(e) => handleInputResize(e, request.id)}
                    style={{ overflowY: 'hidden' }}
                  />
                </div>
                {errorMessage[request.id] && (
                  <div className="admin-sr-error-message-container">
                    <span className="admin-sr-error-message">
                      {errorMessage[request.id]}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="admin-sr-modal" onClick={closeModal}>
          <div
            className="admin-sr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:8080${selectedImage.imagePath}`}
              alt="상품 이미지"
              className="admin-sr-modal-image"
              onClick={closeModal} // 이미지 클릭 시 모달 닫기
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBuyRequest;
