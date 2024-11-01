import React, { useState } from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
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
        })
        .catch(errors =>{
            console.log(errors)
        })


        // try {
        //     // Spring Boot API 호출
        //     const response = await fetch("/api/products", {
        //         method: "POST",
        //         body: formData,
        //         headers: {
        //             "Accept": "application/json",
        //         },
        //     });
    
        //     if (!response.ok) {
        //         throw new Error("Failed to create product");
        //     }
    
        //     const data = await response.json();
            
        //     // 서버에서 이미지 경로를 받아온 후 객체에 저장
        //     const savedProduct = {
        //         ...data,
        //         imagePaths: data.images.map(image => image.imagePath) // 서버 응답에서 이미지 경로를 추출
        //     };
            
        //     console.log("Product Details Submitted:", savedProduct);
    
        //     // 폼 리셋
        //     setProductTitle("");
        //     setProductCategory("");
        //     setProductConditionState("");
        //     setProductPoint("");
        //     setProductContent("");
        //     setImages([]);
        //     setErrors({});
        // } catch (error) {
        //     console.error("Error submitting product:", error);
        // }
    };

    return (
        <div className="product">
            <div id="section_1">
                <p id="page_title" className='h1 mx-5'>판매신청</p>
            </div>

            <div id='section_2'>
                <Form className="bg-white rounded" onSubmit={handleSubmit}>
                    
                      <Row>
                        <Form.Group as={Row} className="mb-3" controlId="product_category">
                            <Form.Label column sm="2">
                                카테고리
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingCategory" label="카테고리" className="mb-3">
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
                            <Form.Label column sm="2">
                                제목
                            </Form.Label>
                            <Col sm="10">
                                <FloatingLabel controlId="floatingTitle" label="제목을 입력해주세요." className="mb-3">
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

                    {/* <Row>
                        <Form.Group as={Col} className="mb-3" controlId="product_state">
                            <Form.Label column >
                                상태
                            </Form.Label>
                            <Col  >
                                <FloatingLabel controlId="floatingCondition" label="상태" className="mb-3">
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

                        <Form.Group as={Col} className="mb-3" controlId="product_point">
                            <Form.Label column>
                                포인트
                            </Form.Label>
                            <Col  >
                                <FloatingLabel controlId="floatingPoints" label="포인트" className="mb-3">
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
                    </Row> */}
            

                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="product_state">
                            <Form.Label column sm="2">
                                상태
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingCondition" label="상태" className="mb-3">
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
                            <Form.Label column sm="2">
                                포인트
                            </Form.Label>
                            <Col  className="col-3">
                                <FloatingLabel controlId="floatingPoints" label="포인트" className="mb-3">
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

                    <Row>
                        <Form.Label column sm="2">
                            상세내용
                        </Form.Label>
                        <Col>
                            <FloatingLabel controlId="floatingContent" label="제품 상세 내용" className="mb-3">
                                <Form.Control 
                                    as="textarea" 
                                    placeholder="상세 내용을 입력해주세요." 
                                    value={productContent} 
                                    onChange={(e) => setProductContent(e.target.value)} 
                                    isInvalid={!!errors.content}
                                    style={{ height: '200px' }} // Set height for textarea
                                />
                                <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label column sm="2">이미지 추가하기</Form.Label>
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
