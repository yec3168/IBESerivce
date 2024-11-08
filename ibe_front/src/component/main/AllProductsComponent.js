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

const AllProductsComponent = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
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
                        category: 
                            item.productCategory === "아동 의류" ? "아동 의류" :
                            item.productCategory === "아동 완구" ? "아동 완구" :
                            item.productCategory === "아동 도서" ? "아동 도서" :
                            item.productCategory === "외출 용품" ? "외출 용품" : 
                            "기타",
                        price: item.productPoint
                    }));

                    formattedData.sort((a, b) => b.id - a.id);
                    setProducts(formattedData);
                }
            })
            .catch(error => {
                setProducts([]);
            });
    }, []);
    
    const addComma = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/");
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };
    const filteredProducts = selectedCategory === "전체" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

    return (
        <>
            <div className="container">
                <div id="div_allTitle">전체 상품</div>
                <div className="row row-cols-4">
                    {filteredProducts.slice(0, 4).map((product, idx) => (
                        <Link to={`/products/detail/${product.id}`} className="text-decoration-none text-dark" key={product.id}>
                            <div className="col">
                                {/* 상품 이미지 */}
                               <img 
                                    id="img_product" 
                                    src={product.image} 
                                    alt="product" 
                                    onError={(e) => e.target.src = thumbnaiil}  // 이미지 오류 시 기본 썸네일로 대체
                                />
                                {/* 상품 상태 */}
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
                                
                                {/* 상품 이름 */}
                                <div id="div_proNameCol">
                                    <div id="div_proNameTxt">{product.title}</div>
                                </div>
                                
                                {/* 상품 가격 */}
                                <div id="div_proPriceCol">
                                    <div id="div_proPriceTxt">{addComma(product.price)} 
                                    <span id="span_won" style={{ display: 'inline-block' }}>
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

export default AllProductsComponent;
