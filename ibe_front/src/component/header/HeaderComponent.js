import ibe_logo from "../assets/images/header/ibe_logo.png";
import coin_purse_icon from "../assets/images/header/coin_purse_icon.png";
import "./HeaderComponent.css";

const HeaderComponent = () => {
  return (
    <div class="container-fluid fixed-top bg-white" id="div_header">
      <header>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid fixed-top">
            {/* 로그인 메뉴바 */}
            <div
              class="collapse navbar-collapse justify-content-end"
              id="loginMenubar"
            >
              <ul class="navbar-nav loginMenubar">
                <span id="span_parent" class="mr-80">
                  <img src={coin_purse_icon} width="20px" alt="coin_purse" id="coin_purse_icon" />
                  <li class="nav-item">
                    <a class="nav-link active4" href="/" id="amt">
                      <span id="span_amt">10,000&nbsp;</span>
                      <span id="span_won">P</span>
                    </a>
                  </li>
                </span>
                <li class="nav-item mx-3">
                  <a class="nav-link active" href="/signin">
                    로그인
                  </a>
                </li>
                <div class="vr"></div>
                <li class="nav-item ms-3">
                  <a class="nav-link active" href="/signup">
                    회원가입
                  </a>
                </li>
                <li class="nav-item mx-1">
                  <a class="nav-link active" href="/">
                    고객센터
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="container-fluid">
            {/* 메인 로고 */}
            <a class="navbar-brand" href="/">
              <img src={ibe_logo} width="200px" alt="logo" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            {/* 메뉴바 */}
            <div
              class="collapse navbar-collapse justify-content-end"
              id="menubar"
            >
              <ul class="navbar-nav menubar">
                <li class="nav-item mr-150">
                  <a class="nav-link active1" href="/">
                    전체 상품
                  </a>
                </li>
                <li class="nav-item mr-150">
                  <a class="nav-link active2" href="/">
                    판매 신청
                  </a>
                </li>
                <li class="nav-item mr-150">
                  <a class="nav-link active3" href="/">
                    아이비 게시판
                  </a>
                </li>
                {/* <span id="span_parent" class="mr-150">
                  <img
                    src={coin_purse_icon}
                    width="30px"
                    alt="coin_purse"
                    id="coin_purse_icon"
                  />
                  <li class="nav-item">
                    <a class="nav-link active4" href="/" id="amt">
                      <span id="span_amt">10,000</span>
                      <span id="span_won">₩</span>
                    </a>
                  </li>
                </span> */}

                <li class="nav-item mr-150">
                  <a class="nav-link active5" href="/">
                    마이페이지
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
