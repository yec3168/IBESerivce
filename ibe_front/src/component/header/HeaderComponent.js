import ibe_logo from '../../ibe_logo.png'
import coin_purse_icon from '../../coin_purse_icon.png'
import './HeaderComponent.css'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-lg" >
                    <div class="container-fluid fixed-top">
                        {/* 로그인 메뉴바 */}
                        <div class="collapse navbar-collapse justify-content-end" id="loginMenubar">
                            <ul class="navbar-nav">
                                <li class="nav-item mx-3">
                                    <a class="nav-link active" href="/">로그인</a>
                                </li>
                                <div class="vr"></div>
                                <li class="nav-item ms-3">
                                    <a class="nav-link active" href="/">회원가입</a>
                                </li>
                                <li class="nav-item mx-1">
                                    <a class="nav-link active" href="/">고객센터</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="container-fluid">                        
                        {/* 메인 로고 */}
                        <a class="navbar-brand" href="/">
                                <img src={ibe_logo} width="250px" alt="logo"/>
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        {/* 메뉴바 */}
                        <div class="collapse navbar-collapse justify-content-end" id="menubar">
                            <ul class="navbar-nav menubar">
                                <li class="nav-item mx-5">
                                    <a class="nav-link active" href="/">구매하기</a>
                                </li>
                                <li class="nav-item mx-5">
                                    <a class="nav-link active" href="/">판매하기</a>
                                </li>
                                <li class="nav-item mx-5">
                                    <a class="nav-link active" href="/">카테고리</a>
                                </li>
                                <span id="span_parent">
                                    <img src={coin_purse_icon} width="30px" alt="coin_purse" id="coin_purse_icon"/>
                                    <li class="nav-item mx-5" >
                                        <a class="nav-link active" href="/" id="amt">
                                                <span id="span_amt">10,000</span>
                                                <span id="span_won"> ₩</span>
                                        </a>
                                    </li>
                                </span>
                                
                                <li class="nav-item mx-5">
                                    <a class="nav-link active" href="/">마이페이지</a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </nav>
                

            

                <p>여기까지 header입니다</p>
                <hr/>
            </header>
        </div>
    );
}

export default HeaderComponent;