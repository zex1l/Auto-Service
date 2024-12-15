import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import SLide1 from "../../assets/image/slide-1.jpg";
import SLide2 from "../../assets/image/slide-2.jpg";
import SLide3 from "../../assets/image/slide-3.jpg";

const dataSlider = [
  {
    url: SLide1,
  },
  {
    url: SLide2,
  },
  {
    url: SLide3,
  },
];

const Slider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
    >
      {dataSlider.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={item.url} alt="Фотография слайда" key={index} width={700} height={500}/>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
