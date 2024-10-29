import BannerComponent from './BannerComponent';
import './MainComponent.css'

const MainComponent = () =>{
    return (
        <>
            {/* 헤더 끝 노란색 구분선 */}
            <div id="div_endOfHeader"/>
            
            {/* carousel */}
            <div id="div_bgBanner">
                <BannerComponent/>
            </div>
            
            <div id="div_endOfBanner" />

        </>
    );
}

export default MainComponent;