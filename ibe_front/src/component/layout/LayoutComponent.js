import FooterComponent from "../footer/FooterComponent";
import HeaderComponent from "../header/HeaderComponent";

const LayoutComponent = (props) => {
  return (
    <>
      <HeaderComponent />
        <main>{props.children}</main>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
