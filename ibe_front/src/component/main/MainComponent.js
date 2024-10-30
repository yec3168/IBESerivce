import BannerComponent from './BannerComponent';
import './MainComponent.css'

const MainComponent = () =>{
    return (
        <>
            {/* 헤더 픽스된 위치만큼 div 설정 */}
            <div id="div_headerHeight"/>
            
            {/* carousel */}
            <div id="div_bgBanner">
                <BannerComponent/>
            </div>
            
            <div id="div_endOfBanner" />

        </>
    );
}

export default MainComponent;