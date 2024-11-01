import "./Mypage.css"

const MypageComponent = () => {
    return (
        <>
            {/* 헤더 픽스된 위치만큼 div 설정 */}
            <div id="div_headerHeight" />

            <h3>마이페이지 바디</h3>

            {/* body와 footer 사이 공간 */}
            <div id="div_endOfMainBody" />
        </>
    );
}

export default MypageComponent;