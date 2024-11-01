import styles from "./FooterComponent.module.css";
import icons from "./icon_ib.png";

const FooterComponent = () => {
  const footerLeftMsg = [
    { msg: "(주)아이비 대표이사: 연응찬" },
    { msg: "서울시 강동구 유캠대로 415 아이비 빌딩 FAX: 02-1234-5678" },
    { msg: "사업자등록번호 123-12-12345" },
    { msg: "E-mail: I_BECompany@i_becom.or.kr 대표번호 1588-0000" },
  ];

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
              <td>공지사항</td>
              <td id="client_center">
                <a
                  href="https://www.example.com/customer-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  고객센터
                </a>
              </td>
            </tr>
            <tr>
              <td>회사소개</td>
              <td>1800-1234(유료)</td>
            </tr>
            <tr>
              <td>이용약관</td>
              <td>평일 오전 9시 - 오후 6시</td>
            </tr>
            <tr>
              <td></td>
              <td>(주말, 공휴일 휴무)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default FooterComponent;
