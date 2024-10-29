import './Main.css'
import product_book from '../assets/images/main/product/product_book.png'
import product_shampoo from '../assets/images/main/product/product_shampoo.png'
import product_stroller from '../assets/images/main/product/product_stroller.png'
import product_slide from '../assets/images/main/product/product_slide.png'
import product_humidifier from '../assets/images/main/product/product_humidifier.png'

const productImgs = [
    product_book, product_slide, product_stroller, product_humidifier
];

const productNames = [
    "유아 동화책 호호랜드 전래동화", "유아용 라이너 원목 슬라이드", "오이스터 미니 플러스 휴대용 유모차", "케어팟 저온 가열식 가습기"
];

const productPrices = [
    "1000P", "5000P", "30000P", "10000P"
];

const AllProductsComponent=()=>{
    return (
        <>
            {/* 전체 상품 title */}
            <div id="div_allTitle">전체 상품</div>

            <div class="container">
                {/* 전체 상품 이미지 */}
                <div class="row row-cols-4">
                    {productImgs.map((item, idx) => { 
                        return (
                            <div class="col" id="div_imgCol">
                                <img id="img_product" src={item} alt="product" />
                            </div>
                        )
                    })}
                </div>
                {/* 전체 상품 이름 */}
                <div class="row row-cols-4">
                    {productNames.map((item, idx) => { 
                        return (
                            <div class="col" id="div_proNameCol">
                                <div id="div_proNameTxt">{item}</div>
                            </div>
                        )
                    })}
                </div>
                {/* 전체 상품 가격 */}
                <div class="row row-cols-4">
                    {productPrices.map((item, idx) => { 
                        return (
                            <div class="col" id="div_proPriceCol">
                                <div id="div_proPriceTxt">{item}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default AllProductsComponent;