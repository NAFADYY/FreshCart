import Slider from "react-slick";

const ProductSlider = ({ images, imageAlt }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <>
      <Slider {...settings}>
        {images?.map((image) => (
          <img
            key={image}
            className="max-h-96 object-contain"
            src={image}
            alt={imageAlt}
          />
        ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
