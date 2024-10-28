import banner_info from '../assets/images/main/banner/banner_info.png'
import './MainComponent.css'

const MainComponent = () =>{
    return (
        <>
            {/* 임시 코드 - carousel 작성 예정 */}
            
            <div id="div_bg">
                <p>Main Page BODY입니다</p>
                <img src={banner_info} alt="banner" width="600px"/>
            </div>
            <div id="div_temp"/>
        </>
    );
}

export default MainComponent;