import product_stroller from "../assets/images/main/product/product_stroller.png";
import {Row, Col, Carousel, Breadcrumb, Badge  } from "react-bootstrap";

import "./Detail.css"

const ProductDetailComponent = () => {
    // 상품의 이미지 리스트 api를 받아서 등록할 예정 (useEffect 사용)
    let product_images =[product_stroller, product_stroller];



    return(
        <>
            <div>
                {/* Product의 정보를 보여주는 div */}
                <div className="product_detail">
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
                                <div className="product_info">
                                    {/* 제목 */}
                                    <p id="product_title"className="h1 mx-2 my-2" >
                                        오늘 바로 쿨 발송! 쿨거래시 7만 3천원!
                                    </p>
                                    
                                    <div id="product_price_state" className="mx-4 my-3" >
                                        <span id="product_price">
                                            70,000P
                                        </span>
                                        <Badge bg="secondary" className="mx-5">
                                            거래가능
                                        </Badge>
                                    </div>
                                   
                                </div>
                        </Col>
                    </Row>
                </div>
            </div>  
        </>
    );

}

export default ProductDetailComponent;

// const bannerImgs = [banner_frog, banner_info1, banner_food, banner_coin];

// const BannerComponent = () => {
//   return (
//     <Carousel>
//       {bannerImgs.map((item, idx) => {
//         return (
//           <Carousel.Item interval={2500}>
//             <img id="img_carousel" src={item} alt="banner" />
//           </Carousel.Item>
//         );
//       })}
//     </Carousel>
//   );
// };
