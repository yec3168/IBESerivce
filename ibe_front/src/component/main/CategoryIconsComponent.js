import './Main.css'
import icon_all from '../assets/images/main/category/icon_all.png'
import icon_books from '../assets/images/main/category/icon_books.png'
import icon_clothes from '../assets/images/main/category/icon_clothes.png'
import icon_etc from '../assets/images/main/category/icon_etc.png'
import icon_outdoor from '../assets/images/main/category/icon_outdoor.png'
import icon_toys from '../assets/images/main/category/icon_toys.png'

const categoryIcons = [
    icon_all, icon_books, icon_clothes, icon_etc, icon_outdoor, icon_toys
];

const CategoryIconsComponent = () => {
    return (
        <>
            {/* 배너와 아이콘 사이 공간 */}
            <div id='div_categoryMarginTop'/>

            {/* 카테고리 icon 메뉴바 */}
            <div class="container" id="div_allIcons">
                <div class="row row-cols-6" id="div_categoryIcons">
                    {categoryIcons.map((item, idx) => { 
                        return (
                            <div class="col" id="div_col">
                                <img id="img_categoryIcons" src={item} alt="categoryIcon" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 카테고리 icon 메뉴바 */}
            <div class="container" id="div_allIcons">
                <div class="row row-cols-6" id="div_categoryName">
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                    <div class="col" id="div_col">
                        <p>카테고리명</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryIconsComponent;