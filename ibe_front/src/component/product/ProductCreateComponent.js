import {Row, Col, FloatingLabel, Breadcrumb, Badge, Button, Form  } from "react-bootstrap";

import './Product.css'

const ProductCreateComponent = () =>{
    return (
        <>
            <div className="product">
                <div id="section_1">
                    <p id="page_title"className='h1 mx-5'>판매신청</p>
                </div>

                <div id='section_2'>
                    <Form className=" bg-white rounded"  >
                        <Row>
                            <Col>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="text" placeholder="제목을 입력해주세요." />
                            </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>
                </div>
                
            </div>
        </>
    );
}

export default ProductCreateComponent;