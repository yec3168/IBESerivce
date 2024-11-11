import './Main.css'
import badge_available from '../assets/images/main/badge/badge_available.png'
import badge_finished from '../assets/images/main/badge/badge_finished.png'
import badge_high from '../assets/images/main/badge/badge_high.png'
import badge_mid from '../assets/images/main/badge/badge_mid.png'
import badge_low from '../assets/images/main/badge/badge_low.png'
import { getProductList } from "../service/ProductService";
import React, { useEffect, useState } from "react";
import thumbnaiil from "../assets/images/thumbnail.png";
import { Link } from "react-router-dom";

const TrendingProductsComponent=({ selectedCategory })=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Selected Category:", selectedCategory);  // selectedCategory 값 확인
    
        getProductList()
            .then(response => {
                if (response.data.code === '200') {
                    const data = response.data.data;
                    const formattedData = data.map(item => ({
                        id: item.productId,
                        image: item.thumbnail !== "" ? getFullImageUrl(item.thumbnail) : thumbnaiil,
                        title: item.productTitle,
                        views: item.productHit,
                        comments: item.productCommentCnt,
                        status: item.productTradeState === "거래 가능" ? "TRADING_AVAILABLE" : "TRADE_COMPLETED",
                        condition: item.productConditionState === "상" ? "HIGH" : item.productConditionState === "중" ? "MEDIUM" : "LOW",
                        category: item.productCategory,  // 카테고리 값 그대로 사용
                        price: item.productPoint
                    }));
    
                    // 선택된 카테고리가 전체이면 모든 상품을, 아니면 특정 카테고리만 필터링
                    const filteredProducts = selectedCategory === "전체" 
                        ? formattedData.filter(product => product.status === "TRADING_AVAILABLE")
                        : formattedData.filter(
                            product => product.status === "TRADING_AVAILABLE" && product.category === selectedCategory
                        );
    
                    console.log("Filtered Products:", filteredProducts); // 필터링된 결과 확인
    
                    // 상태별로 정렬 ('상' -> '중' -> '하')
                    const sortedProducts = filteredProducts.sort((a, b) => {
                        const conditionOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
                        return conditionOrder[a.condition] - conditionOrder[b.condition];
                    });
    
                    // 상위 4개의 상품 선택
                    let topProducts = sortedProducts.slice(0, 4);
    
                    // 필터링된 상품이 4개 미만일 경우, HIGH 상태의 추가 상품을 추가
                    if (topProducts.length < 4) {
                        const remainingCount = 4 - topProducts.length;
    
                        // 다른 카테고리의 HIGH 상태 상품 중에서 추가할 상품 선택
                        const additionalHighProducts = formattedData.filter(
                            product => product.condition === "HIGH" && product.status === "TRADING_AVAILABLE" && 
                            !topProducts.includes(product)  // 중복 방지
                        ).slice(0, remainingCount);
    
                        topProducts = [...topProducts, ...additionalHighProducts];
                    }
    
                    setProducts(topProducts);
                }
            })
            .catch(error => {
                setProducts([]);  // 에러 발생 시 빈 배열로 설정
            });
    }, [selectedCategory]);
    
    const addComma = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/");
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    return (
        <>
            <div className="container">
                <div id="div_allTitle">추천 상품</div>
                <div id="div_recTitle">이런 상품은 어떠세요?</div>
                
                <div className="row row-cols-4">
                    {products.map((product, idx) => (
                        <Link to={`/products/detail/${product.id}`} className="text-decoration-none text-dark" key={product.id}>
                            <div className="col" id="div_imgCol">
                                <img 
                                    id="img_product" 
                                    src={product.image} 
                                    alt="product" 
                                    onError={(e) => e.target.src = thumbnaiil}  // 이미지 오류 시 기본 썸네일로 대체
                                />
                                <div id="div_proStateCol">
                                    <div id="div_proState">
                                        {product.status === "TRADING_AVAILABLE" ? 
                                            ( <img src={badge_available} alt="available" className="proStateBadge"
                                                onError={(e) => e.target.src = thumbnaiil} />) 
                                            : 
                                            ( <img src={badge_finished} alt="not_available" className="proStateBadge"/>)}
                                        <img 
                                            src={
                                                product.condition === "HIGH" ? badge_high :
                                                product.condition === "MEDIUM" ? badge_mid :
                                                badge_low
                                            } 
                                            alt={product.condition.toLowerCase()} 
                                            className="proStateBadge"
                                        />
                                    </div>
                                </div>
                                <div id="div_proNameCol">
                                    <div id="div_proNameTxt">{product.title}</div>
                                </div>
                                <div id="div_proPriceCol">
                                    <div id="div_proPriceTxt">{addComma(product.price)}
                                    <span style={{ display: 'inline-block' }}>
                                        &nbsp;P
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TrendingProductsComponent;