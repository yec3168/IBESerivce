import './Main.css'
import icon_all from '../assets/images/main/category/icon_all.png'
import icon_books from '../assets/images/main/category/icon_books.png'
import icon_clothes from '../assets/images/main/category/icon_clothes.png'
import icon_etc from '../assets/images/main/category/icon_etc.png'
import icon_outdoor from '../assets/images/main/category/icon_outdoor.png'
import icon_toys from '../assets/images/main/category/icon_toys.png'

const categoryIcons = [
    icon_all, icon_clothes, icon_toys, icon_books, icon_outdoor, icon_etc
];

const categoryNames = [
    "전체", "아동 의류", "아동 완구", "아동 도서", "외출 용품", "기타"
];

const CategoryIconsComponent = ({ setSelectedCategory }) => {
    const categoryIcons = [icon_all, icon_clothes, icon_toys, icon_books, icon_outdoor, icon_etc];
    const categoryNames = ["전체", "아동 의류", "아동 완구", "아동 도서", "외출 용품", "기타"];

    return (
        <>
            <div id='div_categoryMarginTop'/>
            <div className="container" id="div_allIcons">
                <div className="row row-cols-6" id="div_categoryIcons">
                    {categoryIcons.map((item, idx) => (
                        <div 
                            className="col" 
                            id="div_iconCol" 
                            key={idx} 
                            onClick={() => setSelectedCategory(categoryNames[idx])}
                        >
                            <img id="img_categoryIcons" src={item} alt="categoryIcon" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container" id="div_allIcons">
                <div className="row row-cols-6" id="div_categoryName">
                    {categoryNames.map((item, idx) => (
                        <div className="col" id="div_nameCol" key={idx}>
                            <div id="div_nameTxt">{item}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryIconsComponent;