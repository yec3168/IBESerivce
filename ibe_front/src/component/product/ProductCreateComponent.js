import React, { useState, useRef, useEffect  } from "react";
import { Row, Col, FloatingLabel, Form, Button, OverlayTrigger , Popover} from "react-bootstrap";
import {saveProduct} from "../service/ProductService";

import './Product.css';

const ProductCreateComponent = () => {
    const [images, setImages] = useState([]);
    const [productTitle, setProductTitle] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productConditionState, setProductConditionState] = useState("");
    const [productPoint, setProductPoint] = useState("");
    const [productContent, setProductContent] = useState(""); // For product content
    const [errors, setErrors] = useState({});
    const contentRef = useRef(null); 
    // 이미지 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        console.log(file)
        // 파일이고/ 이미지로 시작하며/ 5개이하면 ok
        if (file && file.type.startsWith('image/') && images.length < 5) {
            setImages(prevImages => [...prevImages, file]);
            setErrors(prevErrors => ({ ...prevErrors, images: undefined })); // Clear image error
        } else {
            setErrors(prevErrors => ({ ...prevErrors, images: "최대 5개의 이미지를 업로드할 수 있습니다." }));
        }

        event.target.value = ""; // Reset the file input after selection
    };
    // 이미지 제거
    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    // validation 체크.
    const validateForm = () => {
        const newErrors = {};
        
        if (productTitle.trim() === "") {
            newErrors.title = "제품 제목을 입력해야 합니다.";
        }
        if (productCategory === "") {
            newErrors.category = "카테고리를 선택해야 합니다.";
        }
        if (productConditionState.trim() === "") {
            newErrors.condition = "제품 상태를 선택해야 합니다.";
        }
        if (productPoint.trim() === "" || isNaN(productPoint) || Number(productPoint) <= 0) {
            newErrors.points = "올바른 포인트를 입력해야 합니다.";
        }
        if (images.length === 0) {
            newErrors.images = "이미지를 업로드해야 합니다.";
        }
        if (productContent.trim() === "") {
            newErrors.content = "제품 상세 내용을 입력해야 합니다.";
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formErrors = validateForm();
        // 유효성 검사에서 오류가 발생하면 반환
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        // // FormData 객체 생성
        const formData = new FormData();
        formData.append("productFormRequest", new Blob([JSON.stringify({
            productTitle,
            productCategory,
            productConditionState,
            productPoint,
            productContent,
        })], { type: "application/json" }));
        images.forEach(image => {
            formData.append("images", image);
        });
       
        saveProduct(formData)
        .then( (response) =>{
            console.log(response)

            setProductTitle("");
            setProductCategory("");
            setProductConditionState("");
            setProductPoint("");
            setProductContent("");
            setImages([]);
            setErrors({});

            alert("등록에 성공하였습니다.\n 잠시만 기다려주세요.")
            window.location.href ="/products"
        })
        .catch(errors =>{
            console.log(errors)
            alert("등록에 실패했습니다. 다시 시도해주세요.")
            return false;
        })

    };

    
    const handleContentChange = (e) => {
        const content = e.target.value;
        if (content.length <= 255) { // Limit content to 255 characters
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

    
      // Tooltip content with HTML and styling
    //   const contentTooltip = (
    //     <Tooltip >
    //         <div class="custom-tooltip_product">
    //             <h5>📋 <strong>상세 내용 작성 가이드</strong></h5>
    //             <p>판매 글의 신뢰도를 높이고 원활한 거래를 위해 다음 정보를 포함하세요:</p>
    //             <ul >
    //                 <li><strong>상품의 상태:</strong> 사용감, 스크래치, 작동 상태 등을 포함해 구체적으로 적어주세요.</li>
    //                 <li><strong>사용 기간 및 구매처:</strong> 예: <em>"2022년 5월에 구매, 사용 기간 1년"</em></li>
    //                 <li><strong>기능 이상 여부:</strong> 상품의 모든 기능이 정상 작동하는지 여부를 명확히 기재하세요.</li>
    //                 <li><strong>추가 구성품:</strong> 케이스, 설명서, 보증서 등 포함 여부를 알려주세요.</li>
    //             </ul>
    //             <Image 
    //                 src="https://via.placeholder.com/150" 
    //                 rounded 
    //                 style={{ width: '50%', marginTop: '10px' }} 
    //                 alt="상품 상세 예시 이미지"
    //             />
    //             <p className="mt-3"><strong>예시:</strong></p>
    //             <blockquote className="bg-light p-3 rounded">
    //                 <em>
    //                     "2022년 5월 구매 후 약 1년 사용했습니다. 약간의 사용감은 있지만 작동에 문제는 없습니다. <br/>
    //                     스크래치와 생활 흔적이 있으니 참고 부탁드립니다. <br/>
    //                     추가로 원래 박스, 설명서와 정품 케이스를 포함해 드립니다."
    //                 </em>
    //             </blockquote>
    //         </div>
    //     </Tooltip>
    // );
    const contentTooltip = (
        <Popover id="popover-basic" className="custom-tooltip_product">
            <Popover.Header as="h5">📋 <strong>상세 내용 작성 가이드</strong></Popover.Header>
            <Popover.Body>
                <p>판매 글의 신뢰도를 높이고 원활한 거래를 위해 다음 정보를 포함하세요:</p>
                <ul>
                    <li><strong>상품의 상태:</strong> 사용감, 스크래치, 작동 상태 등을 포함해 구체적으로 적어주세요.</li>
                    <li><strong>사용 기간 및 구매처:</strong> 예: <em>"2022년 5월에 구매, 사용 기간 1년"</em></li>
                    <li><strong>기능 이상 여부:</strong> 상품의 모든 기능이 정상 작동하는지 여부를 명확히 기재하세요.</li>
                    <li><strong>추가 구성품:</strong> 케이스, 설명서, 보증서 등 포함 여부를 알려주세요.</li>
                </ul>
                {/* <Image
                    src="https://via.placeholder.com/150"
                    rounded
                    style={{ width: '50%', marginTop: '10px' }}
                    alt="상품 상세 예시 이미지"
                /> */}
                <p className="mt-3"><strong>예시:</strong></p>
                <blockquote className="bg-light p-3 rounded">
                    <em>
                        2022년 5월 구매 후 약 1년 사용했습니다. <br />
                        약간의 사용감은 있다보니 생활 스크래치 정도 있지만, 작동에 문제는 없습니다. <br />
                        추가로 원래 박스, 설명서와 정품 케이스를 포함해 배송드립니다.<br />
                        기존의 쓰던 정품충전기가 있지만 사용감이 많아 필요하시다면 동봉하여 보내드릴태니 구매시 댓글 부탁드립니다~ <br/>
                    </em>
                </blockquote>
            </Popover.Body>
        </Popover>
    );
    return (
        <div className="product">
            <div id="section_1">
                <p id="page_title" className='h1 mx-5'>판매신청</p>
            </div>

            <div id='section_2'>
                <Form className="bg-white rounded" onSubmit={handleSubmit}>
                    
                      <Row>
                        <Form.Group as={Row} className="mb-3" controlId="product_category">
                            <Form.Label column sm="2" className="product_form_title">
                                카테고리
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingCategory" label="카테고리" className="product_form_label mb-3">
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
                                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
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
                                <FloatingLabel controlId="floatingTitle" label="제목을 입력해주세요." className="product_form_label mb-3">
                                    <Form.Control type="text" placeholder="제목을 입력해주세요." 
                                        value={productTitle} 
                                        onChange={(e) => setProductTitle(e.target.value)} 
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                    </Row>


                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="product_state">
                            <Form.Label column sm="2" className="product_form_title">
                                상태
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingCondition" label="상태" className="product_form_label mb-3">
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
                                    <Form.Control.Feedback type="invalid">{errors.condition}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="product_point">
                            <Form.Label column sm="2" className="product_form_title">
                                포인트
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingPoints" label="포인트" className="product_form_label mb-3">
                                    <Form.Control 
                                        type="number" 
                                        placeholder="포인트를 입력해주세요." 
                                        value={productPoint} 
                                        onChange={(e) => setProductPoint(e.target.value)} 
                                        isInvalid={!!errors.points}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.points}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                    </Row>

                      {/* 상세 내용 */}
                    <Row>
                        <Form.Label column sm="2" className="product_form_title" >
                            상세내용 
                                <OverlayTrigger
                                    trigger="hover"
                                    placement="right"
                                    overlay={contentTooltip}
                                    delay={{ show: 250, hide: 400 }}
                                >
                                    <span style={{ marginLeft: "10px", color: "#666666", cursor: "pointer" }}>?</span>
                                </OverlayTrigger>
                            </Form.Label>
                        <Col>
                            <FloatingLabel controlId="floatingContent" label="제품 상세 내용" className="product_form_label mb-3">
                                <Form.Control 
                                    as="textarea" 
                                    ref={contentRef}
                                    placeholder="상세 내용을 입력해주세요." 
                                    value={productContent} 
                                    onChange={handleContentChange}
                                    isInvalid={!!errors.content}
                                    style={{ resize: 'none', overflow: 'hidden' }}
                                />
                                <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label column sm="2" className="product_form_title" >이미지 추가하기</Form.Label>
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
                                    style={{backgroundColor:'#FFD774'}} 
                                    disabled={images.length >= 5} // Disable if 5 images are already added
                                >
                                    {images.length < 5 ? "이미지 선택" : "이미지 추가 완료"}
                                </Button>
                                <Form.Control.Feedback type="invalid">{errors.images}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                    <Form.Label column sm="2"></Form.Label>
                        {/* Fixed boxes for images */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Col key={index} className="mb-3" style={{ maxWidth: '150px'}}>
                                <div className="image-thumbnail" style={{height: '100px'}}>
                                    {images[index] && (
                                        <>
                                            <img 
                                                src={URL.createObjectURL(images[index])} 
                                                alt={`Preview ${index + 1}`} 
                                                className="img-thumbnail" 
                                                style={{ width: '100%', height: '100px', objectFit: 'cover' }} // Fixed size for thumbnails
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
                        <Button  type="submit" variant="default" style={{backgroundColor:'#FFD774'}} >등록하기</Button>
                    </div>
                  
                </Form>
            </div>
        </div>
    );
}

export default ProductCreateComponent;
