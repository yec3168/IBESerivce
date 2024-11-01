import product_stroller from "../assets/images/main/product/product_stroller.png";
import {Row, Col, Carousel, Breadcrumb, Badge, Button  } from "react-bootstrap";
import TrendingProductsComponent from "../main/TrendingProductsComponent";
import CommentCommponent from "../comment/CommentComponent";

import "./Product.css"

const ProductDetailComponent = () => {
    // 상품의 이미지 리스트 api를 받아서 등록할 예정 (useEffect 사용)
    let product_images =[product_stroller, product_stroller];



    return(
        <>
            <div>
                {/* Product의 정보를 보여주는 div */}
                <div className="product">
                    <Row >
                        <Col className="col-6">
                            <Carousel>
                                {product_images.map((item, idx) => {
                                    return (
                                    <Carousel.Item interval={2500} style={{height:"500px"}}>
                                        <img id="product_img" src={item} alt="banner" />
                                    </Carousel.Item>
                                    );
                                })}
                            </Carousel>
                        </Col>
                        <Col className="col-6">
                                <div className="product_category">
                                    <Breadcrumb>
                                        <Breadcrumb.Item href="/" style={{color:"#666666", fontSize:'15px'}}>홈</Breadcrumb.Item>
                                        <Breadcrumb.Item href="#" style={{color:"#666666", fontSize:'15px'}}>
                                            카테고리 이름
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                {/* product title */}
                                <div id="product_info">
                                    {/* 제목 */}
                                    <p id="product_title"className="h1 mx-2 my-2" >
                                        오늘 바로 쿨 발송! 쿨거래시 7만 3천원!
                                    </p>
                                    
                                    <div id="product_price_deal" className="mx-4 my-3" >
                                        <span id="product_price">
                                            70,000P
                                        </span>
                                        <Badge bg="secondary" className="mx-5">
                                            거래가능
                                        </Badge>
                                    </div>
                                    {/* 조회수 댓글 수 */}
                                    <div id="product_view_comment">
                                        <Row>
                                            <Col>
                                                <span id="product_cnt">조회수 199</span>
                                            </Col>
                                            <Col>
                                                <span id="product_cnt">댓글 10</span>
                                            </Col>
                                        </Row>
                                    </div>


                                    <div id="product_state">
                                        {/* 물품 상태 를 state_info에 넣으면 됨 */}
                                        <Row>
                                            <Col>
                                                <p className="state_title">제품상태</p>
                                                <p className="state_info">양호</p>
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
                                        <div id="info_title">판매자정보</div>
                                        <div id="seller_detail">
                                            <Row>
                                                <Col>
                                                    <span id="seller_nickname">방긋하얏</span>
                                                </Col>
                                                <Col>
                                                    <span id="product_create_info">2024-11-01</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>


                                    <div id="product_buttons">
                                        <Row>
                                            <Col>
                                                <Button className="w-75 h-100 mb-3" variant="default" type="button"  style={{backgroundColor:'white', color:'black', border:"1px solid #666666"}}>
                                                    돌아가기
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className="w-75 h-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774', color:'black', border:"1px solid #FFD774"}}>
                                                    구매하기
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
                    아이가 다 커서 팔아요 ~<br />
                    상태 아주 좋아요 <br />
                    접이식이라 수납도 간편합니다 <br />
                    크기는 200x100x100정도 됩니다 <br />
                    편백나무 재질이구요 <br />
                    정가는 50만원이에요 <br />
                    *잔기스는 있을 수 있어요!! <br />
                    </div>


                    <div id="product_waring" className="mx-5">
                        <p className="warning">※ 상품 게시글은 자동으로 사이트에 노출합니다. 노출을 원하지 않으실 경우 고객센터로 문의 바랍니다.</p>
                        <p className="warning">※ 등록한 게시글이 회원의 신고를 받거나 이상거래로 모니터링 될 경우 사기통합조회 DB로 수집/활용될 수 있습니다.</p>
                    </div>
                </div>

                
                {/* 이 상품은 어떠세요 */}
                
                <div id="md_recommand">
                    <TrendingProductsComponent />
                </div>


                <div className="d-flex justify-content-center">
                    <CommentCommponent />
                </div>
            </div>  
        </>
    );

}

export default ProductDetailComponent;
