import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
} from 'react-bootstrap';
import { saveProduct } from '../service/ProductService';

import './Product.css';

const ProductCreateComponent = () => {
  const [images, setImages] = useState([]);
  const [productTitle, setProductTitle] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productConditionState, setProductConditionState] = useState('');
  const [productPoint, setProductPoint] = useState('');
  const [productContent, setProductContent] = useState(''); // For product content
  const [errors, setErrors] = useState({});
  const [showNoticeModal, setShowNoticeModal] = useState(false); // Notice modal state
  const [showResultModal, setShowResultModal] = useState(false); // Result modal state
  const [resultMessage, setResultMessage] = useState('');
  const contentRef = useRef(null);
  // 이미지 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    console.log(file);
    // 파일이고/ 이미지로 시작하며/ 5개이하면 ok
    if (file && file.type.startsWith('image/') && images.length < 5) {
      setImages((prevImages) => [...prevImages, file]);
      setErrors((prevErrors) => ({ ...prevErrors, images: undefined })); // Clear image error
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: '최대 5개의 이미지를 업로드할 수 있습니다.',
      }));
    }

    event.target.value = ''; // Reset the file input after selection
  };
  // 이미지 제거
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // validation 체크.
  const validateForm = () => {
    const newErrors = {};
    if (productTitle.trim() === '')
      newErrors.title = '제품 제목을 입력해야 합니다.';
    if (productCategory === '')
      newErrors.category = '카테고리를 선택해야 합니다.';
    if (productConditionState.trim() === '')
      newErrors.condition = '제품 상태를 선택해야 합니다.';
    if (
      productPoint.trim() === '' ||
      isNaN(productPoint) ||
      Number(productPoint) <= 0
    )
      newErrors.points = '올바른 포인트를 입력해야 합니다.';
    if (images.length === 0) newErrors.images = '이미지를 업로드해야 합니다.';
    if (productContent.trim() === '')
      newErrors.content = '제품 상세 내용을 입력해야 합니다.';
    return newErrors;
  };

  const handleNoticeConfirm = () => {
    setShowNoticeModal(false);
    submitForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setShowNoticeModal(true); // Show the notice modal first
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append(
      'productFormRequest',
      new Blob(
        [
          JSON.stringify({
            productTitle,
            productCategory,
            productConditionState,
            productPoint,
            productContent,
          }),
        ],
        { type: 'application/json' }
      )
    );
    images.forEach((image) => formData.append('images', image));

    saveProduct(formData)
      .then((response) => {
        setProductTitle('');
        setProductCategory('');
        setProductConditionState('');
        setProductPoint('');
        setProductContent('');
        setImages([]);
        setErrors({});
        setResultMessage('판매신청에 성공하였습니다.\n 잠시만 기다려주세요.');
        setShowResultModal(true);
      })
      .catch(() => {
        setResultMessage('판매신청에 실패했습니다. 다시 시도해주세요.');
        setShowResultModal(true);
      });
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= 255) {
      // Limit content to 255 characters
      setProductContent(content);

      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [productContent]);

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    window.location.href = '/products';
  };
  const handleCloseNoticeModal = () => setShowNoticeModal(false);

  const contentTooltip = (
    <Popover id="popover-basic" className="custom-tooltip_product">
      <Popover.Header as="h5">
        📋 <strong>상세 내용 작성 가이드</strong>
      </Popover.Header>
      <Popover.Body>
        <p>
          판매 글의 신뢰도를 높이고 원활한 거래를 위해 다음 정보를 포함하세요:
        </p>
        <ul>
          <li>
            <strong>상품의 상태:</strong> 사용감, 스크래치, 작동 상태 등을
            포함해 구체적으로 적어주세요.
          </li>
          <li>
            <strong>사용 기간 및 구매처:</strong> 예:{' '}
            <em>"2022년 5월에 구매, 사용 기간 1년"</em>
          </li>
          <li>
            <strong>기능 이상 여부:</strong> 상품의 모든 기능이 정상 작동하는지
            여부를 명확히 기재하세요.
          </li>
          <li>
            <strong>추가 구성품:</strong> 케이스, 설명서, 보증서 등 포함 여부를
            알려주세요.
          </li>
        </ul>
        {/* <Image
                    src="https://via.placeholder.com/150"
                    rounded
                    style={{ width: '50%', marginTop: '10px' }}
                    alt="상품 상세 예시 이미지"
                /> */}
        <p className="mt-3">
          <strong>예시:</strong>
        </p>
        <blockquote className="bg-light p-3 rounded">
          <em>
            2022년 5월 구매 후 약 1년 사용했습니다. <br />
            약간의 사용감은 있다보니 생활 스크래치 정도 있지만, 작동에 문제는
            없습니다. <br />
            추가로 원래 박스, 설명서와 정품 케이스를 포함해 배송드립니다.
            <br />
            기존의 쓰던 정품충전기가 있지만 사용감이 많아 필요하시다면 동봉하여
            보내드릴태니 구매시 댓글 부탁드립니다~ <br />
          </em>
        </blockquote>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="product">
      <div id="section_1">
        <p id="page_title" className="h1 mx-5">
          판매신청
        </p>
      </div>

      <div id="section_2">
        <Form className="bg-white rounded" onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Row} className="mb-3" controlId="product_category">
              <Form.Label column sm="2" className="product_form_title">
                카테고리
              </Form.Label>
              <Col className="col-3">
                <FloatingLabel
                  controlId="floatingCategory"
                  label="카테고리"
                  className="product_form_label mb-3"
                >
                  <Form.Select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    isInvalid={!!errors.category}
                  >
                    <option value="">카테고리를 선택해주세요.</option>
                    <option value="KIDS_BOOKS">아동 도서</option>
                    <option value="KIDS_CLOTHING">아동 의류</option>
                    <option value="KIDS_TOYS">아동 완구</option>
                    <option value="OUTDOOR_SUPPLIES">외부 물품</option>
                    <option value="MISC">기타</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Row} className="mb-3" controlId="product_title">
              <Form.Label column sm="2" className="product_form_title">
                제목
              </Form.Label>
              <Col sm="10">
                <FloatingLabel
                  controlId="floatingTitle"
                  label="제목을 입력해주세요."
                  className="product_form_label mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="제목을 입력해주세요."
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Row} className="mb-3" controlId="product_state">
              <Form.Label column sm="2" className="product_form_title">
                상태
              </Form.Label>
              <Col className="col-3">
                <FloatingLabel
                  controlId="floatingCondition"
                  label="상태"
                  className="product_form_label mb-3"
                >
                  <Form.Select
                    value={productConditionState}
                    onChange={(e) => setProductConditionState(e.target.value)}
                    isInvalid={!!errors.condition}
                  >
                    <option value="">상태를 선택해주세요.</option>
                    <option value="HIGH">상</option>
                    <option value="MEDIUM">중</option>
                    <option value="LOW">하</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.condition}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Row} className="mb-3" controlId="product_point">
              <Form.Label column sm="2" className="product_form_title">
                포인트
              </Form.Label>
              <Col className="col-3">
                <FloatingLabel
                  controlId="floatingPoints"
                  label="포인트"
                  className="product_form_label mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="포인트를 입력해주세요."
                    value={productPoint}
                    onChange={(e) => setProductPoint(e.target.value)}
                    isInvalid={!!errors.points}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.points}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Form.Group>
          </Row>

          {/* 상세 내용 */}
          <Row>
            <Form.Label column sm="2" className="product_form_title">
              상세내용
              <OverlayTrigger
                trigger="hover"
                placement="right"
                overlay={contentTooltip}
                delay={{ show: 250, hide: 400 }}
              >
                <span
                  style={{
                    marginLeft: '10px',
                    color: '#666666',
                    cursor: 'pointer',
                  }}
                >
                  ?
                </span>
              </OverlayTrigger>
            </Form.Label>
            <Col>
              <FloatingLabel
                controlId="floatingContent"
                label="제품 상세 내용"
                className="product_form_label mb-3"
              >
                <Form.Control
                  as="textarea"
                  ref={contentRef}
                  placeholder="상세 내용을 입력해주세요."
                  value={productContent}
                  onChange={handleContentChange}
                  isInvalid={!!errors.content}
                  style={{ resize: 'none', overflow: 'hidden' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label column sm="2" className="product_form_title">
                  이미지 추가하기
                </Form.Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  hidden
                  id="imageUpload"
                />
                <Button
                  variant="default"
                  onClick={() => document.getElementById('imageUpload').click()}
                  style={{ backgroundColor: '#FFD774' }}
                  disabled={images.length >= 5} // Disable if 5 images are already added
                >
                  {images.length < 5 ? '이미지 선택' : '이미지 추가 완료'}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.images}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Label column sm="2"></Form.Label>
            {/* Fixed boxes for images */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Col key={index} className="mb-3" style={{ maxWidth: '150px' }}>
                <div className="image-thumbnail" style={{ height: '100px' }}>
                  {images[index] && (
                    <>
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`Preview ${index + 1}`}
                        className="img-thumbnail"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                        }} // Fixed size for thumbnails
                      />
                      <div className="image-name">{images[index].name}</div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        삭제
                      </Button>
                    </>
                  )}
                  {/* Show placeholder if no image */}
                  {/* {!images[index] && <div className="placeholder">이미지 없음</div>} */}
                </div>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-end my-5">
            <Button
              type="submit"
              variant="default"
              style={{ backgroundColor: '#FFD774' }}
            >
              판매신청
            </Button>
          </div>

          <Modal
            className="productModal"
            show={showNoticeModal}
            onHide={handleCloseNoticeModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="productModalTitle">
                판매신청 주의사항
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="productModalContent"
              style={{ height: '250px' }}
            >
              <p>판매게시글 등록 시 다음 주의사항을 반드시 확인해 주세요:</p>
              <ul>
                <li>
                  <strong>승인 필수:</strong> 모든 판매 게시글은 관리자의 승인이
                  필요합니다. 승인 후에만 다른 사용자들에게 게시글이 노출됩니다.
                </li>
                <li>
                  <strong>승인 소요 기간:</strong> 승인에는 최대 2일이 소요될 수
                  있으며, 심사량에 따라 지연될 수 있습니다.
                </li>
                <li>
                  <strong>내용 준수:</strong> 부적절한 언어나 허위 정보,
                  공격적인 콘텐츠를 포함한 게시물은 승인되지 않을 수 있습니다.
                  이미지와 설명이 플랫폼 규정에 맞는지 확인해 주세요.
                </li>
                <li>
                  <strong>이미지 및 설명 품질:</strong> 규정의 위배되는 이미지와
                  설명은 서비스 이용에 제한이 될 수 있습니다.
                </li>
                <li>
                  <strong>안전과 개인정보 보호:</strong> 게시글에 개인 연락처나
                  개인 정보를 포함하지 않도록 주의해 주세요.
                </li>
                <li>
                  <strong>판매 금지 품목:</strong> 플랫폼에서 금지된 품목(예:
                  위조품, 제한 물품 등)은 등록이 거부됩니다.
                </li>
                <li>
                  <strong>책임 조항:</strong> 상품 상태 및 소유권과 관련된 모든
                  문제에 대한 책임은 판매자에게 있습니다.
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer className="productModalFooter">
              <Button variant="secondary" onClick={handleCloseNoticeModal}>
                취소
              </Button>
              <Button variant="custom" onClick={handleNoticeConfirm}>
                확인
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Result Modal */}
          <Modal
            className="productModal"
            show={showResultModal}
            onHide={handleCloseResultModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="productModalTitle">
                판매신청 결과
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="productModalContent">
              <p>{resultMessage}</p>
            </Modal.Body>
            <Modal.Footer className="productModalFooter">
              <Button
                variant="default"
                style={{ backgroundColor: '#FFD774' }}
                onClick={handleCloseResultModal}
              >
                확인
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    </div>
  );
};
export default ProductCreateComponent;
