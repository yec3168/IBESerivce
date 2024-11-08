import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../header/HeaderComponent';
import FooterComponent from '../footer/FooterComponent';
import './NotFound.css';
import NotFoundImg from './NotFound.png';
import { Col, Row } from 'react-bootstrap';

const NotFound = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderComponent />
      <div id="div_headerHeight" />

      <div
        className="container d-flex align-items-center justify-content-center"
        id="container_notFound"
      >
        <h1 className="text-center" id="h1_notFoundTitle">
          404 - 페이지를 찾을 수 없습니다.
        </h1>

        <Row className="mb-4">
          <Col sm={6} className="mt-5 d-flex flex-column align-items-start">
            <div
              style={{
                whiteSpace: 'nowrap',
                marginBottom: '10px',
                marginTop: '20px',
              }}
            ></div>
            <button
              onClick={handleHomeClick}
              className="btn btn-link"
              style={{ alignSelf: 'flex-start' }}
            >
              <span id="span_notFoundHome">홈</span>으로 돌아가기
            </button>
          </Col>
          <Col sm={6}>
            <img
              src={NotFoundImg}
              alt="404"
              width="200px"
              className={`mt-3 ${imageLoaded ? 'zoomNotFound' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
          </Col>
        </Row>
      </div>

      <FooterComponent />
    </>
  );
};

export default NotFound;
