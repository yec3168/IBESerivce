import Carousel from "react-bootstrap/Carousel";
import banner_vivid from "../assets/images/main/banner/banner_pink.webp"

import "./Main.css";

const bannerImgs = [banner_vivid, ];

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
