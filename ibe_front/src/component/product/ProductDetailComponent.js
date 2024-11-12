import thumbnaiil from "../assets/images/thumbnail.png"
import {Row, Col, Carousel, Breadcrumb, Badge, Button  } from "react-bootstrap";
import TrendingProductsComponent from "../main/TrendingProductsComponent";
import CommentCommponent from "../comment/CommentComponent";
import { getProduct } from "../service/ProductService";
import React, {useEffect, useState} from "react"; 
import {useParams} from "react-router-dom";

import "./Product.css"

const ProductDetailComponent = () => {
    // 상품의 이미지 리스트 api를 받아서 등록할 예정 (useEffect 사용)
    const [productCategory, setProductCategory] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productPoint, setProductPoint] = useState("");
    const [productTradeState, setPrdouctTradeState] = useState("");
    const [productHit, setProductHit] = useState("");
    const [productCommentCnt, setProductCommentCnt] = useState(0);//댓글 넣을 위치.
    const [productConditionState, setProductConditionState] = useState("");
    const [memberNickName, setMemberNickName] = useState("");
    const [productListedAt, setProductListedAt] = useState("");
    const [productContent, setProductContent] = useState("");
    //이미지
    const [productImages, setProductImages] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        getProduct(id)
        .then( (response) =>{
            console.log(response.data)
            if(response.data.code === '200'){
                const data = response.data.data;
                    setProductCategory(data.productCategory);
                    setProductTitle(data.productTitle);
                    setProductPoint(addComma(data.productPoint));
                    setPrdouctTradeState(data.productTradeState);
                    setProductHit(data.productHit);

                    setProductCommentCnt(data.productCommentCnt);//댓글 

                    setProductConditionState(data.productConditionState);
                    if(data.member !== null)
                        setMemberNickName(data.member.memberNickName);
                    setProductListedAt(data.productListedAt);
                    setProductContent(data.productContent);
                    setProductImages(data.imagePath); // Set images from response
            }
            else{
                alert(response.data.message);
               
                window.location.href ="/products";
            }
        })
        .catch(error =>{
            console.log(error);
            alert("정보를 가져올 수 없습니다.")
            setProductImages(thumbnaiil); 
            window.location.href ="/products";
        })
    }, [id]);
    
    const backHandler = () =>{
        window.location.href ="/products"
    }
    const purchaseHandler  = () =>{
        if ( productTradeState === "거래 완료"){
            alert("이미 거래가 완료된 상품입니다.")
            return false;
        }
        window.location.href =" /orders/order/" + id;
    }

     const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }
    
    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/"); // 백슬래시를 슬래시로 변경
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };
    return(
        <>
            <div>
                {/* Product의 정보를 보여주는 div */}
                <div className="product">
                    <Row >
                        <Col className="col-6">
                            <Carousel>
                                {productImages.length > 0 ? (
                                    productImages.map((image, idx) => (
                                        <Carousel.Item key={idx} interval={2500} style={{ height: "500px" }}>
                                            <img
                                                id="product_img"
                                                src={getFullImageUrl(image)}
                                                alt={`Product Image ${idx + 1}`}
                                                onError={(e) => e.target.src = thumbnaiil}
                                            />
                                        </Carousel.Item>
                                    ))
                                ) : (
                                    // Fallback in case images are not loaded
                                    <Carousel.Item interval={2500} style={{ height: "500px" }}>
                                        <img id="product_img" src={thumbnaiil} alt="Fallback Product" />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Col>
                        <Col className="col-6">
                                <div className="product_category">
                                    <Breadcrumb>
                                        <Breadcrumb.Item href="/" style={{color:"#666666", fontSize:'15px'}}>홈</Breadcrumb.Item>
                                        <Breadcrumb.Item href="#" style={{color:"#666666", fontSize:'15px'}}>
                                            {productCategory !== "" ? productCategory : "카테고리"}
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                {/* product title */}
                                <div id="product_info">
                                    {/* 제목 */}
                                    <p id="product_title"className="h1 mx-2 my-2" >
                                        {productTitle !== "" ? productTitle : "제목"}
                                    </p>
                                    
                                    <div id="product_price_deal" className="mx-4 my-3" >
                                        
                                        {productPoint !== "" ? 
                                        <>
                                            <span id="product_price">{productPoint}
                                                <span id="span_won" style={{ display: 'inline-block' }}>
                                                    &nbsp;P
                                                </span>
                                            </span>
                                        </>
                                        : 
                                        <span id="product_price">0
                                            <span id="span_won" style={{ display: 'inline-block' }}>
                                                &nbsp;P
                                            </span>
                                        </span>}
                                            
                                        
                                        <Badge  className="product_badge" bg={productTradeState === "거래 가능" ? "success" : "secondary"}>
                                            {productTradeState === "거래 가능" ? "거래가능" : "거래완료"}
                                        </Badge>
                                    </div>
                                    {/* 조회수 댓글 수 */}
                                    <div id="product_view_comment">
                                        <Row>
                                            <Col className="col-3">
                                                <span id="product_cnt">조회수 
                                                    {productHit !== "" ? " "+productHit : " 0"}
                                                </span>
                                            </Col>
                                            <Col className="col-3">
                                                <span id="product_cnt">댓글 
                                                {productCommentCnt !== 0 ? " "+productCommentCnt : 0}
                                                </span>
                                            </Col>
                                            <Col className="col-6">
                                                <span id="product_create_info">{productListedAt !== "" ? productListedAt: "날짜"}</span>
                                            </Col>
                                        </Row>
                                    </div>


                                    <div id="product_state">
                                        {/* 물품 상태 를 state_info에 넣으면 됨 */}
                                        <Row>
                                            <Col>
                                                <p className="state_title">제품상태</p>
                                                <p className="state_info">
                                                    {productConditionState === "상" ? "양호" : productConditionState === "중" ? "보통" :"나쁨" }
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className="state_title">거래방식</p>
                                                <p className="state_info">택배</p>
                                            </Col>
                                            <Col>
                                                <p className="state_title">배송비</p>
                                                <p className="state_info">별도</p>
                                            </Col>
                                        </Row>
                                    </div>


                                    <div id="product_seller_info">
                                        <div id="info_title">판매자  <span id="seller_nickname"> {memberNickName !== "" ? memberNickName: "이름"}</span></div>
                                        {/* <div id="seller_detail">
                                            <Row>
                                                <Col>
                                                    <span id="seller_nickname"> {memberNickName !== "" ? memberNickName: "이름"}</span>
                                                </Col>
                                                <Col>
                                                    <span id="product_create_info">{productCreatedAt !== "" ? productCreatedAt: "날짜"}</span>
                                                </Col>
                                            </Row>
                                        </div> */}
                                    </div>


                                    <div id="product_buttons">
                                        <Row>
                                            <Col>
                                                <Button className="w-75 h-100 mb-3 btn-custom" variant="default" type="button"  
                                                 onClick={backHandler}
                                                style={{backgroundColor:'white', color:'black', border:"1px solid #666666"}}>   
                                                    돌아가기
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className="w-75 h-100 mb-3 btn-custom" variant="default" type="button"  
                                                    onClick={purchaseHandler}
                                                    style={{backgroundColor:'#FFD774', color:'black', border:"1px solid #FFD774"}}>
                                                    구매신청
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                        </Col>
                    </Row>

                    
                </div>


                {/* 제품 상세정보 */}
                <div id="product_content">
                    <div id="product_content_title" className="mx-5" >
                        상품정보
                    </div>

                    <div id="product_content_view" className="mx-5">
                        {productContent !== "" ? productContent: "내용"}
                    </div>


                    <div className="product_warning mx-5">
                        <p className="warning">※ 상품 게시글은 자동으로 사이트에 노출합니다. 노출을 원하지 않으실 경우 고객센터로 문의 바랍니다.</p>
                        <p className="warning">※ 등록한 게시글이 회원의 신고를 받거나 이상거래로 모니터링 될 경우 사기통합조회 DB로 수집/활용될 수 있습니다.</p>
                        <p className="warning">※ 아이-비는 거래에 등록된 게시물의 거래 당사자가 아니며, 판매자가 등록한 상품정보 및 거래 등에 대해서는 책임지지 않습니다.</p>
                    </div>
                </div>

                
                {/* 이 상품은 어떠세요 */}
                
                <div id="md_recommand">
                    <TrendingProductsComponent />
                </div>


                <div className="d-flex justify-content-center " id="commnet_section">
                    <CommentCommponent />
                </div>

                {/* <div className="product_warning mx-5 mb-5">
                    <p className="warning">※ 아이-비는 거래에 등록된 게시물의 거래 당사자가 아니며, 판매자가 등록한 상품정보 및 거래 등에 대해서는 책임지지 않습니다.</p>
                </div> */}

            </div>  
        </>
    );

}

export default ProductDetailComponent;
