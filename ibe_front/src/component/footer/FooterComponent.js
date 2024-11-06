import { useState, useEffect } from "react";
import styles from "./FooterComponent.module.css";
import icons from "./icon_ib.png";

const FooterComponent = () => {
  const footerLeftMsg = [
    { msg: "(주)아이비 대표이사: 연응찬" },
    { msg: "서울시 강동구 유캠대로 415 아이비 빌딩 FAX: 02-1234-5678" },
    { msg: "사업자등록번호 123-12-12345" },
    { msg: "E-mail: I_BECompany@i_becom.or.kr 대표번호 1588-0000" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 고객센터 클릭 시 로그인 상태 체크
  const handleInquiryClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("로그인 한 사용자만 접근할 수 있습니다.");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_left}>
        <img src={icons} alt="IB Logo" height="70px" />
        {footerLeftMsg.map((item, index) => (
          <div key={index}>{item.msg}</div>
        ))}
      </div>

      <div className={styles.footer_right}>
        <table className={styles.footer_table}>
          <tbody>
            <tr>
              <td id="client_center">
                <a href="/mypage/inquiry" onClick={handleInquiryClick}>고객센터</a>
              </td>
            </tr>
            <tr>
              <td>문의 전화: 1800-1234(유료)</td>
            </tr>
            <tr>
              <td>&emsp;&emsp;&emsp;&emsp;&ensp;평일 오전 9시 - 오후 6시</td>
            </tr>
            <tr>
              <td>&emsp;&emsp;&emsp;&emsp;&ensp;(주말, 공휴일 휴무)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default FooterComponent;
