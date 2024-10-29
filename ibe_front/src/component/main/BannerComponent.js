import Carousel from 'react-bootstrap/Carousel';
import banner_info from '../assets/images/main/banner/banner_info.png'
import banner_trust from '../assets/images/main/banner/banner_trust.png'
import banner_coin from '../assets/images/main/banner/banner_coin.png'
import banner_teddy from '../assets/images/main/banner/banner_teddy.png'
import './MainComponent.css';

const banner_imgs = [
    banner_teddy, banner_info, banner_trust, banner_coin
];

const BannerComponent = () => {
  return (
    <Carousel>
        {banner_imgs.map((item, idx) => { 
            return (
                <Carousel.Item interval={2000}>
                    <img id="img_carousel" src={item} alt="banner" />
                </Carousel.Item>
            )
        })}
    </Carousel>
  );
}

export default BannerComponent;