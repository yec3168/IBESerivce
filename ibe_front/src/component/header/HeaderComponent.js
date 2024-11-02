import ibe_logo from "../assets/images/header/ibe_logo.png";
import coin_purse_icon from "../assets/images/header/coin_purse_icon.png";
import "./HeaderComponent.css";

const HeaderComponent = () => {
  return (
    <div className="container-fluid fixed-top bg-white" id="div_header">
      <header>
        <nav className="navbar navbar-expand-lg" id="header_nav">
          <div className="container-fluid fixed-top">
            {/* 로그인 메뉴바 */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="loginMenubar"
            >
              <ul className="navbar-nav loginMenubar">
                <span id="span_parent" className="mr-80">
                  <img src={coin_purse_icon} width="20px" alt="coin_purse" id="coin_purse_icon" />
                  <li className="nav-item">
                    <a className="nav-link active4" href="/" id="amt">
                      <span id="span_amt">10,000&nbsp;</span>
                      <span id="span_won">P</span>
                    </a>
                  </li>
                </span>
                {/* 관리자 페이지 버튼 */}
                <li className="nav-item mx-3">
                  <a className="nav-link active" href="/admin">
                    관리자 페이지
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link active" href="/signin">
                    로그인
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item ms-3">
                  <a className="nav-link active" href="/signup">
                    회원가입
                  </a>
                </li>
                <li className="nav-item mx-1">
                  <a className="nav-link active" href="/">
                    고객센터
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-fluid">
            {/* 메인 로고 */}
            <a className="navbar-brand" href="/">
              <img src={ibe_logo} width="200px" alt="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* 메뉴바 */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="menubar"
            >
              <ul className="navbar-nav menubar">
                <li className="nav-item mr-150">
                  <a className="nav-link active1" href="/">
                    전체 상품
                  </a>
                </li>
                <li className="nav-item mr-150">
                  <a className="nav-link active2" href="/products/create">
                    판매 신청
                  </a>
                </li>
                <li className="nav-item mr-150">
                  <a className="nav-link active3" href="/">
                    아이비 게시판
                  </a>
                </li>
                <li className="nav-item mr-150">
                  <a className="nav-link active5" href="/mypage">
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
