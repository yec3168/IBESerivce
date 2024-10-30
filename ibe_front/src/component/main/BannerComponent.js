import Carousel from "react-bootstrap/Carousel";
import banner_info1 from "../assets/images/main/banner/banner_info1.png";
import banner_food from "../assets/images/main/banner/banner_food.png";
import banner_coin from "../assets/images/main/banner/banner_coin.png";
import banner_frog from "../assets/images/main/banner/banner_frog_trim.jpg";
import "./Main.css";

const bannerImgs = [banner_frog, banner_info1, banner_food, banner_coin];

const BannerComponent = () => {
  return (
    <Carousel>
      {bannerImgs.map((item, idx) => {
        return (
          <Carousel.Item interval={2500}>
            <img id="img_carousel" src={item} alt="banner" />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default BannerComponent;
