import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Form } from "react-bootstrap";
import product_stroller from '../assets/images/main/product/product_stroller.png';
import product_slide from '../assets/images/main/product/product_slide.png';
import "./ProductList.css";

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("views");

//   useEffect(() => {
//     // 카테고리 필터 및 정렬 적용
//     let updatedProducts = products;

//     if (selectedCategory !== "all") {
//       updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
//     }

//     if (sortOrder === "views") {
//       updatedProducts = [...updatedProducts].sort((a, b) => b.views - a.views);
//     } else if (sortOrder === "comments") {
//       updatedProducts = [...updatedProducts].sort((a, b) => b.comments - a.comments);
//     }

  // Sample data with additional products
  useEffect(() => {
    setProducts([
      { id: 1, image: product_stroller, title: "유아용 유모차", views: 250, comments: 12, status: "TRADE_COMPLETED", condition: "HIGH", category: "KIDS_CLOTHING" },
      { id: 2, image: product_slide, title: "실내 슬라이드", views: 98, comments: 4, status: "TRADING_AVAILABLE", condition: "HIGH", category: "KIDS_CLOTHING" },
      { id: 3, image: product_stroller, title: "사무용 책상", views: 150, comments: 5, status: "TRADING_AVAILABLE", condition: "MEDIUM", category: "MISC" },
      { id: 4, image: product_stroller, title: "게이밍 노트북", views: 320, comments: 30, status: "TRADING_AVAILABLE", condition: "MEDIUM", category: "OUTDOOR_SUPPLIES" },
      { id: 5, image: product_stroller, title: "청소기", views: 180, comments: 10, status: "TRADE_COMPLETED", condition: "LOW", category: "MISC" },
      { id: 6, image: product_stroller, title: "의자 세트", views: 210, comments: 8, status: "TRADING_AVAILABLE", condition: "LOW", category: "KIDS_BOOKS" },
      { id: 7, image: product_stroller, title: "인형", views: 120, comments: 15, status: "TRADE_COMPLETED", condition: "HIGH", category: "KIDS_TOYS" },
      { id: 8, image: product_stroller, title: "캠핑용 텐트", views: 250, comments: 20, status: "TRADING_AVAILABLE", condition: "MEDIUM", category: "OUTDOOR_SUPPLIES" },
      { id: 9, image: product_slide, title: "어린이 의류", views: 90, comments: 2, status: "TRADE_COMPLETED", condition: "HIGH", category: "KIDS_CLOTHING" },
      { id: 10, image: product_slide, title: "아동 도서", views: 200, comments: 11, status: "TRADING_AVAILABLE", condition: "MEDIUM", category: "KIDS_BOOKS" },
      { id: 11, image: product_slide, title: "유아용 미끄럼틀", views: 300, comments: 5, status: "TRADE_COMPLETED", condition: "HIGH", category: "KIDS_TOYS" },
      { id: 12, image: product_slide, title: "노트북", views: 410, comments: 22, status: "TRADING_AVAILABLE", condition: "LOW", category: "MISC" },
      { id: 13, image: product_slide, title: "책상 세트", views: 160, comments: 6, status: "TRADE_COMPLETED", condition: "HIGH", category: "MISC" },
      { id: 14, image: product_slide, title: "바베큐 그릴", views: 220, comments: 9, status: "TRADING_AVAILABLE", condition: "MEDIUM", category: "OUTDOOR_SUPPLIES" },
      { id: 15, image: product_slide, title: "퍼즐", views: 110, comments: 8, status: "TRADE_COMPLETED", condition: "LOW", category: "KIDS_TOYS" },
    ]);
  }, []);

  useEffect(() => {
    // Category filter and sorting logic
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

  return (
    <div id="product_list">
      <div id="product_container" className="mt-4">
        {/* Filter and sorting options */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Select
              className="order_option"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">카테고리</option>
              <option value="KIDS_BOOKS">KIDS_BOOKS</option>
              <option value="KIDS_CLOTHING">KIDS_CLOTHING</option>
              <option value="KIDS_TOYS">KIDS_TOYS</option>
              <option value="MISC">MISC</option>
              <option value="OUTDOOR_SUPPLIES">OUTDOOR_SUPPLIES</option>
            </Form.Select>
          </Col>
          <Col md={3}>
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

        {/* Product list */}
        <Row xs={1} md={2} lg={6} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} alt={product.title} className="product-image" />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">조회수: {product.views}</small>
                    <small className="text-muted">댓글수: {product.comments}</small>
                  </div>
                  <div className="mt-2">
                    <Badge bg={product.status === "TRADING_AVAILABLE" ? "success" : "secondary"}>
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
                      className="ms-2"
                    >
                      {product.condition === "HIGH" ? "상" : product.condition === "MEDIUM" ? "중" : "하"}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductListComponent;
