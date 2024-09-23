import slider1 from "../../../public/images/images/slider-image-1.jpeg";
import slider2 from "../../../public/images/images/slider-image-2.jpeg";
import slider3 from "../../../public/images/images/slider-image-3.jpeg";
import banner1 from "../../../public/images/images/grocery-banner-2.jpeg";
import banner2 from "../../../public/images/images/grocery-banner.png";
import Slider from "react-slick";
const LandingSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div className="flex flex-wrap">
      <div className="md:w-3/4 w-full ">
        <Slider {...settings}>
          <img
            src={slider1}
            alt={slider1}
            className="w-full h-[400px] bg-contain bg-center md:bg-cover"
          />
          <img
            src={slider2}
            alt={slider2}
            className="w-full h-[400px]  bg-contain bg-center md:bg-cover"
          />
          <img
            src={slider3}
            alt={slider3}
            className="w-full h-[400px] bg-contain bg-center md:bg-cover"
          />
        </Slider>
      </div>
      <div className="md:w-1/4 w-full flex md:flex-col mt-10 md:mt-0">
        <img src={banner1} alt="" className="w-1/2 md:w-full h-[200px]" />
        <img src={banner2} alt="" className="w-1/2 md:w-full h-[200px]" />
      </div>
    </div>
  );
};

export default LandingSlider;
