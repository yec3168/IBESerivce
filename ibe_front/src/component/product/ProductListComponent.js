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

  // Fetch data from API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("YOUR_API_ENDPOINT");
  //       setProducts(response.data); // Adjust based on the API response structure
  //     } catch (error) {
  //       console.error("Failed to fetch products", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    // 예시 데이터를 설정합니다.
    setProducts([
      { id: 1, image: product_stroller, title: "유아용 유모차", views: 250, comments: 12, status: "available", condition: "상", category: "유아용품" },
      { id: 2, image: product_slide, title: "실내 슬라이드", views: 98, comments: 4, status: "sold", condition: "상", category: "유아용품" },
      { id: 3, image: product_slide, title: "사무용 책상", views: 150, comments: 5, status: "available", condition: "상", category: "가구" },
      { id: 4, image: product_slide, title: "게이밍 노트북", views: 320, comments: 30, status: "available", condition: "중", category: "전자기기" },
      { id: 5, image: product_stroller, title: "청소기", views: 180, comments: 10, status: "sold", condition: "중", category: "가전제품" },
      { id: 6, image: product_stroller, title: "의자 세트", views: 210, comments: 8, status: "available", condition: "중", category: "가구" },
      { id: 7, image: product_slide, title: "게이밍 노트북", views: 120, comments: 30, status: "available", condition: "중", category: "전자기기" },
      { id: 8, image: product_stroller, title: "청소기", views: 200, comments: 10, status: "sold", condition: "중", category: "가전제품" },
      { id: 9, image: product_stroller, title: "의자 세트", views: 110, comments: 8, status: "available", condition: "중", category: "가구" },

    ]);
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let updatedProducts = [...products];

      // 카테고리 필터
      if (selectedCategory !== "all") {
        updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
      }

      // 정렬
      if (sortOrder === "views") {
        updatedProducts.sort((a, b) => b.views - a.views);
      } else if (sortOrder === "comments") {
        updatedProducts.sort((a, b) => b.comments - a.comments);
      }

      setFilteredProducts(updatedProducts);
    };

    applyFiltersAndSort();
  }, [products, selectedCategory, sortOrder]); // 모든 의존성에 대해 필터 및 정렬 적용

  return (
    <div id="product_list">
      <div id="product_container" className="mt-4">
        {/* 필터 및 정렬 옵션 */}
        <Row className="mb-3">
          <Col md={1}>
            <Form.Select
              className="order_option"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">카테고리</option>
              <option value="유아용품">유아용품</option>
              <option value="가구">가구</option>
              <option value="전자기기">전자기기</option>
              <option value="가전제품">가전제품</option>
            </Form.Select>
          </Col>
          <Col md={1}>
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

        {/* 상품 목록 */}
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
                    <Badge bg={product.status === "available" ? "success" : "secondary"}>
                      {product.status === "available" ? "거래가능" : "거래완료"}
                    </Badge>
                    <Badge
                      bg={
                        product.condition === "상"
                          ? "primary"
                          : product.condition === "중"
                          ? "warning"
                          : "danger"
                      }
                      className="ms-2"
                    >
                      {product.condition}
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
