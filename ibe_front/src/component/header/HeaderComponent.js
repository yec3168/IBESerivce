import ibe_logo from '../../ibe_logo.png'
import styles from './HeaderComponent.module.css'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-lg" >
                    <div class="fixed-top">
                        {/* 로그인 메뉴바 */}
                        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent2">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">로그인</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">로그아웃</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">회원가입</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="container-fluid">                        
                        {/* 메인 로고 */}
                        <a class="navbar-brand" href="/">
                                <img src={ibe_logo} width="200px" alt="logo"/>
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        {/* 메뉴바 */}
                        <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">구매하기</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">판매하기</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">₩10,000</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">카테고리</a>
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