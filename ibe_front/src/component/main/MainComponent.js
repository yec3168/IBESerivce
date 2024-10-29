import BannerComponent from './BannerComponent';
import CategoryIconsComponent from './CategoryIconsComponent';
import './Main.css'

const MainComponent = () =>{
    return (
        <>
            {/* 헤더 픽스된 위치만큼 div 설정 */}
            <div id="div_headerHeight"/>
            
            {/* carousel 배너 */}
            <div id="div_bgBanner">
                <BannerComponent/>
            </div>

            {/* icon 카테고리 메뉴바 */}
            <div id="div_bgCategory">
                <CategoryIconsComponent/>
            </div>
            
            <div id="div_endOfBanner" />

        </>
    );
}

export default MainComponent;