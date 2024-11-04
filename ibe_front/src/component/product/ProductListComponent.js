import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductList } from "../service/ProductService";
import thumbnaiil from "../assets/images/thumbnail.png";


import "./ProductList.css";

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("views");
  const [error, setError] = useState(""); // State for error message

  useEffect(() => {
    window.scrollTo(0, 0);
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
              item.productCategory === "아동 의류" ? "KIDS_CLOTHING" :
              item.productCategory === "아동 완구" ? "KIDS_TOYS" :
              item.productCategory === "아동 도서" ? "KIDS_BOOKS" :
              item.productCategory === "외출 용품" ? "OUTDOOR_SUPPLIES" : 
              "MISC",
            price: item.productPoint
          }));
          setProducts(formattedData);
          setError(""); // Reset error message if products are fetched successfully
        }
      })
      .catch(error => {
        setError("현재 존재하는 물품이 없습니다"); // Set error message when fetch fails
        setProducts([]); // Clear products if there's an error
      });
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    if (sortOrder === "views") {
      updatedProducts = [...updatedProducts].sort((a, b) => b.views - a.views);
    } else if (sortOrder === "comments") {
      updatedProducts = [...updatedProducts].sort((a, b) => b.comments - a.comments);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, sortOrder]);

  const addComma = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getFullImageUrl = (imagePath) => {
    const cleanPath = imagePath.replace(/\\/g, "/");
    return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
  };

  return (
    <div id="product_list">
      <div id="product_container" className="mt-4">

        <Row className="mb-3">
          <Col md={2}>
            <Form.Select
              className="order_option"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">카테고리</option>
              <option value="KIDS_CLOTHING">아동 의류</option>
              <option value="KIDS_TOYS">아동 완구</option>
              <option value="KIDS_BOOKS">아동 도서</option>
              <option value="OUTDOOR_SUPPLIES">외출 용품</option>
              <option value="MISC">기타</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select
              className="order_option"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="views">조회수</option>
              <option value="comments">댓글</option>
            </Form.Select>
          </Col>
        </Row>

        {((filteredProducts.length === 0 && !error) || error) && (
           <div className="text-center mt-4">
            <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem', color: 'red' }}></i>
            <h4 className="mt-2">찾으시는 검색결과가 없습니다</h4>
            <p>다른 키워드로 검색해 주세요.</p>
         </div>
        )}
        
        <Row xs={1} md={2} lg={6} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <Link to={`/products/detail/${product.id}`} className="text-decoration-none text-dark">
                <Card id="product_card" className="h-100">
                  <Card.Img variant="top" src={product.image} alt={product.title} className="product-image"  onError={(e) => e.target.src = thumbnaiil} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">조회수: {product.views}</small>
                      <small className="text-muted">댓글수: {product.comments}</small>
                    </div>
                    <div className="mt-2">
                      <Badge className="product_badge" bg={product.status === "TRADING_AVAILABLE" ? "success" : "secondary"}>
                        {product.status === "TRADING_AVAILABLE" ? "거래가능" : "거래완료"}
                      </Badge>
                      <Badge
                        bg={
                          product.condition === "HIGH"
                            ? "primary"
                            : product.condition === "MEDIUM"
                            ? "warning"
                            : "danger"
                        }
                        className="product_badge ms-2"
                      >
                        {product.condition === "HIGH" ? "상" : product.condition === "MEDIUM" ? "중" : "하"}
                      </Badge>
                      
                      <span id="product_price" className="d-flex justify-content-end">
                        {addComma(product.price)} P
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductListComponent;
